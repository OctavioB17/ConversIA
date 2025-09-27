import { Inject, Injectable } from "@nestjs/common";
import { OAUTH2_SERVICE } from "../ports/tokens";
import OAuth2ServicePort from "../ports/oauth2-service.port";
import OAuth2LoginDto from "../dto/oauth2-login.dto";
import AuthCommandMapper from "../mappers/auth-command.mapper";
import OAuthProvider from "src/auth/domain/value-objects/oauth-provider.vo";
/**
 * Use case for OAuth2 login initiation.
 * Generates authorization URL and state parameter for OAuth2 authentication flow.
 */
@Injectable()
export class OAuth2LoginUseCase {
    constructor(
        @Inject(OAUTH2_SERVICE)
        private readonly oauth2Service: OAuth2ServicePort
    ) {}

    /**
	 * Initiates OAuth2 login flow by generating authorization URL.
	 * @param dto OAuth2 login request containing provider and optional device info
	 * @returns Authorization URL and state parameter for OAuth2 flow
	 */
    async execute(dto: OAuth2LoginDto): Promise<{ authorizationUrl: string, state: string  }> {
        const loginProps = AuthCommandMapper.toOAuth2LoginProps(dto);
        const provider = OAuthProvider.create(loginProps.provider);
        const state = this.oauth2Service.generateState();

        const authorizationUrl = this.oauth2Service.generateAuthorizationUrl(provider, state);

        return {
            authorizationUrl,
            state: state.toString()
        }
    }
}