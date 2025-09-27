/**
 * OAuth2 configuration for external authentication providers.
 * Contains settings for Google, Facebook, and other OAuth2 providers.
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
	 * Facebook OAuth2 configuration.
	 */
	facebook: {
		/**
		 * Facebook OAuth2 client ID.
		 */
		clientId: process.env.FACEBOOK_CLIENT_ID || '',

		/**
		 * Facebook OAuth2 client secret.
		 */
		clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',

		/**
		 * Facebook OAuth2 authorization URL.
		 */
		authorizationUrl: 'https://www.facebook.com/v18.0/dialog/oauth',

		/**
		 * Facebook OAuth2 token URL.
		 */
		tokenUrl: 'https://graph.facebook.com/v18.0/oauth/access_token',

		/**
		 * Facebook OAuth2 user info URL.
		 */
		userInfoUrl: 'https://graph.facebook.com/v18.0/me',

		/**
		 * Facebook OAuth2 scopes.
		 */
		scopes: ['email', 'public_profile'],

		/**
		 * Facebook OAuth2 redirect URI.
		 */
		redirectUri: process.env.FACEBOOK_REDIRECT_URI || 'http://localhost:3000/auth/oauth2/facebook/callback',
	},

	/**
	 * GitHub OAuth2 configuration.
	 */
	github: {
		/**
		 * GitHub OAuth2 client ID.
		 */
		clientId: process.env.GITHUB_CLIENT_ID || '',

		/**
		 * GitHub OAuth2 client secret.
		 */
		clientSecret: process.env.GITHUB_CLIENT_SECRET || '',

		/**
		 * GitHub OAuth2 authorization URL.
		 */
		authorizationUrl: 'https://github.com/login/oauth/authorize',

		/**
		 * GitHub OAuth2 token URL.
		 */
		tokenUrl: 'https://github.com/login/oauth/access_token',

		/**
		 * GitHub OAuth2 user info URL.
		 */
		userInfoUrl: 'https://api.github.com/user',

		/**
		 * GitHub OAuth2 scopes.
		 */
		scopes: ['user:email'],

		/**
		 * GitHub OAuth2 redirect URI.
		 */
		redirectUri: process.env.GITHUB_REDIRECT_URI || 'http://localhost:3000/auth/oauth2/github/callback',
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
