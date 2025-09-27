import { Body, Controller, Get, Post, UseGuards, UsePipes, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthRolesGuard } from '../guards/auth-roles.guard';
import { AuthValidationPipe } from '../pipes/validation.pipe';
import { AuthTransformPipe } from '../pipes/transform.pipe';
import { Public } from '../decorators/public.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { AuthenticatedRequest } from '../types/authenticated-request.types';

// Use Cases
import { LoginUseCase } from '../../app/use-cases/login.use-case';
import { OAuth2LoginUseCase } from '../../app/use-cases/oauth2-login.use-case';
import { OAuth2CallbackUseCase } from '../../app/use-cases/oauth2-callback.usse-case';
import { RefreshTokenUseCase } from '../../app/use-cases/refresh-token.use-case';
import { LogoutUseCase } from '../../app/use-cases/logout.use-case';

// DTOs
import { LoginRequestDto } from '../dto/login-request.dto';
import { OAuth2LoginRequestDto } from '../dto/oauth2-login-request.dto';
import { OAuth2CallbackRequestDto } from '../dto/oauth2-callback-request.dto';
import { RefreshTokenRequestDto } from '../dto/refresh-token-request.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { OAuth2LoginResponseDto } from '../dto/oauth2-login-response.dto';
import { ErrorResponseDto } from '../dto/error-response.dto';

// Mappers
import { AuthPresentationMapper } from '../mappers/auth-presentation.mapper';

/**
 * Authentication controller.
 * Handles all authentication-related HTTP endpoints.
 */
@ApiTags('Authentication')
@Controller('auth')
@UseGuards(JwtAuthGuard, AuthRolesGuard)
@UsePipes(AuthValidationPipe, AuthTransformPipe)
export class AuthController {
	constructor(
		private readonly loginUseCase: LoginUseCase,
		private readonly oauth2LoginUseCase: OAuth2LoginUseCase,
		private readonly oauth2CallbackUseCase: OAuth2CallbackUseCase,
		private readonly refreshTokenUseCase: RefreshTokenUseCase,
		private readonly logoutUseCase: LogoutUseCase,
	) {}

	/**
	 * Authenticates a user with email and password.
	 * Creates a new authentication session and returns JWT tokens.
	 */
	@Post('login')
	@Public()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ 
		summary: 'User login',
		description: 'Authenticates a user with email and password, returns JWT tokens'
	})
	@ApiResponse({ 
		status: 200, 
		description: 'Login successful', 
		type: AuthResponseDto 
	})
	@ApiResponse({ 
		status: 401, 
		description: 'Invalid credentials', 
		type: ErrorResponseDto 
	})
	@ApiResponse({ 
		status: 400, 
		description: 'Validation failed', 
		type: ErrorResponseDto 
	})
	async login(@Body() loginRequestDto: LoginRequestDto): Promise<AuthResponseDto> {
		const loginDto = AuthPresentationMapper.toLoginDto(loginRequestDto);
		const result = await this.loginUseCase.execute(loginDto);
		return AuthPresentationMapper.toAuthResponseDto(result);
	}

	/**
	 * Initiates OAuth2 login flow.
	 * Returns authorization URL for user redirection.
	 */
	@Post('oauth2/login')
	@Public()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ 
		summary: 'OAuth2 login initiation',
		description: 'Initiates OAuth2 login flow and returns authorization URL'
	})
	@ApiResponse({ 
		status: 200, 
		description: 'OAuth2 login initiated', 
		type: OAuth2LoginResponseDto 
	})
	@ApiResponse({ 
		status: 400, 
		description: 'Invalid provider', 
		type: ErrorResponseDto 
	})
	async oauth2Login(@Body() oauth2LoginRequestDto: OAuth2LoginRequestDto): Promise<OAuth2LoginResponseDto> {
		const oauth2LoginDto = AuthPresentationMapper.toOAuth2LoginDto(oauth2LoginRequestDto);
		const result = await this.oauth2LoginUseCase.execute(oauth2LoginDto);
		return AuthPresentationMapper.toOAuth2LoginResponseDto(result.authorizationUrl, result.state);
	}

	/**
	 * Handles OAuth2 callback.
	 * Processes authorization code and completes authentication.
	 */
	@Post('oauth2/callback')
	@Public()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ 
		summary: 'OAuth2 callback',
		description: 'Handles OAuth2 callback and completes authentication'
	})
	@ApiResponse({ 
		status: 200, 
		description: 'OAuth2 authentication successful', 
		type: AuthResponseDto 
	})
	@ApiResponse({ 
		status: 401, 
		description: 'Invalid callback', 
		type: ErrorResponseDto 
	})
	@ApiResponse({ 
		status: 400, 
		description: 'Validation failed', 
		type: ErrorResponseDto 
	})
	async oauth2Callback(@Body() oauth2CallbackRequestDto: OAuth2CallbackRequestDto): Promise<AuthResponseDto> {
		const oauth2CallbackDto = AuthPresentationMapper.toOAuth2CallbackDto(oauth2CallbackRequestDto);
		const result = await this.oauth2CallbackUseCase.execute(oauth2CallbackDto);
		return AuthPresentationMapper.toAuthResponseDto(result);
	}

	/**
	 * Refreshes authentication tokens.
	 * Generates new access and refresh tokens using a valid refresh token.
	 */
	@Post('refresh')
	@Public()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ 
		summary: 'Refresh tokens',
		description: 'Generates new access and refresh tokens using a valid refresh token'
	})
	@ApiResponse({ 
		status: 200, 
		description: 'Tokens refreshed successfully', 
		type: AuthResponseDto 
	})
	@ApiResponse({ 
		status: 401, 
		description: 'Invalid refresh token', 
		type: ErrorResponseDto 
	})
	@ApiResponse({ 
		status: 400, 
		description: 'Validation failed', 
		type: ErrorResponseDto 
	})
	async refresh(@Body() refreshTokenRequestDto: RefreshTokenRequestDto): Promise<AuthResponseDto> {
		const refreshTokenDto = AuthPresentationMapper.toRefreshTokenDto(refreshTokenRequestDto);
		const result = await this.refreshTokenUseCase.execute(refreshTokenDto);
		return AuthPresentationMapper.toAuthResponseDto(result);
	}

	/**
	 * Logs out the current user.
	 * Deactivates the user's authentication session.
	 */
	@Post('logout')
	@ApiBearerAuth()
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ 
		summary: 'User logout',
		description: 'Logs out the current user and deactivates their session'
	})
	@ApiResponse({ 
		status: 204, 
		description: 'Logout successful' 
	})
	@ApiResponse({ 
		status: 401, 
		description: 'Authentication required', 
		type: ErrorResponseDto 
	})
	async logout(@Req() request: AuthenticatedRequest): Promise<void> {
		const authHeader = request.headers.authorization as string;
		const token = this.extractTokenFromHeader(authHeader);
		
		if (token) {
			await this.logoutUseCase.execute(token);
		}
	}

	/**
	 * Gets current user profile.
	 * Returns information about the currently authenticated user.
	 */
	@Get('me')
	@ApiBearerAuth()
	@ApiOperation({ 
		summary: 'Get current user',
		description: 'Returns information about the currently authenticated user'
	})
	@ApiResponse({ 
		status: 200, 
		description: 'User information retrieved', 
		type: AuthResponseDto 
	})
	@ApiResponse({ 
		status: 401, 
		description: 'Authentication required', 
		type: ErrorResponseDto 
	})
	async getCurrentUser(@CurrentUser() user: AuthenticatedRequest['user']): Promise<{ user: AuthenticatedRequest['user'] }> {
		return { user };
	}

	/**
	 * Extracts JWT token from Authorization header.
	 * @param authHeader Authorization header value
	 * @returns Token string or null
	 */
	private extractTokenFromHeader(authHeader: string): string | null {
		if (!authHeader) {
			return null;
		}

		const parts = authHeader.split(' ');
		if (parts.length !== 2 || parts[0] !== 'Bearer') {
			return null;
		}

		return parts[1];
	}
}
