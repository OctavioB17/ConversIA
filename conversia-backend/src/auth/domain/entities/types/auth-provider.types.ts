/**
 * Enum representing supported OAuth2 providers.
 */
export enum AuthProvider {
	LOCAL = 'LOCAL',
	GOOGLE = 'GOOGLE',
	GITHUB = 'GITHUB',
	MICROSOFT = 'MICROSOFT',
	FACEBOOK = 'FACEBOOK',
	LINKEDIN = 'LINKEDIN',
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