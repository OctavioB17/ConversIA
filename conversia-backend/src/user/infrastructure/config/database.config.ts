/**
 * Database configuration for User module.
 * Contains database-related settings and constants.
 */
export const databaseConfig = {
	connectionTimeout: 30000,
	queryTimeout: 10000,

	defaultPageSize: 20,
	maxPageSize: 100,

	maxRetries: 3,
	retryDelay: 1000,

	enableQueryLogging: process.env.NODE_ENV === 'development',
} as const;
