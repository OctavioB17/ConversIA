import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsIn } from 'class-validator';

/**
 * HTTP request DTO for OAuth2 login initiation.
 * Contains provider information and optional device details for OAuth2 authentication flow.
 */
export class OAuth2LoginRequestDto {
	/**
	 * OAuth2 provider identifier.
	 * Must be one of the supported providers.
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
