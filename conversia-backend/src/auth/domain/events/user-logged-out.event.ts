import UserId from "src/user/domain/value-objects/user-id.vo";

export default class UserLoggedOutEvent {
	constructor(
		public readonly userId: UserId,
		public readonly sessionId: string,
		public readonly occurredAt: Date = new Date(),
	) {}
}