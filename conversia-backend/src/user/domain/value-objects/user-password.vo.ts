/**
 * Value Object encapsulating a password HASH (not raw password).
 * Invariant: must follow the selected hashing scheme (example: bcrypt `$2` prefix).
 */
export default class UserPassword {
	private constructor(private readonly hash: string) {
		if (!hash?.startsWith('$2')) {
			throw new Error('Invalid hash');
		}
	}

	static fromHash(hash: string): UserPassword {
		return new UserPassword(hash);
	}

	getHash(): string {
		return this.hash;
	}
}
