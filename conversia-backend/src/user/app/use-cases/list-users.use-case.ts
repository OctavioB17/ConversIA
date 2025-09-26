import { Injectable, Inject } from '@nestjs/common';
import { UserResponseMapper } from '../mappers/user-response.mapper';
import { USER_REPOSITORY } from '../ports/tokens';
import UserRepositoryPort from '../ports/user-repository.port';
import UserListResponseDto from '../dto/user-list-response.dto';

/**
 * Use case for listing users with pagination.
 */
@Injectable()
export default class ListUsersUseCase {
	constructor(
		@Inject(USER_REPOSITORY)
		private readonly userRepository: UserRepositoryPort,
	) {}

	/**
   * Lists users with pagination.
   * @param companyId Company identifier
   * @param page Page number (1-based)
   * @param limit Items per page
   * @returns Paginated user list
   */
	async execute(companyId: string, page: number = 1, limit: number = 10): Promise<UserListResponseDto> {
		const users = await this.userRepository.findByCompany(companyId);

		const startIndex = (page - 1) * limit;
		const endIndex = startIndex + limit;
		const paginatedUsers = users.slice(startIndex, endIndex);

		return UserResponseMapper.toListResponseDto(
			paginatedUsers,
			users.length,
			page,
			limit
		);
	}
}
