/**
 * Value Object representing an email verification token.
 * Invariant: non-empty opaque string; format policy can evolve.
 */
export default class EmailVerificationToken {
	private constructor(private readonly value: string) {
		if (!value || typeof value !== 'string' || value.trim().length < 10) {
			throw new Error('Invalid verification token');
		}
	}

	static create(raw: string): EmailVerificationToken {
		return new EmailVerificationToken(raw.trim());
	}

	toString(): string {
		return this.value;
	}
}


