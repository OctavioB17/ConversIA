/**
 * Command DTO for OAuth2 login initiation.
 * Contains provider information and optional device details for OAuth2 authentication flow.
 */
export default class OAuth2LoginDto {
    /** OAuth2 provider identifier (google, facebook, etc.) */
    provider: string;
    
    /** Optional device information for security tracking */
    deviceInfo?: string;
    
    /** Optional IP address for security tracking */
    ipAddress?: string;
}