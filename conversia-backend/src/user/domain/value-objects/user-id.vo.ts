import { randomUUID } from "crypto";

/**
 * Value Object representing a User identifier (UUID v4).
 * Invariant: must be a valid UUID string.
 */
export default class UserId {
	private constructor(private readonly value: string) {
		if (!/^[0-9a-fA-F-]{36}$/.test(value)) throw new Error('Invalid user id');
	}

	static new(): UserId {
		return new UserId(randomUUID());
	}

	/**
	 * Creates a UserId from an existing string value (e.g., from DB or params).
	 */
	static from(value: string): UserId {
		return new UserId(value);
	}

	toString(): string {
		return this.value
	}

	equals(other: UserId): boolean {
		return this.value === other.value
	}
}
