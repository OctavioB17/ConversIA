import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import EventPublisherPort from "src/user/app/ports/event-publisher.port";
import UserRepositoryPort from "src/user/app/ports/user-repository.port";
import AuthSessionRepositoryPort from "../ports/auth-session-repository.port";
import JwtServicePort from "../ports/jwt-service.port";
import OAuth2ServicePort from "../ports/oauth2-service.port";
import { OAUTH2_SERVICE, USER_REPOSITORY, JWT_SERVICE, AUTH_SESSION_REPOSITORY, EVENT_PUBLISHER } from "../ports/tokens";
import OAuth2CallbackDto from "../dto/oauth-callback.dto";
import AuthResponseDto from "../dto/auth-response.dto";
import AuthCommandMapper from "../mappers/auth-command.mapper";
import OAuthProvider from "src/auth/domain/value-objects/oauth-provider.vo";
import OAuthCode from "src/auth/domain/value-objects/oauth-code.vo";
import OAuthState from "src/auth/domain/value-objects/oauth-state.vo";
import UserEmail from "src/user/domain/value-objects/user-email.vo";
import { AccessTokenPayload, RefreshTokenPayload } from "src/auth/domain/entities/types/jwt-payload.types";
import AuthDomainService from "src/auth/domain/services/auth-domain.service";
import AuthSession from "src/auth/domain/entities/auth-session";
import AuthResponseMapper from "../mappers/auth-response.mapper";

/**
 * Use case for handling OAuth2 callback.
 * Processes OAuth2 authorization code, creates or finds user, and generates authentication session.
 */
@Injectable()
export class OAuth2CallbackUseCase {
	constructor(
		@Inject(OAUTH2_SERVICE)
		private readonly oauth2Service: OAuth2ServicePort,
		@Inject(USER_REPOSITORY)
		private readonly userRepository: UserRepositoryPort,
		@Inject(JWT_SERVICE)
		private readonly jwtService: JwtServicePort,
		@Inject(AUTH_SESSION_REPOSITORY)
		private readonly sessionRepository: AuthSessionRepositoryPort,
		@Inject(EVENT_PUBLISHER)
		private readonly eventPublisher: EventPublisherPort,
	) {}
    
	/**
	 * Handles OAuth2 callback and completes authentication.
	 * Exchanges authorization code for tokens, creates or finds user, and generates authentication session.
	 * @param dto OAuth2 callback data containing provider, code, and state
	 * @returns Authentication response with access token, refresh token, and user data
	 * @throws UnauthorizedException if callback is invalid or user creation fails
	 */
    async execute(dto: OAuth2CallbackDto): Promise<AuthResponseDto> {
        const callbackProps = AuthCommandMapper.toOAuth2CallbackProps(dto);

        if (!this.oauth2Service.validateState(callbackProps.state)) {
            throw new UnauthorizedException('Invalid state parameter');
        }

        const provider = OAuthProvider.create(callbackProps.provider);
        const code = OAuthCode.create(callbackProps.code);
        const state = OAuthState.create(callbackProps.state);

        const oauth2Result = await this.oauth2Service.exchangeCodeForToken(provider, code, state);
        
        const email = UserEmail.create(oauth2Result.userInfo.email);
        let user = await this.userRepository.findByEmail(email)

        if (!user) {
			// TODO: Create user with OAuth2 data
			throw new UnauthorizedException('User not found. Please register first.');
		}

        if (!user.isActive) {
            throw new UnauthorizedException('Account is deactivaded')
        }

        const accessTokenPayload: AccessTokenPayload = {
            sub: user.id.toString(),
            email: user.email.toString(),
            role: user.role.toString(),
            companyId: user.companyId?.toString(),
        };

        const refreshTokenPayload: RefreshTokenPayload = {
            sub: user.id.toString(),
            email: user.email.toString(),
        }

        const accessToken = this.jwtService.generateAccessToken(accessTokenPayload);
        const refreshToken = this.jwtService.generateRefreshToken(refreshTokenPayload);

        const expiresAt = AuthDomainService.calculateExpiration(provider);

        const session = AuthSession.create({
            userId: user.id,
            accessToken,
            refreshToken,
            provider,
            providerId: oauth2Result.userInfo.id,
            deviceInfo: callbackProps.deviceInfo,
            ipAddress: callbackProps.ipAddress,
            isActive: true,
            expiresAt,
        })

        await this.sessionRepository.save(session);

        const events = session.pullDomainEvents();
		await this.eventPublisher.publishMany(events);

        return AuthResponseMapper.toOAuth2ResponseDto(
			user, 
			accessToken, 
			refreshToken, 
			expiresAt,
			{ avatar: oauth2Result.userInfo.avatar }
		);
    }
}