export default class SessionNotFoundError extends Error {
	constructor() {
		super('Session not found or inactive');
		this.name = 'SessionNotFoundError';
	}
}