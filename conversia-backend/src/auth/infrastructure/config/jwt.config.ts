/**
 * JWT configuration for authentication tokens.
 * Contains settings for access and refresh token generation and validation.
 */
export const jwtConfig = {
	/**
	 * JWT secret key for token signing and verification.
	 * Should be stored in environment variables in production.
	 */
	secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',

	/**
	 * Access token configuration.
	 */
	accessToken: {
		/**
		 * Access token expiration time.
		 * Default: 15 minutes
		 */
		expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',

		/**
		 * Access token algorithm.
		 * Default: HS256
		 */
		algorithm: 'HS256' as const,
	},

	/**
	 * Refresh token configuration.
	 */
	refreshToken: {
		/**
		 * Refresh token expiration time.
		 * Default: 7 days
		 */
		expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',

		/**
		 * Refresh token algorithm.
		 * Default: HS256
		 */
		algorithm: 'HS256' as const,
	},

	/**
	 * JWT issuer configuration.
	 */
	issuer: process.env.JWT_ISSUER || 'conversia-api',

	/**
	 * JWT audience configuration.
	 */
	audience: process.env.JWT_AUDIENCE || 'conversia-client',
};
