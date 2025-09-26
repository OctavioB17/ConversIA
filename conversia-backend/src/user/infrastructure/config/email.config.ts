/**
 * Email configuration for User module.
 * Contains email service settings and templates.
 */
export const emailConfig = {
	// SMTP settings
	smtp: {
		host: process.env.SMTP_HOST || 'localhost',
		port: parseInt(process.env.SMTP_PORT || '587'),
		secure: process.env.SMTP_SECURE === 'true',
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS,
		},
	},

	// Email templates
	templates: {
		verification: {
			subject: 'Verifica tu cuenta - ConversIA',
			template: 'verification',
		},
		passwordReset: {
			subject: 'Restablece tu contraseña - ConversIA',
			template: 'password-reset',
		},
	},

	// Frontend URLs
	frontend: {
		baseUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
		verificationPath: '/verify',
		passwordResetPath: '/reset-password',
	},
} as const;
