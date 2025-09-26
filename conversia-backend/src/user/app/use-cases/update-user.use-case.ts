import { Injectable, Inject } from '@nestjs/common';
import UpdateUserDto from '../dto/update-user.dto';
import UserResponseDto from '../dto/user-response.dto';
import UserCommandMapper from '../mappers/user-command.mapper';
import { USER_REPOSITORY } from '../ports/tokens';
import UserRepositoryPort from '../ports/user-repository.port';
import UserId from '../../domain/value-objects/user-id.vo';
import { UserResponseMapper } from '../mappers/user-response.mapper';

/**
 * Use case for updating user information.
 */
@Injectable()
export default class UpdateUserUseCase {
	constructor(
		@Inject(USER_REPOSITORY)
		private readonly userRepository: UserRepositoryPort,
	) {}

	/**
   * Updates user information.
   * @param dto Update user data
   * @returns Updated user response
   * @throws Error if user not found
   */
	async execute(dto: UpdateUserDto): Promise<UserResponseDto> {
		const userId = UserId.from(dto.userId);
		const user = await this.userRepository.findById(userId);
		if (!user) {
			throw new Error('User not found')
		}

		const updateProps = UserCommandMapper.toUpdateProps(dto);

		if (updateProps.name) {
			user.rename(updateProps.name);
		}

		if (updateProps.avatar !== undefined) {
      user.changeAvatar(updateProps.avatar);
    }

		await this.userRepository.save(user);

		return UserResponseMapper.toResponseDto(user);
	}
}
