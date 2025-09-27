import { User as PrismaUser } from '@prisma/client';
import User from '../../../domain/entities/user';
import UserId from '../../../domain/value-objects/user-id.vo';
import UserEmail from '../../../domain/value-objects/user-email.vo';
import UserPassword from '../../../domain/value-objects/user-password.vo';
import PersonName from '../../../domain/value-objects/person-name.vo';
import UserAvatarUrl from '../../../domain/value-objects/avatar-url.vo';
import UserRoleVo from '../../../domain/value-objects/user-role.vo';
import CompanyId from '../../../domain/value-objects/company-id.vo';

/**
 * Mapper for converting between User domain entity and Prisma persistence model.
 * Handles the transformation between domain objects and database records.
 */
export default class UserPersistenceMapper {
	/**
	 * Converts User domain entity to Prisma user data for persistence.
	 * @param user User domain entity
	 * @returns Prisma user data
	 */
	static toPersistence(user: User): Omit<PrismaUser, 'id' | 'createdAt' | 'updatedAt'> & { id: string } {
		return {
			id: user.id.toString(),
			email: user.email.toString(),
			password: user.password.getHash(),
			firstName: user.name.split(' ')[0] || '',
			lastName: user.name.split(' ').slice(1).join(' ') || '',
			avatar: user.avatar?.toString() || null,
			companyId: user.companyId?.toString() || null,
			isActive: user.isActive,
			role: user.role.toString(),
			emailVerifiedAt: user.emailVerifiedAt,
		};
	}

	/**
	 * Converts Prisma user data to User domain entity.
	 * @param userData Prisma user data
	 * @returns User domain entity
	 */
	static toDomain(userData: PrismaUser): User {
		return User.hydrate({
			id: UserId.from(userData.id),
			email: UserEmail.create(userData.email),
			password: UserPassword.fromHash(userData.password),
			name: PersonName.create(userData.firstName, userData.lastName),
			avatar: userData.avatar ? UserAvatarUrl.create(userData.avatar) : undefined,
			companyId: userData.companyId ? CompanyId.create(userData.companyId) : undefined,
			isActive: userData.isActive,
			role: UserRoleVo.create(userData.role),
			emailVerifiedAt: userData.emailVerifiedAt,
			createdAt: userData.createdAt,
			updatedAt: userData.updatedAt,
		});
	}
}
