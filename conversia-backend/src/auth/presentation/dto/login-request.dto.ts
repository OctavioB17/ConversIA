import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';

/**
 * HTTP request DTO for user login.
 * Contains credentials and optional device information for authentication.
 */
export class LoginRequestDto {
	/**
	 * User's email address for authentication.
	 * Must be a valid email format.
	 */
	@ApiProperty({
		description: 'User email address',
		example: 'user@example.com',
		format: 'email',
	})
	@IsEmail({}, { message: 'Email must be a valid email address' })
	email: string;

	/**
	 * User's plain text password.
	 * Must be at least 6 characters long.
	 */
	@ApiProperty({
		description: 'User password',
		example: 'password123',
		minLength: 6,
	})
	@IsString({ message: 'Password must be a string' })
	@MinLength(6, { message: 'Password must be at least 6 characters long' })
	password: string;

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
