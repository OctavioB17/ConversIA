import UserId from "src/user/domain/value-objects/user-id.vo";
import OAuthProvider from "../value-objects/oauth-provider.vo";

export default class OAuthLoginSuccessEvent {
	constructor(
		public readonly userId: UserId,
		public readonly provider: OAuthProvider,
		public readonly providerId: string,
		public readonly occurredAt: Date = new Date(),
	) {}
}