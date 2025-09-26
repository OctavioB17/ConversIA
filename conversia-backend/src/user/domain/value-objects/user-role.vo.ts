import { UserRole } from "../entities/types/user-roles.types";

/**
 * Value Object wrapper for a User role to centralize validation.
 */
export default class UserRoleVo {
	private constructor(private readonly value: UserRole) {}

	static create(raw: string): UserRoleVo {
		const upper = raw?.toUpperCase?.();
		if (!upper || !(upper in UserRole)) {
			throw new Error('Invalid user role');
		}
		return new UserRoleVo(upper as UserRole);
	}

	static from(role: UserRole): UserRoleVo {
		return new UserRoleVo(role);
	}

	toString(): string {
		return this.value;
	}

	get enum(): UserRole {
		return this.value;
	}

	equals(other: UserRoleVo): boolean {
		return this.value === other.value;
	}
}


