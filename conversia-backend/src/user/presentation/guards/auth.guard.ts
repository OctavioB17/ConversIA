import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthenticatedRequest } from '../types/authenticated-request.types';

/**
 * Authentication guard that checks if user is authenticated.
 * Can be applied to controllers or individual routes.
 */
@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
			const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
				context.getHandler(),
				context.getClass(),
			])

			if (isPublic) {
				return true;
			}

			const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
			const user = request.user;

			if (!user) {
				throw new UnauthorizedException('Authentication required');
			}

			return true;
	}
}
