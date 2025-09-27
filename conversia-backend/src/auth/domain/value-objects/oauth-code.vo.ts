/**
 * Value Object representing an OAuth2 authorization code.
 * Invariant: must be a valid authorization code format.
 */
export default class OAuthCode {
	private constructor(private readonly value: string) {
		if (!value || value.length < 10) {
			throw new Error('Invalid OAuth authorization code');
		}
	}

	static create(code: string): OAuthCode {
		return new OAuthCode(code);
	}

	toString(): string {
		return this.value;
	}

	equals(other: OAuthCode): boolean {
		return this.value === other.value;
	}
}