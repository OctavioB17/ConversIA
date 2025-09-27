import { ApiProperty } from '@nestjs/swagger';

/**
 * HTTP response DTO for error responses.
 * Provides consistent error response format across the application.
 */
export class ErrorResponseDto {
	/**
	 * Error status code.
	 * HTTP status code indicating the type of error.
	 */
	@ApiProperty({
		description: 'HTTP status code',
		example: 400,
	})
	statusCode: number;

	/**
	 * Error message.
	 * Human-readable description of the error.
	 */
	@ApiProperty({
		description: 'Error message',
		example: 'Invalid credentials',
	})
	message: string;

	/**
	 * Error details.
	 * Additional information about the error, such as validation errors.
	 */
	@ApiProperty({
		description: 'Additional error details',
		example: ['Email must be a valid email address', 'Password must be at least 6 characters long'],
		required: false,
	})
	errors?: string[];

	/**
	 * Error timestamp.
	 * When the error occurred.
	 */
	@ApiProperty({
		description: 'Error timestamp',
		example: '2024-01-01T12:00:00.000Z',
	})
	timestamp: string;

	/**
	 * Request path.
	 * The path that caused the error.
	 */
	@ApiProperty({
		description: 'Request path that caused the error',
		example: '/auth/login',
	})
	path: string;
}
