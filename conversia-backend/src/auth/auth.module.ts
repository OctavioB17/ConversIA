import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserModule } from '../user/user.module';

// Infrastructure Layer
import { authInfrastructureProviders } from './infrastructure/providers/auth.providers';

// Use Cases
import { LoginUseCase } from './app/use-cases/login.use-case';
import { OAuth2LoginUseCase } from './app/use-cases/oauth2-login.use-case';
import { OAuth2CallbackUseCase } from './app/use-cases/oauth2-callback.usse-case';
import { RefreshTokenUseCase } from './app/use-cases/refresh-token.use-case';
import { LogoutUseCase } from './app/use-cases/logout.use-case';

// Presentation Layer
import { AuthController } from './presentation/controller/auth.controller';

/**
 * Auth module configuration.
 * Provides authentication and authorization functionality with Clean Architecture.
 */
@Module({
	imports: [
		EventEmitterModule.forRoot(),
		UserModule, // Import User module to access user services
	],
	controllers: [AuthController],
	providers: [
		// Infrastructure providers
		...authInfrastructureProviders,
		
		// Use Cases
		LoginUseCase,
		OAuth2LoginUseCase,
		OAuth2CallbackUseCase,
		RefreshTokenUseCase,
		LogoutUseCase,
	],
	exports: [
		// Export use cases for other modules
		LoginUseCase,
		RefreshTokenUseCase,
		LogoutUseCase,
		
		// Export infrastructure services for other modules
		...authInfrastructureProviders,
	],
})
export class AuthModule {}
