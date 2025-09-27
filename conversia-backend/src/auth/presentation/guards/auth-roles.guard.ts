import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRole } from "src/user/domain/entities/types/user-roles.types";
import { AuthenticatedRequest } from "../types/authenticated-request.types";

/**
 * Authorization guard that checks if user has required roles.
 * Works in conjunction with @Roles decorator for Auth endpoints.
 */
@Injectable()
export class AuthRolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
			context.getHandler(),
			context.getClass(),
		]);

		if (!requiredRoles) {
			return true;
		}

		const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
		const user = request.user;

		if (!user) {
			throw new ForbiddenException('User not authenticated');
		}

		const hasRole = requiredRoles.some((role) => user.role === role.toString());

		if (!hasRole) {
			throw new ForbiddenException('Insufficient permissions');
		}

		return true;
	}
}
