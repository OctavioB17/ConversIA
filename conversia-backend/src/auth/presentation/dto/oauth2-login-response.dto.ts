import { ApiProperty } from '@nestjs/swagger';

/**
 * HTTP response DTO for OAuth2 login initiation.
 * Contains authorization URL and state parameter for OAuth2 flow.
 */
export class OAuth2LoginResponseDto {
	/**
	 * OAuth2 authorization URL.
	 * User should be redirected to this URL to complete OAuth2 flow.
	 */
	@ApiProperty({
		description: 'OAuth2 authorization URL for user redirection',
		example: 'https://accounts.google.com/o/oauth2/v2/auth?client_id=...',
	})
	authorizationUrl: string;

	/**
	 * State parameter for CSRF protection.
	 * Should be stored and validated when processing the callback.
	 */
	@ApiProperty({
		description: 'State parameter for CSRF protection',
		example: 'random-state-string-12345',
	})
	state: string;
}
