import UserId from '../value-objects/user-id.vo';

export default class UserDeactivatedEvent {
	constructor(
		public readonly aggregateId: UserId,
		public readonly occurredAt: Date = new Date(),
		public readonly reason?: string,
	) {}
}
