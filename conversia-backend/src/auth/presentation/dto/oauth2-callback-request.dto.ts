import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsIn } from 'class-validator';

/**
 * HTTP request DTO for OAuth2 callback handling.
 * Contains authorization code and state from OAuth2 provider callback.
 */
export class OAuth2CallbackRequestDto {
	/**
	 * OAuth2 provider identifier.
	 * Must match the provider used in the login initiation.
	 */
	@ApiProperty({
		description: 'OAuth2 provider identifier',
		example: 'google',
		enum: ['google', 'facebook', 'github'],
	})
	@IsString({ message: 'Provider must be a string' })
	@IsIn(['google', 'facebook', 'github'], { 
		message: 'Provider must be one of: google, facebook, github' 
	})
	provider: string;

	/**
	 * Authorization code returned by OAuth2 provider.
	 * This code will be exchanged for access tokens.
	 */
	@ApiProperty({
		description: 'Authorization code from OAuth2 provider',
		example: '4/0AX4XfWi...',
	})
	@IsString({ message: 'Authorization code must be a string' })
	code: string;

	/**
	 * State parameter for CSRF protection.
	 * Must match the state parameter sent during login initiation.
	 */
	@ApiProperty({
		description: 'State parameter for CSRF protection',
		example: 'random-state-string-12345',
	})
	@IsString({ message: 'State must be a string' })
	state: string;

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
