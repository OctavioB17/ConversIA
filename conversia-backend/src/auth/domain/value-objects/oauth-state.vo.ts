/**
 * Value Object representing OAuth2 state parameter for CSRF protection.
 * Invariant: must be a secure random string.
 */
export default class OAuthState {
	private constructor(private readonly value: string) {
		if (!value || value.length < 16) {
			throw new Error('Invalid OAuth state parameter');
		}
	}

	static create(state: string): OAuthState {
		return new OAuthState(state);
	}

	static generate(): OAuthState {
		throw new Error('Use OAuthService to generate state');
	}

	toString(): string {
		return this.value;
	}

	equals(other: OAuthState): boolean {
		return this.value === other.value;
	}
}