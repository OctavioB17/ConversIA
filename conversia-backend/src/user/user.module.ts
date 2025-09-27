import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailerModule } from '@nestjs-modules/mailer';
import { PrismaService } from 'src/shared/database/prisma.service';

// Application Layer
import { userInfrastructureProviders } from './infrastructure/providers/user.providers';

// Use Cases
import CreateUserUseCase from './app/use-cases/create-user.use-case';
import ConfirmEmailUseCase from './app/use-cases/confirm-email.use-case';
import GetUserByIdUseCase from './app/use-cases/get-user-by-id.use-case';
import ListUsersUseCase from './app/use-cases/list-users.use-case';
import UpdateUserUseCase from './app/use-cases/update-user.use-case';
import DeactivateUserUseCase from './app/use-cases/deactivate-user.use-case';
import ReactivateUserUseCase from './app/use-cases/reactivate-user.use-case';

// Presentation Layer
import { UserController } from './presentation/controller/user.controller';

/**
 * User module configuration.
 * Provides user management functionality with Clean Architecture.
 */
@Module({
	imports: [
		EventEmitterModule.forRoot(),
		MailerModule.forRoot({
			transport: {
				host: process.env.SMTP_HOST || 'localhost',
				port: parseInt(process.env.SMTP_PORT || '587'),
				secure: process.env.SMTP_SECURE === 'true',
				auth: {
					user: process.env.SMTP_USER,
					pass: process.env.SMTP_PASS,
				},
			},
			defaults: {
				from: process.env.SMTP_FROM || 'noreply@conversia.com',
			},
		}),
	],
	controllers: [UserController],
	providers: [
		// Infrastructure providers
		...userInfrastructureProviders,
		PrismaService,
		
		// Use Cases
		CreateUserUseCase,
		ConfirmEmailUseCase,
		GetUserByIdUseCase,
		ListUsersUseCase,
		UpdateUserUseCase,
		DeactivateUserUseCase,
		ReactivateUserUseCase,
	],
	exports: [
		// Export use cases for other modules
		GetUserByIdUseCase,
		ListUsersUseCase,
		
		// Export infrastructure services for other modules
		...userInfrastructureProviders,
	],
})
export class UserModule {}
