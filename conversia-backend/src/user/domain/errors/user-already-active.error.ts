export default class UserAlreadyActiveError extends Error {
	constructor() {
		super('User already active');
		this.name = 'UserAlreadyActiveError';
	}
}
