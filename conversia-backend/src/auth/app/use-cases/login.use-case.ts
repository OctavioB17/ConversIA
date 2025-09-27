import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AUTH_SESSION_REPOSITORY, EVENT_PUBLISHER, JWT_SERVICE, PASSWORD_HASHER, USER_REPOSITORY } from "../ports/tokens";
import JwtServicePort from "../ports/jwt-service.port";
import UserRepositoryPort from "src/user/app/ports/user-repository.port";
import PasswordHasherPort from "src/user/app/ports/password-hasher.port";
import AuthSessionRepositoryPort from "../ports/auth-session-repository.port";
import EventPublisherPort from "src/user/app/ports/event-publisher.port";
import LoginDto from "../dto/login-dto";
import AuthResponseDto from "../dto/auth-response.dto";
import AuthCommandMapper from "../mappers/auth-command.mapper";
import UserEmail from "src/user/domain/value-objects/user-email.vo";
import { AccessTokenPayload, RefreshTokenPayload } from "src/auth/domain/entities/types/jwt-payload.types";
import OAuthProvider from "src/auth/domain/value-objects/oauth-provider.vo";
import { AuthProvider } from "src/auth/domain/entities/types/auth-provider.types";
import AuthDomainService from "src/auth/domain/services/auth-domain.service";
import AuthSession from "src/auth/domain/entities/auth-session";
import AuthSessionId from "src/auth/domain/value-objects/auth-session-id.vo";
import AuthResponseMapper from "../mappers/auth-response.mapper";

/**
 * Use case for user login with email and password.
 * Handles authentication flow, session creation, and JWT token generation for local login.
 */
@Injectable()
export class LoginUseCase {
    constructor(
        @Inject(JWT_SERVICE)
        private readonly jwtServices: JwtServicePort,
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepositoryPort,
        @Inject(PASSWORD_HASHER) 
        private readonly passwordHasher: PasswordHasherPort,
        @Inject(AUTH_SESSION_REPOSITORY)
        private readonly sessionRepository: AuthSessionRepositoryPort,
        @Inject(EVENT_PUBLISHER)
        private readonly eventPublisher: EventPublisherPort
    ) {}

    /**
	 * Authenticates a user with email and password.
	 * Validates credentials, creates authentication session, and generates JWT tokens.
	 * @param dto Login credentials containing email, password, and optional device info
	 * @returns Authentication response with access token, refresh token, and user data
	 * @throws UnauthorizedException if credentials are invalid or account is deactivated
	 */
    async execute(dto: LoginDto): Promise<AuthResponseDto> {
        const loginProps = AuthCommandMapper.toLoginProps(dto);

        const email = UserEmail.create(loginProps.email)
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const isValidPassword = await user.verifyPassword(this.passwordHasher, loginProps.password)

        if (!isValidPassword) {
            throw new UnauthorizedException('Invalid credentials')
        }

        if (!user.isActive) {
            throw new UnauthorizedException('Account is deactivaded')
        }

        const accessTokenPayload: AccessTokenPayload = {
            sub: user.id.toString(),
            email: user.email.toString(),
            role: user.role.toString(),
            companyId: user.companyId?.toString(),
        }

        const refreshTokenPayload: RefreshTokenPayload = {
			sub: user.id.toString(),
			email: user.email.toString(),
		};

        const accessToken = this.jwtServices.generateAccessToken(accessTokenPayload);
        const refreshToken = this.jwtServices.generateRefreshToken(refreshTokenPayload);

        const provider = OAuthProvider.from(AuthProvider.LOCAL);
        const expiresAt = AuthDomainService.calculateExpiration(provider);

        const session = AuthSession.create({
            userId: user.id,
            accessToken,
            refreshToken,
            provider,
            deviceInfo: loginProps.deviceInfo,
            ipAddress: loginProps.ipAddress,
            isActive: true,
            expiresAt,
        })

        await this.sessionRepository.save(session);

        const events = session.pullDomainEvents();
        await this.eventPublisher.publishMany(events)

        return AuthResponseMapper.toResponseDto(user, accessToken, refreshToken, expiresAt)
    }
}