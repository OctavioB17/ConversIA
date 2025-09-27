import AccessToken from "src/auth/domain/value-objects/access-token.vo";
import RefreshToken from "src/auth/domain/value-objects/refresh-token.vo";
import User from "src/user/domain/entities/user";
import AuthResponseDto from "../dto/auth-response.dto";

/**
 * Mapper for converting domain objects to response DTOs.
 * Handles the transformation between domain objects and application layer response DTOs for authentication.
 */
export default class AuthResponseMapper {
    /**
	 * Converts authentication result to AuthResponseDto.
	 * @param user User domain entity from authentication
	 * @param accessToken Access token value object
	 * @param refreshToken Refresh token value object
	 * @param expiresAt Token expiration timestamp
	 * @returns Auth response DTO for application layer
	 */
    static toResponseDto(
        user: User,
        accessToken: AccessToken,
        refreshToken: RefreshToken,
        expiresAt: Date
    ): AuthResponseDto {
        return {
            accessToken: accessToken.toString(),
            refreshToken: refreshToken.toString(),
            user: {
                id: user.id.toString(),
                email: user.email.toString(),
                name: user.name,
                role: user.role.toString(),
                companyId: 'default-company', // TODO: Get from user
				avatar: user.avatar?.toString(),
            },
            expiresAt,
        }
    }
    
    
	/**
	 * Converts authentication result with OAuth2 user info to AuthResponseDto.
	 * @param user User domain entity from OAuth2 authentication
	 * @param accessToken Access token value object
	 * @param refreshToken Refresh token value object
	 * @param expiresAt Token expiration timestamp
	 * @param oauth2UserInfo Optional OAuth2 provider user information
	 * @returns Auth response DTO for application layer with OAuth2 data
	 */
	static toOAuth2ResponseDto(
		user: User,
		accessToken: AccessToken,
		refreshToken: RefreshToken,
		expiresAt: Date,
		oauth2UserInfo?: {
			avatar?: string;
		}
	): AuthResponseDto {
		return {
			accessToken: accessToken.toString(),
			refreshToken: refreshToken.toString(),
			user: {
				id: user.id.toString(),
				email: user.email.toString(),
				name: user.name,
				role: user.role.toString(),
				companyId:  user.companyId?.toString(),
				avatar: user.avatar?.toString() || oauth2UserInfo?.avatar,
			},
			expiresAt,
		};
	}
}