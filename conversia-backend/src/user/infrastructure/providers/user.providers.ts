import { Provider } from '@nestjs/common';
import { USER_REPOSITORY, PASSWORD_HASHER, EMAIL_SERVICE, EVENT_PUBLISHER } from '../../app/ports/tokens';
import { UserRepositoryAdapter } from '../adapters/repositories/user-repository.adapter';
import { PasswordHasherAdapter } from '../adapters/services/password-hasher.adapter';
import { EmailServiceAdapter } from '../adapters/services/email-service.adapter';
import { EventPublisherAdapter } from '../adapters/services/event-publisher.adapter';

/**
 * Providers configuration for User module infrastructure layer.
 * Maps ports to their concrete implementations using dependency injection tokens.
 */
export const userInfrastructureProviders: Provider[] = [
	{
		provide: USER_REPOSITORY,
		useClass: UserRepositoryAdapter,
	},
	{
		provide: PASSWORD_HASHER,
		useClass: PasswordHasherAdapter,
	},
	{
		provide: EMAIL_SERVICE,
		useClass: EmailServiceAdapter,
	},
	{
		provide: EVENT_PUBLISHER,
		useClass: EventPublisherAdapter,
	},
];
