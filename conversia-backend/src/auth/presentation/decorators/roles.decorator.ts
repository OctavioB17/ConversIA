import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/user/domain/entities/types/user-roles.types';

/**
 * Decorator to specify required roles for accessing a route.
 * Used in conjunction with AuthRolesGuard for authorization.
 * @param roles Array of roles that can access the route
 */
export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
