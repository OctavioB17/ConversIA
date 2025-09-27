import AuthSession from "../entities/auth-session";
import OAuthProvider from "../value-objects/oauth-provider.vo";

/**
 * Domain service containing business rules for authentication.
 * Pure functions with no I/O dependencies.
 */
export default class AuthDomainService {
    /**
	 * Determines if a session can be refreshed.
	 * @param session AuthSession to check
	 * @returns True if session can be refreshed
	 */
    static canRefreshSession(session: AuthSession): boolean {
        return session.isActive && session.expiresAt > new Date();
    }

    /**
	 * Determines if a provider requires OAuth2 flow.
	 * @param provider OAuth provider
	 * @returns True if OAuth2 flow is required
	 */
    static requiresOAuth2Flow(provider: OAuthProvider): boolean {
        return provider.isOAuth2();
    }

    /**
	 * Determines if a provider supports refresh tokens.
	 * @param provider OAuth provider
	 * @returns True if refresh tokens are supported
	 */
    static supportsRefreshTokens(provider: OAuthProvider): boolean {
        return provider.isOAuth2() || provider.isLocal();
    }

    
	/**
	 * Calculates session expiration time.
	 * @param provider OAuth provider
	 * @param isRefreshToken Whether this is a refresh token session
	 * @returns Expiration date
	 */
    static calculateExpiration(provider: OAuthProvider, isRefreshToken: boolean = false): Date {
        const now = new Date();

        if (isRefreshToken) {
			return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);         
        }

        if (provider.isLocal()) {
			return new Date(now.getTime() + 24 * 60 * 60 * 1000);
		}

        return new Date(now.getTime() + 60 * 60 * 1000);
    }
}