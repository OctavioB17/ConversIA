
import UserId from 'src/user/domain/value-objects/user-id.vo';
import OAuthProvider from '../value-objects/oauth-provider.vo';

export default class UserLoggedInEvent {
	constructor(
		public readonly userId: UserId,
		public readonly sessionId: string,
		public readonly provider: OAuthProvider,
		public readonly occurredAt: Date = new Date(),
	) {}
    
}
