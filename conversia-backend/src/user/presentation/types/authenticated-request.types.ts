import { Request } from 'express';

/**
 * Extended Request interface for authenticated users.
 * Contains user information extracted from JWT tokens.
 */
export interface AuthenticatedRequest extends Request {
	user?: {
		id: string;
		email: string;
		role: string;
		companyId?: string;
		iat?: number;
		exp?: number;
	};
}