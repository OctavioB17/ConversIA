export default class OAuthProviderError extends Error {
	constructor(provider: string, message: string) {
		super(`OAuth2 ${provider} error: ${message}`);
		this.name = 'OAuthProviderError';
	}
}