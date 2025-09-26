import UserAvatarUrl from "../../value-objects/avatar-url.vo";
import UserEmail from "../../value-objects/user-email.vo";
import UserId from "../../value-objects/user-id.vo";
import UserPassword from "../../value-objects/user-password.vo";
import PersonName from "../../value-objects/person-name.vo";
import UserRoleVo from "../../value-objects/user-role.vo";

/**
 * Shape of the User domain entity internal state.
 *
 * Notes:
 * - Email and identifiers are Value Objects; keep primitives out of the domain wherever possible.
 * - `password` stores a HASH (never raw). Hashing occurs outside the domain (e.g., via a PasswordHasherPort).
 * - `avatar` may be optional depending on business rules; if optional, set it to `UserAvatarUrl | undefined`.
 */
export type UserProps = {
	id: UserId,
	email: UserEmail,
	password: UserPassword,
	name: PersonName,
	avatar?: UserAvatarUrl,
	isActive: boolean,
	role: UserRoleVo,
	emailVerifiedAt?: Date | null,
	createdAt: Date,
	updatedAt: Date,
}
