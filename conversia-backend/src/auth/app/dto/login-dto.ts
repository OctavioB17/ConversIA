/**
 * Command DTO for user login.
 * Contains credentials and optional device information for authentication.
 */
export default class LoginDto {
	/** User's email address for authentication */
	email: string;
	
	/** User's plain text password */
	password: string;
	
	/** Optional device information for security tracking */
	deviceInfo?: string;
	
	/** Optional IP address for security tracking */
	ipAddress?: string;
}