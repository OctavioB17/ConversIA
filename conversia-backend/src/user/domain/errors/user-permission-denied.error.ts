export default class UserPermissionDeniedError extends Error {
	constructor(message = 'Permission denied') {
		super(message);
		this.name = 'UserPermissionDeniedError';
	}
}
