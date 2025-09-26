export default class UserNotActiveError extends Error {
	constructor() {
		super('User is not active');
		this.name = 'UserNotActiveError';
	}
}
