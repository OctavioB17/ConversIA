import { AuthSession as PrismaAuthSession } from '@prisma/client';
import AuthSession from '../../../domain/entities/auth-session';
import AuthSessionId from '../../../domain/value-objects/auth-session-id.vo';
import UserId from 'src/user/domain/value-objects/user-id.vo';
import AccessToken from '../../../domain/value-objects/access-token.vo';
import RefreshToken from '../../../domain/value-objects/refresh-token.vo';
import OAuthProvider from '../../../domain/value-objects/oauth-provider.vo';

/**
 * Mapper for converting between AuthSession domain entity and Prisma persistence model.
 * Handles the transformation between domain objects and database records.
 */
export default class AuthSessionPersistenceMapper {
	/**
	 * Converts AuthSession domain entity to Prisma auth session data for persistence.
	 * @param session AuthSession domain entity
	 * @returns Prisma auth session data
	 */
	static toPersistence(session: AuthSession): Omit<PrismaAuthSession, 'id' | 'createdAt' | 'updatedAt'> & { id: string } {
		return {
			id: session.id.toString(),
			userId: session.userId.toString(),
			accessToken: session.accessToken.toString(),
			refreshToken: session.refreshToken.toString(),
			provider: session.provider.toString(),
			deviceInfo: session.deviceInfo || null,
			ipAddress: session.ipAddress || null,
			isActive: session.isActive,
			expiresAt: session.expiresAt,
			lastUsedAt: session.lastUsedAt,
		};
	}

	/**
	 * Converts Prisma auth session data to AuthSession domain entity.
	 * @param sessionData Prisma auth session data
	 * @returns AuthSession domain entity
	 */
	static toDomain(sessionData: PrismaAuthSession): AuthSession {
		return AuthSession.hydrate({
			id: AuthSessionId.from(sessionData.id),
			userId: UserId.from(sessionData.userId),
			accessToken: AccessToken.create(sessionData.accessToken),
			refreshToken: RefreshToken.create(sessionData.refreshToken),
			provider: OAuthProvider.from(sessionData.provider),
			deviceInfo: sessionData.deviceInfo || undefined,
			ipAddress: sessionData.ipAddress || undefined,
			isActive: sessionData.isActive,
			expiresAt: sessionData.expiresAt,
			lastUsedAt: sessionData.lastUsedAt,
			createdAt: sessionData.createdAt,
			updatedAt: sessionData.updatedAt,
		});
	}
}
