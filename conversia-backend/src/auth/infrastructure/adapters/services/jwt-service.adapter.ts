import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { jwtConfig } from '../../config/jwt.config';
import JwtServicePort from '../../../app/ports/jwt-service.port';
import { AccessTokenPayload, RefreshTokenPayload } from '../../../domain/entities/types/jwt-payload.types';
import AccessToken from '../../../domain/value-objects/access-token.vo';
import RefreshToken from '../../../domain/value-objects/refresh-token.vo';

/**
 * JWT service adapter implementation.
 * Handles JWT token generation, verification, and extraction using jsonwebtoken library.
 */
@Injectable()
export class JwtServiceAdapter implements JwtServicePort {
	/**
	 * Generates an access token (JWT).
	 * @param payload Token payload containing user information
	 * @param expiresIn Optional custom expiration time
	 * @returns Access token value object
	 */
	generateAccessToken(payload: AccessTokenPayload, expiresIn?: string): AccessToken {
		const token = jwt.sign(
			payload,
			jwtConfig.secret,
			{
				expiresIn: expiresIn || jwtConfig.accessToken.expiresIn,
				algorithm: jwtConfig.accessToken.algorithm,
				issuer: jwtConfig.issuer,
				audience: jwtConfig.audience,
			}
		);

		return AccessToken.create(token);
	}

	/**
	 * Generates a refresh token.
	 * @param payload Token payload containing minimal user information
	 * @returns Refresh token value object
	 */
	generateRefreshToken(payload: RefreshTokenPayload): RefreshToken {
		const token = jwt.sign(
			payload,
			jwtConfig.secret,
			{
				expiresIn: jwtConfig.refreshToken.expiresIn,
				algorithm: jwtConfig.refreshToken.algorithm,
				issuer: jwtConfig.issuer,
				audience: jwtConfig.audience,
			}
		);

		return RefreshToken.create(token);
	}

	/**
	 * Verifies and decodes a JWT token.
	 * @param token JWT token to verify
	 * @returns Decoded token payload
	 * @throws Error if token is invalid or expired
	 */
	verifyToken(token: string): any {
		try {
			return jwt.verify(token, jwtConfig.secret, {
				algorithms: [jwtConfig.accessToken.algorithm, jwtConfig.refreshToken.algorithm],
				issuer: jwtConfig.issuer,
				audience: jwtConfig.audience,
			});
		} catch (error) {
			throw new Error(`Invalid token: ${error.message}`);
		}
	}

	/**
	 * Extracts token from Authorization header.
	 * @param authHeader Authorization header value (e.g., "Bearer <token>")
	 * @returns Token string or null if not found
	 */
	extractTokenFromHeader(authHeader: string): string | null {
		if (!authHeader) {
			return null;
		}

		const parts = authHeader.split(' ');
		if (parts.length !== 2 || parts[0] !== 'Bearer') {
			return null;
		}

		return parts[1];
	}
}
