import { UserProps } from "src/user/domain/entities/types/user.props";
import CreateUserDto from "../dto/create-user.dto";
import UserEmail from "src/user/domain/value-objects/user-email.vo";
import UserPassword from "src/user/domain/value-objects/user-password.vo";
import PersonName from "src/user/domain/value-objects/person-name.vo";
import UserAvatarUrl from "src/user/domain/value-objects/avatar-url.vo";
import UserRoleVo from "src/user/domain/value-objects/user-role.vo";
import UpdateUserDto from "../dto/update-user.dto";

/**
 * Mapper for converting command DTOs to domain objects.
 */
export default class UserCommandMapper {
	/**
   * Converts CreateUserDto to UserProps for domain entity creation.
   * @param dto Create user command
   * @param passwordHash Pre-hashed password
   * @returns UserProps for domain entity
   */
	static toUserProps(dto: CreateUserDto, passwordHash: string): Omit<UserProps, 'id' | 'createdAt' | 'updatedAt' | 'isActive' | 'emailVerifiedAt'> {
		return {
			email: UserEmail.create(dto.email),
			password: UserPassword.fromHash(passwordHash),
			name: PersonName.create(dto.firstName, dto.lastName),
			avatar: dto.avatar ? UserAvatarUrl.create(dto.avatar) : undefined,
			role: UserRoleVo.create(dto.role || 'AGENT')
		}
	}

	/**
   * Converts UpdateUserDto to domain objects for user updates.
   * @param dto Update user command
   * @returns Partial domain objects for updates
   */
	static toUpdateProps(dto: UpdateUserDto) {
    return {
      name: dto.firstName && dto.lastName ? PersonName.create(dto.firstName, dto.lastName) : undefined,
      avatar: dto.avatar ? UserAvatarUrl.create(dto.avatar) : undefined,
    };
  }
}
