/**
 * Response DTO for authentication operations.
 * Contains authentication tokens and user information after successful login.
 */
export default class AuthResponseDto {
    /** JWT access token for API authentication */
    accessToken: string;
    
    /** JWT refresh token for token renewal */
    refreshToken: string;
    
    /** User information from authenticated session */
    user: {
        /** Unique user identifier */
        id: string;
        
        /** User's email address */
        email: string;
        
        /** User's full name */
        name: string;
        
        /** User's role in the system */
        role: string;
        
        /** Company identifier the user belongs to */
        companyId?: string;
        
        /** Optional user avatar URL */
        avatar?: string;
    };
    
    /** Token expiration timestamp */
    expiresAt: Date;
}