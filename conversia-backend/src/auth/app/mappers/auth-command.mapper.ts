import LoginDto from "../dto/login-dto";
import OAuth2CallbackDto from "../dto/oauth-callback.dto";
import OAuth2LoginDto from "../dto/oauth2-login.dto";
import RefreshTokenDto from "../dto/refresh-token.dto";

/**
 * Mapper for converting command DTOs to domain objects.
 * Handles the transformation between application layer DTOs and domain objects for authentication commands.
 */
export default class AuthCommandMapper {
    /**
	 * Converts LoginDto to domain objects.
	 * @param dto Login command DTO from application layer
	 * @returns Domain objects for login operation
	 */
    static toLoginProps(dto: LoginDto) {
        return {
            email: dto.email,
            password: dto.password,
            deviceInfo: dto.deviceInfo,
            ipAddress: dto.ipAddress,
        }
    }

	/**
	 * Converts OAuth2LoginDto to domain objects.
	 * @param dto OAuth2 login command DTO from application layer
	 * @returns Domain objects for OAuth2 login initiation
	 */
	static toOAuth2LoginProps(dto: OAuth2LoginDto) {
		return {
			provider: dto.provider,
			deviceInfo: dto.deviceInfo,
			ipAddress: dto.ipAddress,
		};
	}

    
	/**
	 * Converts OAuth2CallbackDto to domain objects.
	 * @param dto OAuth2 callback command DTO from application layer
	 * @returns Domain objects for OAuth2 callback processing
	 */
	static toOAuth2CallbackProps(dto: OAuth2CallbackDto) {
		return {
			provider: dto.provider,
			code: dto.code,
			state: dto.state,
			deviceInfo: dto.deviceInfo,
			ipAddress: dto.ipAddress,
		};
	}

    /**
	 * Converts RefreshTokenDto to domain objects.
	 * @param dto Refresh token command DTO from application layer
	 * @returns Domain objects for token refresh operation
	 */
	static toRefreshTokenProps(dto: RefreshTokenDto) {
		return {
			refreshToken: dto.refreshToken,
			deviceInfo: dto.deviceInfo,
			ipAddress: dto.ipAddress,
		};
	}
}