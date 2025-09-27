import OAuthCode from "src/auth/domain/value-objects/oauth-code.vo";
import OAuthProvider from "src/auth/domain/value-objects/oauth-provider.vo";
import OAuthState from "src/auth/domain/value-objects/oauth-state.vo";

/**
 * Port for OAuth2 operations.
 * Defines the contract for OAuth2 authentication flow.
 */
export default interface OAuth2ServicePort {
    /**
	 * Generates OAuth2 authorization URL.
	 * @param provider OAuth2 provider
	 * @param state CSRF protection state
	 * @returns Authorization URL
	 */
	generateAuthorizationUrl(provider: OAuthProvider, state: OAuthState): string;

    /**
	 * Exchanges authorization code for access token.
	 * @param provider OAuth2 provider
	 * @param code Authorization code
	 * @param state CSRF protection state
	 * @returns Access token and user info
	 */
    exchangeCodeForToken(
        provider: OAuthProvider,
        code: OAuthCode,
        state: OAuthState
    ): Promise<{
        acessToken: string,
        refreshToken?: string
        userInfo: {
            id: string;
            email: string;
            name: string;
            avatar?: string
        }       
    }>

    /**
	 * Validates OAuth2 state parameter.
	 * @param state State parameter to validate
	 * @returns True if state is valid
	 */
	validateState(state: string): boolean;

	/**
	 * Generates a new OAuth2 state parameter.
	 * @returns New state parameter
	 */
	generateState(): OAuthState;
}