/**
 * Value Object representing a normalized email address.
 * Invariant: must match a basic email format and be lowercase without surrounding spaces.
 */
export default class UserEmail {
	private constructor(private readonly value: string) {
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) throw new Error('Invalid email');
	}

	static create(raw: string): UserEmail {
		return new UserEmail(raw.trim().toLowerCase())
	}

	toString(): string {
		return this.value
	}

	equals(other: UserEmail): boolean {
		return this.value === other.value
	}
}
