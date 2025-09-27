import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { JWT_SERVICE } from '../../app/ports/tokens';
import { Inject } from '@nestjs/common';
import JwtServicePort from '../../app/ports/jwt-service.port';
import { AuthenticatedRequest } from '../types/authenticated-request.types';

/**
 * JWT Authentication guard that validates JWT tokens.
 * Extracts and validates JWT tokens from Authorization header.
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		@Inject(JWT_SERVICE)
		private readonly jwtService: JwtServicePort,
	) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
			context.getHandler(),
			context.getClass(),
		]);

		if (isPublic) {
			return true;
		}

		const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
		const token = this.extractTokenFromHeader(request);

		if (!token) {
			throw new UnauthorizedException('Access token is required');
		}

		try {
			const payload = this.jwtService.verifyToken(token);
			
			// Attach user info to request
			request.user = {
				id: payload.sub,
				email: payload.email,
				role: payload.role,
				companyId: payload.companyId,
				iat: payload.iat,
				exp: payload.exp,
			};

			return true;
		} catch (error) {
			throw new UnauthorizedException('Invalid or expired token');
		}
	}

	/**
	 * Extracts JWT token from Authorization header.
	 * @param request HTTP request object
	 * @returns JWT token string or null
	 */
	private extractTokenFromHeader(request: any): string | null {
		const authHeader = request.headers.authorization;
		return this.jwtService.extractTokenFromHeader(authHeader);
	}
}
