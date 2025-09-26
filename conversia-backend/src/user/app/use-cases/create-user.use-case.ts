import { Inject, Injectable } from "@nestjs/common";
import { EMAIL_SERVICE, EVENT_PUBLISHER, PASSWORD_HASHER, USER_REPOSITORY } from "../ports/tokens";
import UserRepositoryPort from "../ports/user-repository.port";
import PasswordHasherPort from "../ports/password-hasher.port";
import EmailServicePort from "../ports/email-service.port";
import EventPublisherPort from "../ports/event-publisher.port";
import UserResponseDto from "../dto/user-response.dto";
import UserEmail from "src/user/domain/value-objects/user-email.vo";
import CreateUserDto from "../dto/create-user.dto";
import User from "src/user/domain/entities/user";
import UserCommandMapper from "../mappers/user-command.mapper";
import { UserResponseMapper } from "../mappers/user-response.mapper";

/**
 * Use case for creating a new user.
 * Orchestrates user creation with validation, hashing, persistence and notifications.
 */
@Injectable()
export default class CreateUserUseCase {
	constructor(
		@Inject(USER_REPOSITORY)
		private readonly userRepository: UserRepositoryPort,
		@Inject(PASSWORD_HASHER)
		private readonly passwordHasher: PasswordHasherPort,
		@Inject(EMAIL_SERVICE)
		private readonly emailService: EmailServicePort,
		@Inject(EVENT_PUBLISHER)
		private readonly eventPublisher: EventPublisherPort,
	) {}

	  /**
   * Creates a new user with the provided information.
   * @param dto User creation data
   * @returns Created user response
   * @throws Error if user already exists or creation fails
   */
	async execute(dto: CreateUserDto): Promise<UserResponseDto> {
		const email = UserEmail.create(dto.email);
		const existingUser = await this.userRepository.findByEmail(email);
		if (existingUser) {
			throw new Error('User already exist');
		}

		const passwordHash = await this.passwordHasher.hash(dto.password);

		const userProps = UserCommandMapper.toUserProps(dto, passwordHash);
		const user = User.create(userProps);

		await this.userRepository.save(user)

		const verificationToken = user.generateVerificationToken();
		await this.emailService.sendVerificationEmail(user.email, verificationToken, user.name)

		const events = user.pullDomainEvents();
		await this.eventPublisher.publishMany(events);

		return UserResponseMapper.toResponseDto(user);
	}
}
