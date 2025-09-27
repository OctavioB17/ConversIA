/**
 * Value Object representing a JWT access token.
 * Invariant: must be a valid JWT format.
 */
export default class AccessToken {
    private constructor(private readonly value: string) {
        if (!this.isValidJWT(value)) {
            throw new Error('Invalid access token format')
        }
    }

    static create(token: string): AccessToken {
        return new AccessToken(token);
    }

    static generate(payload: any, secret: string, expiresIn: string): AccessToken {
        throw new Error('Use JwtService to generate token')
    }

    toString(): string {
        return this.value;
    }

    equals(other: AccessToken): boolean {
        return this.value === other.value
    }

    private isValidJWT(token: string): boolean {
		const parts = token.split('.');
		return parts.length === 3 && parts.every(part => part.length > 0);
	}
}