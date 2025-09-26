import UserId from '../value-objects/user-id.vo';

export default class UserReactivatedEvent {
	constructor(
		public readonly aggregateId: UserId,
		public readonly occurredAt: Date = new Date(),
	) {}
}
