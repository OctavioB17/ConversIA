/**
 * JWT token payload types for authentication.
 * Defines the structure of JWT tokens used in the system.
 */

/**
 * Payload for access tokens (JWT).
 * Contains user identification and authorization information.
 */
export type AccessTokenPayload = {
	sub: string;        
	email: string;     
	role: string;      
	companyId?: string; 
	iat?: number;      
	exp?: number;      
};

/**
 * Payload for refresh tokens.
 * Contains minimal information for token refresh.
 */
export type RefreshTokenPayload = {
	sub: string;       
	email: string;     
	iat?: number;      
	exp?: number;      
};

/**
 * Payload for OAuth2 tokens.
 * Contains provider-specific information.
 */
export type OAuth2TokenPayload = {
    sub: string;
    email: string;
    provider: string;
    providerId: string;
    iat?: number
    exp?: number
}

/**
 * Generic JWT payload for verification.
 */
export type JwtPayload = AccessTokenPayload | RefreshTokenPayload | OAuth2TokenPayload;