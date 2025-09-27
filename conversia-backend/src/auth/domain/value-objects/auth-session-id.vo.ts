import { randomUUID } from 'crypto';

/**
 * Value Object for authentication session identifier.
 * Represents a unique identifier for authentication sessions.
 */
export default class AuthSessionId {
	private constructor(private readonly value: string) {
		if (!value || value.trim().length === 0) {
			throw new Error('AuthSessionId cannot be empty');
		}

		// Validate UUID format
		const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
		if (!uuidRegex.test(value)) {
			throw new Error('AuthSessionId must be a valid UUID');
		}
	}

	/**
	 * Creates a new AuthSessionId with a generated UUID.
	 * @returns New AuthSessionId instance
	 */
	static new(): AuthSessionId {
		return new AuthSessionId(randomUUID());
	}

	/**
	 * Creates an AuthSessionId from an existing UUID string.
	 * @param value UUID string
	 * @returns AuthSessionId instance
	 * @throws Error if value is not a valid UUID
	 */
	static from(value: string): AuthSessionId {
		return new AuthSessionId(value);
	}

	/**
	 * Gets the string representation of the AuthSessionId.
	 * @returns UUID string
	 */
	toString(): string {
		return this.value;
	}

	/**
	 * Compares this AuthSessionId with another for equality.
	 * @param other Other AuthSessionId to compare
	 * @returns True if they represent the same session ID
	 */
	equals(other: AuthSessionId): boolean {
		return this.value === other.value;
	}

	/**
	 * Gets the raw value of the AuthSessionId.
	 * @returns UUID string
	 */
	getValue(): string {
		return this.value;
	}
}
