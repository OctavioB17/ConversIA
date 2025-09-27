/**
 * Command DTO for creating a new user.
 * Internal application structure for user creation.
 */
export default class CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyId?: string;
  role: string;
  avatar?: string;
}
