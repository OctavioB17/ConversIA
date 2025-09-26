import UserResponseDto from "./user-response.dto";

/**
 * Response DTO for user list with pagination.
 */
export default class UserListResponseDto {
  users: UserResponseDto[];
  total: number;
  page: number;
  limit: number;
}
