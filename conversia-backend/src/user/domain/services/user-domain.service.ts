import { UserRole } from "../entities/types/user-roles.types";
import User from "../entities/user";
import UserRoleVo from "../value-objects/user-role.vo";

/**
 * Domain service containing business rules that involve multiple users or cross-cutting concerns.
 * Pure functions with no I/O dependencies.
 */
export default class UserDomainService {
	/**
	 * Determines if a requester can change a target user's role.
	 * Business rules:
	 * - Admin can change anyone's role
	 * - Manager can change AGENT roles, but not ADMIN roles
	 * - Agent cannot change any roles
	 * @param requester User requesting the change
	 * @param target User whose role would be changed
	 * @param newRole New role to assign
	 * @returns True if the change is allowed
	 */
	static canChangeRole(requester: User, target: User, newRole: UserRoleVo): boolean {
		const reqRole = requester.role?.enum ?? UserRole.AGENT;
		const tgtRole = target.role?.enum ?? UserRole.AGENT;

		if (reqRole === UserRole.ADMIN) return true;
		// cannot elevate to ADMIN, cannot change ADMINs
		if (reqRole === UserRole.MANAGER) {
			if (tgtRole === UserRole.ADMIN) return false;
			if (newRole.enum === UserRole.ADMIN) return false;
			return true;
		}
		return false;
	}

	/**
	 * Determines if a requester can deactivate a target user.
	 * Business rules:
	 * - Admin can deactivate anyone except themselves
	 * - Manager can deactivate AGENT users only
	 * - Agent cannot deactivate anyone
	 * @param requester User requesting the deactivation
	 * @param target User to be deactivated
	 * @returns True if deactivation is allowed
	 */
	static canDeactivate(requester: User, target: User): boolean {
		const reqRole = requester.role?.enum ?? UserRole.AGENT;
		const tgtRole = target.role?.enum ?? UserRole.AGENT;

		if (reqRole === UserRole.ADMIN) {
			// Prevent self-deactivation
			if (requester.id.toString() === target.id.toString()) return false;
			return true;
		}
		if (reqRole === UserRole.MANAGER) {
			return tgtRole === UserRole.AGENT && requester.id.toString() !== target.id.toString();
		}
		return false;
	}
}
