export default class InvalidAvatarUrlError extends Error {
	constructor() {
		super('Invalid avatar URL');
		this.name = 'InvalidAvatarUrlError';
	}
}
