export default class UserCannotChangeRoleError extends Error {
	constructor() {
		super('Requester cannot change target role');
		this.name = 'UserCannotChangeRoleError';
	}
}
