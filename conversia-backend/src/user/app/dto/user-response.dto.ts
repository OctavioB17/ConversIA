/**
 * Response DTO for user data.
 * Used to return user information to clients.
 */
export default class UserResponseDto {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  isActive: boolean;
  role?: string;
  emailVerifiedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
