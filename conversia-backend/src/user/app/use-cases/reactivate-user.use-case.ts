import { Inject, Injectable } from "@nestjs/common";
import { EVENT_PUBLISHER, USER_REPOSITORY } from "../ports/tokens";
import UserRepositoryPort from "../ports/user-repository.port";
import EventPublisherPort from "../ports/event-publisher.port";
import UserResponseDto from "../dto/user-response.dto";
import UserId from "src/user/domain/value-objects/user-id.vo";
import { UserResponseMapper } from "../mappers/user-response.mapper";

/**
 * Use case for reactivating a user.
 */
@Injectable()
export default class ReactivateUserUseCase {
	constructor(
		@Inject(USER_REPOSITORY)
		private readonly userRepository: UserRepositoryPort,
		@Inject(EVENT_PUBLISHER)
		private readonly eventPublisher: EventPublisherPort,
	) {}

	/**
   * Reactivates a user.
   * @param userId User identifier
   * @returns Updated user response
   * @throws Error if user not found
   */
	async execute(userId: string): Promise<UserResponseDto> {
		const id = UserId.from(userId);
		const user = await this.userRepository.findById(id);
		if (!user) {
			throw new Error('User not found')
		}

		user.reactivate();

		await this.userRepository.save(user);

		const events = user.pullDomainEvents();
		await this.eventPublisher.publishMany(events);

		return UserResponseMapper.toResponseDto(user);
	}
}
