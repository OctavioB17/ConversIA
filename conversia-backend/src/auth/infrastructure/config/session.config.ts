/**
 * Authentication session configuration.
 * Contains settings for session management and security.
 */
export const sessionConfig = {
	/**
	 * Session security settings.
	 */
	security: {
		/**
		 * Maximum number of active sessions per user.
		 */
		maxSessionsPerUser: parseInt(process.env.MAX_SESSIONS_PER_USER || '5'),

		/**
		 * Session inactivity timeout in minutes.
		 */
		inactivityTimeoutMinutes: parseInt(process.env.SESSION_INACTIVITY_TIMEOUT || '30'),

		/**
		 * Whether to require re-authentication for sensitive operations.
		 */
		requireReauthForSensitiveOps: process.env.REQUIRE_REAUTH_SENSITIVE === 'true',
	},

	/**
	 * Session cleanup configuration.
	 */
	cleanup: {
		/**
		 * How often to run session cleanup in minutes.
		 */
		intervalMinutes: parseInt(process.env.SESSION_CLEANUP_INTERVAL || '60'),

		/**
		 * How long to keep expired sessions before deletion in days.
		 */
		keepExpiredSessionsDays: parseInt(process.env.KEEP_EXPIRED_SESSIONS_DAYS || '7'),
	},

	/**
	 * Device tracking configuration.
	 */
	deviceTracking: {
		/**
		 * Whether to track device information.
		 */
		enabled: process.env.DEVICE_TRACKING_ENABLED === 'true',

		/**
		 * Whether to track IP addresses.
		 */
		trackIpAddress: process.env.TRACK_IP_ADDRESS === 'true',

		/**
		 * Whether to require device verification for new devices.
		 */
		requireDeviceVerification: process.env.REQUIRE_DEVICE_VERIFICATION === 'true',
	},
};
