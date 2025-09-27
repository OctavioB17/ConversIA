/**
 * Command DTO for token refresh.
 * Contains refresh token and optional device information for token renewal.
 */
export default class RefreshTokenDto {
    /** Refresh token for generating new access token */
    refreshToken: string;
    
    /** Optional device information for security tracking */
    deviceInfo?: string;
    
    /** Optional IP address for security tracking */
    ipAddress?: string;
}