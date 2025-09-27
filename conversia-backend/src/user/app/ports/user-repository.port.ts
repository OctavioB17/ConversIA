import User from "src/user/domain/entities/user";
import UserEmail from "src/user/domain/value-objects/user-email.vo";
import UserId from "src/user/domain/value-objects/user-id.vo";
import CompanyId from "src/user/domain/value-objects/company-id.vo";

/**
 * Port for User repository operations.
 * Defines the contract for user persistence without implementation details.
 */
export default interface UserRepositoryPort {
	/**
   * Persists a user entity (create or update).
   * @param user User entity to save.
   * @throws Error if persistence fails.
   */
	save(user: User): Promise<void>;

	/**
   * Finds a user by its unique identifier.
   * @param id User identifier.
   * @returns User entity or null if not found.
   */
	findById(id: UserId): Promise<User | null>;

	/**
   * Finds a user by email address.
   * @param email User email.
   * @returns User entity or null if not found.
   */
	findByEmail(email: UserEmail): Promise<User | null>;

	/**
   * Finds all users belonging to a company.
   * @param companyId Company identifier.
   * @returns Array of user entities.
   */
	findByCompany(companyId: CompanyId): Promise<User[]>;

	/**
   * Removes a user from persistence.
   * @param id User identifier to delete.
   * @throws Error if deletion fails.
   */
	delete(id: UserId): Promise<void>;

	/**
   * Checks if a user exists with the given email.
   * @param email Email to check.
   * @returns True if user exists, false otherwise.
   */
	exists(email: UserEmail): Promise<boolean>;
}
