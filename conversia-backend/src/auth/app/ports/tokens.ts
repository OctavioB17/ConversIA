/**
 * Dependency injection tokens for Auth module ports.
 * These tokens are used to register and inject dependencies in the Auth module.
 */

/** Token for JWT service implementation */
export const JWT_SERVICE = Symbol('JWT_SERVICE');

/** Token for OAuth2 service implementation */
export const OAUTH2_SERVICE = Symbol('OAUTH2_SERVICE');

/** Token for authentication session repository implementation */
export const AUTH_SESSION_REPOSITORY = Symbol('AUTH_SESSION_REPOSITORY');

/** Token for user repository implementation (shared with User module) */
export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

/** Token for password hasher implementation (shared with User module) */
export const PASSWORD_HASHER = Symbol('PASSWORD_HASHER');

/** Token for event publisher implementation (shared with User module) */
export const EVENT_PUBLISHER = Symbol('EVENT_PUBLISHER');