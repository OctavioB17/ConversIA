import UserId from '../../domain/value-objects/user-id.vo';
import UserEmail from '../../domain/value-objects/user-email.vo';

/**
 * Mapper for converting query parameters to domain objects.
 */
export class UserQueryMapper {
	/**
   * Converts string ID to UserId value object.
   * @param id String identifier
   * @returns UserId value object
   */
		static toUserId(id: string): UserId {
			return UserId.from(id);
		}

	/**
   * Converts string email to UserEmail value object.
   * @param email String email
   * @returns UserEmail value object
   */
  static toUserEmail(email: string): UserEmail {
    return UserEmail.create(email);
  }
}
