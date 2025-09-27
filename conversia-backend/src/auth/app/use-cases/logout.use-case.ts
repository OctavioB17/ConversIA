import { Injectable, Inject } from '@nestjs/common';
import { AUTH_SESSION_REPOSITORY, EVENT_PUBLISHER } from '../ports/tokens';
import AuthSessionRepositoryPort from '../ports/auth-session-repository.port';
import EventPublisherPort from '../../../user/app/ports/event-publisher.port';
import AccessToken from '../../domain/value-objects/access-token.vo';

/**
 * Use case for user logout.
 * Deactivates authentication session and publishes logout events.
 */
@Injectable()
export class LogoutUseCase {
	constructor(
		@Inject(AUTH_SESSION_REPOSITORY)
		private readonly sessionRepository: AuthSessionRepositoryPort,
		@Inject(EVENT_PUBLISHER)
		private readonly eventPublisher: EventPublisherPort,
	) {}

	/**
	 * Logs out user by deactivating their authentication session.
	 * @param accessToken Access token to identify the session to deactivate
	 */
	async execute(accessToken: string): Promise<void> {
		const token = AccessToken.create(accessToken);
		const session = await this.sessionRepository.findByAccessToken(token);

		if (!session) {
			return;
		}

		session.deactivate();
		await this.sessionRepository.save(session);

		const events = session.pullDomainEvents();
		await this.eventPublisher.publishMany(events);
	}
}