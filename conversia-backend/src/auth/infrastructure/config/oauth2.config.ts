/**
 * OAuth2 configuration for Google authentication provider.
 */
export const oauth2Config = {
	/**
	 * Google OAuth2 configuration.
	 */
	google: {
		/**
		 * Google OAuth2 client ID.
		 */
		clientId: process.env.GOOGLE_CLIENT_ID || '',

		/**
		 * Google OAuth2 client secret.
		 */
		clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',

		/**
		 * Google OAuth2 authorization URL.
		 */
		authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',

		/**
		 * Google OAuth2 token URL.
		 */
		tokenUrl: 'https://oauth2.googleapis.com/token',

		/**
		 * Google OAuth2 user info URL.
		 */
		userInfoUrl: 'https://www.googleapis.com/oauth2/v2/userinfo',

		/**
		 * Google OAuth2 scopes.
		 */
		scopes: ['openid', 'profile', 'email'],

		/**
		 * Google OAuth2 redirect URI.
		 */
		redirectUri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/oauth2/google/callback',
	},

	/**
	 * OAuth2 state configuration.
	 */
	state: {
		/**
		 * State parameter length for CSRF protection.
		 */
		length: 32,

		/**
		 * State parameter expiration time in minutes.
		 */
		expiresInMinutes: 10,
	},
};
