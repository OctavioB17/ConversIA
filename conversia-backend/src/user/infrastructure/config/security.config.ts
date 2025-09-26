/**
 * Security configuration for User module.
 * Contains security-related settings and constants.
 */
export const securityConfig = {
	// Password hashing
	password: {
		saltRounds: 12,
		minLength: 8,
		maxLength: 128,
		requireUppercase: true,
		requireLowercase: true,
		requireNumbers: true,
		requireSpecialChars: true,
	},

	// JWT settings
	jwt: {
		secret: process.env.JWT_SECRET || 'your-secret-key',
		expiresIn: '24h',
		refreshExpiresIn: '7d',
	},

	// Rate limiting
	rateLimit: {
		login: {
			maxAttempts: 5,
			windowMs: 15 * 60 * 1000, // 15 minutes
		},
		registration: {
			maxAttempts: 3,
			windowMs: 60 * 60 * 1000, // 1 hour
		},
	},

	// Email verification
	emailVerification: {
		tokenExpiresIn: 24 * 60 * 60 * 1000, // 24 hours
		maxResendAttempts: 3,
		resendCooldown: 60 * 1000, // 1 minute
	},
} as const;
