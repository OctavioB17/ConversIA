import { randomUUID } from 'crypto';

/**
 * Company ID value object.
 * Represents a unique identifier for a company in the system.
 */
export default class CompanyId {
    private constructor(private readonly value: string) {}

    /**
     * Creates a new CompanyId from a string value.
     * @param value String representation of the company ID.
     * @returns CompanyId instance.
     * @throws Error if value is invalid.
     */
    static create(value: string): CompanyId {
        if (!value || value.trim().length === 0) {
            throw new Error('Company ID cannot be empty');
        }

        // Validate UUID format if it's a UUID
        if (value.includes('-')) {
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            if (!uuidRegex.test(value)) {
                throw new Error('Invalid UUID format for Company ID');
            }
        }

        return new CompanyId(value);
    }

    /**
     * Generates a new random CompanyId.
     * @returns New CompanyId with random UUID.
     */
    static new(): CompanyId {
        return new CompanyId(randomUUID());
    }

    /**
     * Returns the string representation of the company ID.
     * @returns Company ID as string.
     */
    toString(): string {
        return this.value;
    }

    /**
     * Returns the string representation of the company ID.
     * @returns Company ID as string.
     */
    getValue(): string {
        return this.value;
    }

    /**
     * Compares this CompanyId with another for equality.
     * @param other Another CompanyId to compare.
     * @returns True if both represent the same company ID.
     */
    equals(other: CompanyId): boolean {
        return this.value === other.value;
    }
}
