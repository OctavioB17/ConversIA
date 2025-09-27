import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedRequest } from '../types/authenticated-request.types';

/**
 * Decorator to extract current authenticated user from request.
 * Returns the user object attached by JwtAuthGuard.
 * @param data Optional property to extract from user object
 * @param context Execution context
 * @returns User object or specific property
 */
export const CurrentUser = createParamDecorator(
	(data: keyof AuthenticatedRequest['user'], context: ExecutionContext) => {
		const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
		const user = request.user;

		if (!user) {
			return null;
		}

		return data ? user[data] : user;
	},
);
