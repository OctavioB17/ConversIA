import User from "src/user/domain/entities/user";
import UserResponseDto from "../dto/user-response.dto";
import UserListResponseDto from "../dto/user-list-response.dto";

/**
 * Mapper for converting domain entities to response DTOs.
 */
export class UserResponseMapper {
  /**
   * Converts User domain entity to UserResponseDto.
   * @param user User domain entity
   * @returns User response DTO
   */
	static toResponseDto(user: User): UserResponseDto {
		return {
			id: user.id.toString(),
			email: user.email.toString(),
			name: user.name,
			firstName: user.name.split(' ')[0],
			lastName: user.name.split(' ').slice(1).join(' '),
			avatar: user.avatar?.toString(),
			isActive: user.isActive,
			role: user.role.toString(),
			emailVerifiedAt: user.emailVerifiedAt,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt
		};
	}

	/**
   * Converts array of User entities to UserListResponseDto.
   * @param users Array of User domain entities
   * @param total Total count for pagination
   * @param page Current page
   * @param limit Items per page
   * @returns User list response DTO
   */
	static toListResponseDto(users: User[], total: number, page: number, limit: number): UserListResponseDto {
		return {
			users: users.map(user => this.toResponseDto(user)),
			total,
			page,
			limit
		};
	}
}
