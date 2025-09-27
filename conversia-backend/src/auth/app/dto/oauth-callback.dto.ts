/**
 * Command DTO for OAuth2 callback handling.
 * Contains authorization code and state from OAuth2 provider callback.
 */
export default class OAuth2CallbackDto {
    /** OAuth2 provider identifier (google, facebook, etc.) */
    provider: string;
    
    /** Authorization code returned by OAuth2 provider */
    code: string;
    
    /** State parameter for CSRF protection */
    state: string;
    
    /** Optional device information for security tracking */
    deviceInfo?: string;
    
    /** Optional IP address for security tracking */
    ipAddress?: string;
}