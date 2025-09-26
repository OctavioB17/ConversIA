/**
 * Command DTO for updating user information.
 */
export default class UpdateUserDto {
  userId: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}
