import { UserRole } from "src/user/domain/entities/types/user-roles.types";

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
  companyId?: string;
  isActive: boolean;
  role: UserRole;
  emailVerifiedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
