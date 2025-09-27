import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import AuthSessionRepositoryPort from '../../../app/ports/auth-session-repository.port';
import AuthSession from '../../../domain/entities/auth-session';
import AccessToken from '../../../domain/value-objects/access-token.vo';
import RefreshToken from '../../../domain/value-objects/refresh-token.vo';
import UserId from 'src/user/domain/value-objects/user-id.vo';
import AuthSessionPersistenceMapper from '../mappers/auth-session-persistence.mapper';

/**
 * AuthSession repository adapter implementation.
 * Handles authentication session persistence using Prisma and PostgreSQL.
 */
@Injectable()
export class AuthSessionRepositoryAdapter implements AuthSessionRepositoryPort {
	constructor(private readonly prisma: PrismaService) {}

	/**
	 * Saves an authentication session.
	 * @param session AuthSession to save
	 */
	async save(session: AuthSession): Promise<void> {
		const sessionData = AuthSessionPersistenceMapper.toPersistence(session);

		await this.prisma.authSession.upsert({
			where: { id: session.id.toString() },
			create: sessionData,
			update: {
				...sessionData,
				updatedAt: new Date(),
			},
		});
	}

	/**
	 * Finds a session by access token.
	 * @param token Access token
	 * @returns AuthSession or null if not found
	 */
	async findByAccessToken(token: AccessToken): Promise<AuthSession | null> {
		const sessionData = await this.prisma.authSession.findFirst({
			where: { 
				accessToken: token.toString(),
				isActive: true,
			},
		});

		if (!sessionData) return null;

		return AuthSessionPersistenceMapper.toDomain(sessionData);
	}

	/**
	 * Finds a session by refresh token.
	 * @param token Refresh token
	 * @returns AuthSession or null if not found
	 */
	async findByRefreshToken(token: RefreshToken): Promise<AuthSession | null> {
		const sessionData = await this.prisma.authSession.findFirst({
			where: { 
				refreshToken: token.toString(),
				isActive: true,
			},
		});

		if (!sessionData) return null;

		return AuthSessionPersistenceMapper.toDomain(sessionData);
	}

	/**
	 * Finds all active sessions for a user.
	 * @param userId User identifier
	 * @returns Array of active sessions
	 */
	async findActiveSessionsByUser(userId: UserId): Promise<AuthSession[]> {
		const sessionsData = await this.prisma.authSession.findMany({
			where: { 
				userId: userId.toString(),
				isActive: true,
			},
			orderBy: { lastUsedAt: 'desc' },
		});

		return sessionsData.map(sessionData => AuthSessionPersistenceMapper.toDomain(sessionData));
	}

	/**
	 * Deactivates a session.
	 * @param sessionId Session identifier
	 */
	async deactivateSession(sessionId: string): Promise<void> {
		await this.prisma.authSession.update({
			where: { id: sessionId },
			data: { 
				isActive: false,
				updatedAt: new Date(),
			},
		});
	}

	/**
	 * Deactivates all sessions for a user.
	 * @param userId User identifier
	 */
	async deactivateAllUserSessions(userId: UserId): Promise<void> {
		await this.prisma.authSession.updateMany({
			where: { userId: userId.toString() },
			data: { 
				isActive: false,
				updatedAt: new Date(),
			},
		});
	}

	/**
	 * Removes expired sessions.
	 */
	async cleanupExpiredSessions(): Promise<void> {
		await this.prisma.authSession.deleteMany({
			where: {
				OR: [
					{ expiresAt: { lt: new Date() } },
					{ 
						AND: [
							{ isActive: false },
							{ updatedAt: { lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }, // 7 days ago
						],
					},
				],
			},
		});
	}
}
