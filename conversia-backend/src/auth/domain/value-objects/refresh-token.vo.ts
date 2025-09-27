/**
 * Value Object representing a refresh token.
 * Invariant: must be a secure random string.
 */
export default class RefreshToken {
	private constructor(private readonly value: string) {
		if (!value || value.length < 32) {
			throw new Error('Invalid refresh token');
		}
	}

	static create(token: string): RefreshToken {
		return new RefreshToken(token);
	}

	static generate(): RefreshToken {
        throw new Error('Use TokenService to generate refresh tokens');
	}

	toString(): string {
		return this.value;
	}

	equals(other: RefreshToken): boolean {
		return this.value === other.value;
	}
}