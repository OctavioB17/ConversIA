import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/database/prisma.service";
import UserPersistenceMapper from "../mappers/user-persistence.mapper";
import UserRepositoryPort from "src/user/app/ports/user-repository.port";
import User from "src/user/domain/entities/user";
import UserEmail from "src/user/domain/value-objects/user-email.vo";
import UserId from "src/user/domain/value-objects/user-id.vo";
import CompanyId from "src/user/domain/value-objects/company-id.vo";

@Injectable()
export class UserRepositoryAdapter implements UserRepositoryPort {
	constructor(private readonly prisma: PrismaService) {}

	async save(user: User): Promise<void> {
		const userData = UserPersistenceMapper.toPersistence(user);

		await this.prisma.user.upsert({
			where: { id: user.id.toString() },
			create: userData,
			update: {
				...userData,
				updatedAt: new Date()
			}
		})
	}

	async findById(id: UserId): Promise<User | null> {
			const userData = await this.prisma.user.findUnique({
				where: { id: id.toString() },
			});

			if (!userData) return null;

			return UserPersistenceMapper.toDomain(userData)
	}

	async findByEmail(email: UserEmail): Promise<User | null> {
			const userData = await this.prisma.user.findUnique({
				where: { email: email.toString() },
			});

			if (!userData) return null

			return UserPersistenceMapper.toDomain(userData)
	}

	async findByCompany(companyId: CompanyId): Promise<User[]> {
		const usersData = await this.prisma.user.findMany({
			where: { companyId: companyId.toString() }
		})

		return usersData.map(usersData => UserPersistenceMapper.toDomain(usersData))
	}

	async delete(id: UserId): Promise<void> {
		await this.prisma.user.delete({
			where: { id: id.toString() }
		})
	}

	async exists(email: UserEmail): Promise<boolean> {
			const user = await this.prisma.user.findUnique({
				where: { email: email.toString() },
				select: { id: true }
			})

			return user !== null
	}
}
