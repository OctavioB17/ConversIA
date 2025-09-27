import { AccessTokenPayload, JwtPayload, RefreshTokenPayload } from 'src/auth/domain/entities/types/jwt-payload.types';
import AccessToken from '../../domain/value-objects/access-token.vo';
import RefreshToken from '../../domain/value-objects/refresh-token.vo';

/**
 * Port for JWT token operations.
 * Defines the contract for JWT generation and verification.
 */
export default interface JwtServicePort {
    /**
	 * Generates an access token (JWT).
	 * @param payload Token payload
	 * @param expiresIn Token expiration time
	 * @returns Access token
	 */
    generateAccessToken(payload: AccessTokenPayload, expiresIn?: string): AccessToken

    /**
	 * Generates a refresh token.
	 * @param payload Token payload
	 * @returns Refresh token
	 */
	generateRefreshToken(payload: RefreshTokenPayload): RefreshToken;

	/**
	 * Verifies and decodes a JWT token.
	 * @param token JWT token to verify
	 * @returns Decoded token payload
	 * @throws Error if token is invalid or expired
	 */
	verifyToken(token: string): any;

	/**
	 * Extracts token from Authorization header.
	 * @param authHeader Authorization header value
	 * @returns Token string or null
	 */
	extractTokenFromHeader(authHeader: string): string | null;
}