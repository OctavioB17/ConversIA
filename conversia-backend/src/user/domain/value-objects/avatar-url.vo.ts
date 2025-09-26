/**
 * Value Object representing a valid avatar URL.
 * Invariant: must be a valid absolute URL (http/https).
 */
export default class UserAvatarUrl {
	private constructor(private readonly value: string) {
		try {
			new URL(value);
		} catch {
			throw new Error('Invalid URL');
		}
	}
	static create(raw: string): UserAvatarUrl {
		return new UserAvatarUrl(raw.trim());
	}

	toString(): string {
		return this.value;
	}
}
