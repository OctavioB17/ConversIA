/**
 * Enum representing supported authentication providers.
 */
export enum AuthProvider {
	LOCAL = 'LOCAL',
	GOOGLE = 'GOOGLE',
}

export type OAuth2Config = {
	clientId: string;
	clientSecret: string;
	redirectUri: string;
	scope: string[];
	authorizationUrl: string;
	tokenUrl: string;
	userInfoUrl: string;
}