import { Inject, Injectable } from "@nestjs/common";
import { EVENT_PUBLISHER, USER_REPOSITORY } from "../ports/tokens";
import UserRepositoryPort from "../ports/user-repository.port";
import EventPublisherPort from "../ports/event-publisher.port";
import UserResponseDto from "../dto/user-response.dto";
import UserId from "src/user/domain/value-objects/user-id.vo";
import UserDomainService from "src/user/domain/services/user-domain.service";
import { UserResponseMapper } from "../mappers/user-response.mapper";

	/**
	 * Use case for deactivating a user
	 */
@Injectable()
export default class DeactivateUserUseCase {
	constructor(
		@Inject(USER_REPOSITORY)
		private readonly userRepository: UserRepositoryPort,
		@Inject(EVENT_PUBLISHER)
		private readonly eventPublisher: EventPublisherPort,
	) {}

  /**
   * Deactivates a user.
   * @param userId User identifier
   * @param requesterId User requesting the deactivation
   * @returns Updated user response
   * @throws Error if user not found or permission denied
   */
	async execute(userId: string, requesterId: string): Promise<UserResponseDto> {
		const targetId = UserId.from(userId);
		const requesterIdObj = UserId.from(requesterId);

		const target = await this.userRepository.findById(targetId);
		const requester = await this.userRepository.findById(requesterIdObj);

		if (!target || !requester) {
			throw new Error('User not found');
		}

		if (!UserDomainService.canDeactivate(requester, target)) {
			throw new Error('Permission denied');
		}

		target.deactivate();

		await this.userRepository.save(target);

		const events = target.pullDomainEvents();
		await this.eventPublisher.publishMany(events);

		return UserResponseMapper.toResponseDto(target);
	}
}
