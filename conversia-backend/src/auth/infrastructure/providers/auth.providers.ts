import { Provider } from '@nestjs/common';
import { JWT_SERVICE, OAUTH2_SERVICE, AUTH_SESSION_REPOSITORY } from '../../app/ports/tokens';
import { JwtServiceAdapter } from '../adapters/services/jwt-service.adapter';
import { OAuth2ServiceAdapter } from '../adapters/services/oauth2-service.adapter';
import { AuthSessionRepositoryAdapter } from '../adapters/repositories/auth-session-repository.adapter';

/**
 * Providers configuration for Auth module infrastructure layer.
 * Maps ports to their concrete implementations using dependency injection tokens.
 */
export const authInfrastructureProviders: Provider[] = [
	{
		provide: JWT_SERVICE,
		useClass: JwtServiceAdapter,
	},
	{
		provide: OAUTH2_SERVICE,
		useClass: OAuth2ServiceAdapter,
	},
	{
		provide: AUTH_SESSION_REPOSITORY,
		useClass: AuthSessionRepositoryAdapter,
	},
];
