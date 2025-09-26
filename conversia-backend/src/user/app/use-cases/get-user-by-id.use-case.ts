import { Injectable, Inject } from '@nestjs/common';
import UserResponseDto from '../dto/user-response.dto';
import { UserResponseMapper } from '../mappers/user-response.mapper';
import { USER_REPOSITORY } from '../ports/tokens';
import UserRepositoryPort from '../ports/user-repository.port';
import UserId from '../../domain/value-objects/user-id.vo';

/**
 * Use case for retrieving a user by ID.
 */
@Injectable()
export default class GetUserByIdUseCase {
	constructor(
		@Inject(USER_REPOSITORY)
		private readonly userRepository: UserRepositoryPort,
	) {}


  /**
   * Retrieves a user by their ID.
   * @param userId User identifier
   * @returns User response or null if not found
   */
	async execute(userId: string): Promise<UserResponseDto | null> {
		const id = UserId.from(userId);
		const user = await this.userRepository.findById(id);

		if (!user) {
			return null
		}

		return UserResponseMapper.toResponseDto(user);
	}
}
