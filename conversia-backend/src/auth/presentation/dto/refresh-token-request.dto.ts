import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

/**
 * HTTP request DTO for token refresh.
 * Contains refresh token and optional device information for token renewal.
 */
export class RefreshTokenRequestDto {
	/**
	 * Refresh token for generating new access token.
	 * Must be a valid, non-expired refresh token.
	 */
	@ApiProperty({
		description: 'Refresh token for generating new access token',
		example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
	})
	@IsString({ message: 'Refresh token must be a string' })
	refreshToken: string;

	/**
	 * Optional device information for security tracking.
	 * Can include device type, OS, browser, etc.
	 */
	@ApiProperty({
		description: 'Optional device information for security tracking',
		example: 'Chrome 120.0.0 on Windows 10',
		required: false,
	})
	@IsOptional()
	@IsString({ message: 'Device info must be a string' })
	deviceInfo?: string;

	/**
	 * Optional IP address for security tracking.
	 * Should be automatically captured by the server.
	 */
	@ApiProperty({
		description: 'Optional IP address for security tracking',
		example: '192.168.1.100',
		required: false,
	})
	@IsOptional()
	@IsString({ message: 'IP address must be a string' })
	ipAddress?: string;
}
