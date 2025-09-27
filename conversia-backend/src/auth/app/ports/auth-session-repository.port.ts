import AuthSession from "src/auth/domain/entities/auth-session";
import AccessToken from "src/auth/domain/value-objects/access-token.vo";
import RefreshToken from "src/auth/domain/value-objects/refresh-token.vo";
import UserId from "src/user/domain/value-objects/user-id.vo";

/**
 * Port for AuthSession repository operations.
 * Defines the contract for session persistence.
 */
export default interface AuthSessionRepositoryPort {
    /**
	 * Saves an authentication session.
	 * @param session AuthSession to save
	 */
	save(session: AuthSession): Promise<void>;

    /**
	 * Finds a session by access token.
	 * @param token Access token
	 * @returns AuthSession or null if not found
	 */
	findByAccessToken(token: AccessToken): Promise<AuthSession | null>;

    /**
	 * Finds a session by refresh token.
	 * @param token Refresh token
	 * @returns AuthSession or null if not found
	 */
	findByRefreshToken(token: RefreshToken): Promise<AuthSession | null>;

    
	/**
	 * Finds all active sessions for a user.
	 * @param userId User identifier
	 * @returns Array of active sessions
	 */
	findActiveSessionsByUser(userId: UserId): Promise<AuthSession[]>;

    /**
	 * Deactivates a session.
	 * @param sessionId Session identifier
	 */
	deactivateSession(sessionId: string): Promise<void>;

    
	/**
	 * Deactivates all sessions for a user.
	 * @param userId User identifier
	 */
	deactivateAllUserSessions(userId: UserId): Promise<void>;

    /**
	 * Removes expired sessions.
	 */
	cleanupExpiredSessions(): Promise<void>;
}