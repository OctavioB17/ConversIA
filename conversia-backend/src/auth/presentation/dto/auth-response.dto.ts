import { ApiProperty } from '@nestjs/swagger';

/**
 * HTTP response DTO for authentication operations.
 * Contains authentication tokens and user information after successful login.
 */
export class AuthResponseDto {
	/**
	 * JWT access token for API authentication.
	 * Used in Authorization header for protected endpoints.
	 */
	@ApiProperty({
		description: 'JWT access token for API authentication',
		example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
	})
	accessToken: string;

	/**
	 * JWT refresh token for token renewal.
	 * Used to generate new access tokens when they expire.
	 */
	@ApiProperty({
		description: 'JWT refresh token for token renewal',
		example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
	})
	refreshToken: string;

	/**
	 * User information from authenticated session.
	 * Contains basic user data for the authenticated user.
	 */
	@ApiProperty({
		description: 'User information from authenticated session',
		type: 'object',
		properties: {
			id: {
				type: 'string',
				description: 'Unique user identifier',
				example: '123e4567-e89b-12d3-a456-426614174000',
			},
			email: {
				type: 'string',
				description: 'User email address',
				example: 'octavio@conversia.com',
			},
			name: {
				type: 'string',
				description: 'User full name',
				example: 'Octavio Bruza',
			},
			role: {
				type: 'string',
				description: 'User role in the system',
				example: 'AGENT',
				enum: ['ADMIN', 'MANAGER', 'AGENT'],
			},
			companyId: {
				type: 'string',
				description: 'Company identifier the user belongs to',
				example: 'company-123',
				nullable: true,
			},
			avatar: {
				type: 'string',
				description: 'User avatar URL',
				example: 'https://example.com/avatar.jpg',
				nullable: true,
			},
		},
	})
	user: {
		id: string;
		email: string;
		name: string;
		role: string;
		companyId?: string;
		avatar?: string;
	};

	/**
	 * Token expiration timestamp.
	 * Indicates when the access token will expire.
	 */
	@ApiProperty({
		description: 'Token expiration timestamp',
		example: '2024-01-01T12:00:00.000Z',
		type: 'string',
		format: 'date-time',
	})
	expiresAt: Date;
}
