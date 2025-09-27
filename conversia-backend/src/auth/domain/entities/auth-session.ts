import SessionNotFoundError from "../errors/session-not-found.error";
import TokenExpiredError from "../errors/token-expired.error";
import UserLoggedOutEvent from "../events/user-logged-out.event";
import AccessToken from "../value-objects/access-token.vo";
import RefreshToken from "../value-objects/refresh-token.vo";
import AuthSessionId from "../value-objects/auth-session-id.vo";
import { AuthSessionProps } from "./types/auth-session.props";

/**
 * AuthSession domain entity.
 * Manages user authentication sessions for both JWT and OAuth2.
 */
export default class AuthSession {
    private readonly events: Array<unknown> = [];
    private constructor(private readonly props: AuthSessionProps) {};

    
    /**
	 * Creates a new authentication session.
	 * @param props Session properties
	 * @returns New AuthSession entity
	 */
	static create(props: Omit<AuthSessionProps, 'id' | 'createdAt' | 'updatedAt' | 'lastUsedAt'>): AuthSession {
		const now = new Date();
		return new AuthSession({
			...props,
			id: AuthSessionId.new().toString(),
			createdAt: now,
			updatedAt: now,
			lastUsedAt: now,
		});
	}

    /**
	 * Reconstructs an AuthSession from persisted data.
	 * @param props Complete session properties
	 * @returns AuthSession entity
	 */
	static hydrate(props: AuthSessionProps): AuthSession {
		return new AuthSession(props);
	}

    get id() { return this.props.id; }
	get userId() { return this.props.userId; }
	get accessToken() { return this.props.accessToken; }
	get refreshToken() { return this.props.refreshToken; }
	get provider() { return this.props.provider; }
	get providerId() { return this.props.providerId; }
	get deviceInfo() { return this.props.deviceInfo; }
	get ipAddress() { return this.props.ipAddress; }
	get isActive() { return this.props.isActive; }
	get expiresAt() { return this.props.expiresAt; }
	get createdAt() { return this.props.createdAt; }
	get updatedAt() { return this.props.updatedAt; }
	get lastUsedAt() { return this.props.lastUsedAt; }

    /**
	 * Validates if the session is still active and not expired.
	 * @throws TokenExpiredError if session is expired
	 * @throws SessionNotFoundError if session is inactive
	 */
	validate(): void {
		if (!this.props.isActive) {
			throw new SessionNotFoundError();
		}

		if (this.props.expiresAt < new Date()) {
			throw new TokenExpiredError();
		}
	}

    /**
	 * Updates the last used timestamp.
	 */
	updateLastUsed(): void {
		this.props.lastUsedAt = new Date();
		this.props.updatedAt = new Date();
	}

    /**
	 * Refreshes the session with new tokens.
	 * @param newAccessToken New access token
	 * @param newRefreshToken New refresh token
	 * @param expiresAt New expiration date
	 */
	refresh(newAccessToken: AccessToken, newRefreshToken: RefreshToken, expiresAt: Date): void {
		this.props.accessToken = newAccessToken;
		this.props.refreshToken = newRefreshToken;
		this.props.expiresAt = expiresAt;
		this.props.updatedAt = new Date();
		this.props.lastUsedAt = new Date();
	}

    /**
	 * Deactivates the session (logout).
	 */
	deactivate(): void {
		this.props.isActive = false;
		this.props.updatedAt = new Date();
		this.events.push(new UserLoggedOutEvent(this.props.userId, this.props.id));
	}

    /**
	 * Returns and clears queued domain events.
	 * @returns Array of domain events
	 */
	pullDomainEvents(): Array<unknown> {
		const out = [...this.events];
		this.events.length = 0;
		return out;
	}
}