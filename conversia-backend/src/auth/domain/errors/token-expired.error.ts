export default class TokenExpiredError extends Error {
	constructor() {
		super('Token has expired');
		this.name = 'TokenExpiredError';
	}
}