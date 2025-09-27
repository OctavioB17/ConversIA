import { LoginRequestDto } from '../dto/login-request.dto';
import { OAuth2LoginRequestDto } from '../dto/oauth2-login-request.dto';
import { OAuth2CallbackRequestDto } from '../dto/oauth2-callback-request.dto';
import { RefreshTokenRequestDto } from '../dto/refresh-token-request.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { OAuth2LoginResponseDto } from '../dto/oauth2-login-response.dto';
import LoginDto from '../../app/dto/login-dto';
import OAuth2LoginDto from '../../app/dto/oauth2-login.dto';
import OAuth2CallbackDto from '../../app/dto/oauth-callback.dto';
import RefreshTokenDto from '../../app/dto/refresh-token.dto';
import AppAuthResponseDto from '../../app/dto/auth-response.dto';

/**
 * Mapper for converting between HTTP DTOs and Application DTOs.
 * Handles the transformation between presentation layer and application layer.
 */
export class AuthPresentationMapper {
	/**
	 * Converts LoginRequestDto (HTTP) to LoginDto (Application).
	 * @param httpDto HTTP request DTO
	 * @returns Application DTO
	 */
	static toLoginDto(httpDto: LoginRequestDto): LoginDto {
		return {
			email: httpDto.email,
			password: httpDto.password,
			deviceInfo: httpDto.deviceInfo,
			ipAddress: httpDto.ipAddress,
		};
	}

	/**
	 * Converts OAuth2LoginRequestDto (HTTP) to OAuth2LoginDto (Application).
	 * @param httpDto HTTP request DTO
	 * @returns Application DTO
	 */
	static toOAuth2LoginDto(httpDto: OAuth2LoginRequestDto): OAuth2LoginDto {
		return {
			provider: httpDto.provider,
			deviceInfo: httpDto.deviceInfo,
			ipAddress: httpDto.ipAddress,
		};
	}

	/**
	 * Converts OAuth2CallbackRequestDto (HTTP) to OAuth2CallbackDto (Application).
	 * @param httpDto HTTP request DTO
	 * @returns Application DTO
	 */
	static toOAuth2CallbackDto(httpDto: OAuth2CallbackRequestDto): OAuth2CallbackDto {
		return {
			provider: httpDto.provider,
			code: httpDto.code,
			state: httpDto.state,
			deviceInfo: httpDto.deviceInfo,
			ipAddress: httpDto.ipAddress,
		};
	}

	/**
	 * Converts RefreshTokenRequestDto (HTTP) to RefreshTokenDto (Application).
	 * @param httpDto HTTP request DTO
	 * @returns Application DTO
	 */
	static toRefreshTokenDto(httpDto: RefreshTokenRequestDto): RefreshTokenDto {
		return {
			refreshToken: httpDto.refreshToken,
			deviceInfo: httpDto.deviceInfo,
			ipAddress: httpDto.ipAddress,
		};
	}

	/**
	 * Converts AppAuthResponseDto (Application) to AuthResponseDto (HTTP).
	 * @param appDto Application response DTO
	 * @returns HTTP response DTO
	 */
	static toAuthResponseDto(appDto: AppAuthResponseDto): AuthResponseDto {
		return {
			accessToken: appDto.accessToken,
			refreshToken: appDto.refreshToken,
			user: {
				id: appDto.user.id,
				email: appDto.user.email,
				name: appDto.user.name,
				role: appDto.user.role,
				companyId: appDto.user.companyId,
				avatar: appDto.user.avatar,
			},
			expiresAt: appDto.expiresAt,
		};
	}

	/**
	 * Converts OAuth2 login result to OAuth2LoginResponseDto (HTTP).
	 * @param authorizationUrl OAuth2 authorization URL
	 * @param state State parameter
	 * @returns HTTP response DTO
	 */
	static toOAuth2LoginResponseDto(authorizationUrl: string, state: string): OAuth2LoginResponseDto {
		return {
			authorizationUrl,
			state,
		};
	}
}
