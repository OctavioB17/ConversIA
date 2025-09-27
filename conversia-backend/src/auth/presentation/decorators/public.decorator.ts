import { SetMetadata } from '@nestjs/common';

/**
 * Decorator to mark routes as public (no authentication required).
 * Used in conjunction with JwtAuthGuard to bypass authentication.
 */
export const Public = () => SetMetadata('isPublic', true);
