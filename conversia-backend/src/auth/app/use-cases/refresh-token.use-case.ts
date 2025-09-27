import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import EventPublisherPort from "src/user/app/ports/event-publisher.port";
import UserRepositoryPort from "src/user/app/ports/user-repository.port";
import AuthSessionRepositoryPort from "../ports/auth-session-repository.port";
import JwtServicePort from "../ports/jwt-service.port";
import { JWT_SERVICE, AUTH_SESSION_REPOSITORY, USER_REPOSITORY, EVENT_PUBLISHER } from "../ports/tokens";
import RefreshTokenDto from "../dto/refresh-token.dto";
import AuthResponseDto from "../dto/auth-response.dto";
import AuthCommandMapper from "../mappers/auth-command.mapper";
import RefreshToken from "src/auth/domain/value-objects/refresh-token.vo";
import TokenExpiredError from "src/auth/domain/errors/token-expired.error";
import SessionNotFoundError from "src/auth/domain/errors/session-not-found.error";
import AuthDomainService from "src/auth/domain/services/auth-domain.service";
import { AccessTokenPayload, RefreshTokenPayload } from "src/auth/domain/entities/types/jwt-payload.types";
import AuthResponseMapper from "../mappers/auth-response.mapper";

/**
 * Use case for refreshing authentication tokens.
 * Validates refresh token, generates new access and refresh tokens, and updates session.
 */
@Injectable()
export class RefreshTokenUseCase {
	constructor(
		@Inject(JWT_SERVICE)
		private readonly jwtService: JwtServicePort,
		@Inject(AUTH_SESSION_REPOSITORY)
		private readonly sessionRepository: AuthSessionRepositoryPort,
		@Inject(USER_REPOSITORY)
		private readonly userRepository: UserRepositoryPort,
		@Inject(EVENT_PUBLISHER)
		private readonly eventPublisher: EventPublisherPort,
	) {}

    /**
	 * Refreshes authentication tokens using a valid refresh token.
	 * @param dto Refresh token request containing refresh token and optional device info
	 * @returns New authentication response with refreshed tokens and user data
	 * @throws UnauthorizedException if refresh token is invalid, expired, or user is inactive
	 */
    async execute(dto: RefreshTokenDto): Promise<AuthResponseDto> {
        const refreshProps = AuthCommandMapper.toRefreshTokenProps(dto);
        const refreshToken = RefreshToken.create(refreshProps.refreshToken);
        const session = await this.sessionRepository.findByRefreshToken(refreshToken);

        if (!session) {
            throw new UnauthorizedException('Invalid refresh token')
        }

        try {
            session.validate();
        } catch (error) {
            if (error instanceof TokenExpiredError || error instanceof SessionNotFoundError) {
                throw new UnauthorizedException('Invalid refresh token');
            }
            throw error;
        }
        
        if (!AuthDomainService.canRefreshSession(session)) {
            throw new UnauthorizedException('Session cannot be refreshed');
        }

        const user = await this.userRepository.findById(session.userId);
        if (!user || !user.isActive) {
            throw new UnauthorizedException('User inactive or not found')
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

        const newAccessToken = this.jwtService.generateAccessToken(accessTokenPayload);
		const newRefreshToken = this.jwtService.generateRefreshToken(refreshTokenPayload);

        const expiresAt = AuthDomainService.calculateExpiration(session.provider);
		session.refresh(newAccessToken, newRefreshToken, expiresAt);

		await this.sessionRepository.save(session);

		const events = session.pullDomainEvents();
		await this.eventPublisher.publishMany(events);

        return AuthResponseMapper.toResponseDto(user, newAccessToken, newRefreshToken, expiresAt);
    }
}