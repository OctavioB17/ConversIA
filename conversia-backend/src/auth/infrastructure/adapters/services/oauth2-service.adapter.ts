import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { oauth2Config } from '../../config/oauth2.config';
import OAuth2ServicePort from '../../../app/ports/oauth2-service.port';
import OAuthProvider from '../../../domain/value-objects/oauth-provider.vo';
import OAuthCode from '../../../domain/value-objects/oauth-code.vo';
import OAuthState from '../../../domain/value-objects/oauth-state.vo';
import { AuthProvider } from '../../../domain/entities/types/auth-provider.types';

/**
 * OAuth2 service adapter implementation.
 * Handles OAuth2 authentication flow with external providers using HTTP requests.
 */
@Injectable()
export class OAuth2ServiceAdapter implements OAuth2ServicePort {
	/**
	 * Generates OAuth2 authorization URL.
	 * @param provider OAuth2 provider (google, facebook, github)
	 * @param state CSRF protection state parameter
	 * @returns Authorization URL for OAuth2 flow
	 */
	generateAuthorizationUrl(provider: OAuthProvider, state: OAuthState): string {
		const providerConfig = this.getProviderConfig(provider);
		const params = new URLSearchParams({
			client_id: providerConfig.clientId,
			redirect_uri: providerConfig.redirectUri,
			scope: providerConfig.scopes.join(' '),
			response_type: 'code',
			state: state.toString(),
		});

		// Add provider-specific parameters
		if (provider.toString() === 'google') {
			params.append('access_type', 'offline');
			params.append('prompt', 'consent');
		}

		return `${providerConfig.authorizationUrl}?${params.toString()}`;
	}

	/**
	 * Exchanges authorization code for access token.
	 * @param provider OAuth2 provider
	 * @param code Authorization code from OAuth2 callback
	 * @param state CSRF protection state parameter
	 * @returns Access token and user information
	 * @throws HttpException if exchange fails
	 */
	async exchangeCodeForToken(
		provider: OAuthProvider,
		code: OAuthCode,
		state: OAuthState
	): Promise<{
		acessToken: string;
		refreshToken?: string;
		userInfo: {
			id: string;
			email: string;
			name: string;
			avatar?: string;
		};
	}> {
		try {
			const providerConfig = this.getProviderConfig(provider);
			
			// Exchange code for token
			const tokenResponse = await this.exchangeCodeForAccessToken(providerConfig, code.toString());
			
			// Get user information
			const userInfo = await this.getUserInfo(providerConfig, tokenResponse.access_token);

			return {
				acessToken: tokenResponse.access_token,
				refreshToken: tokenResponse.refresh_token,
				userInfo: this.normalizeUserInfo(userInfo, provider.toString()),
			};
		} catch (error) {
			throw new HttpException(
				`OAuth2 authentication failed: ${error.message}`,
				HttpStatus.BAD_REQUEST
			);
		}
	}

	/**
	 * Validates OAuth2 state parameter.
	 * @param state State parameter to validate
	 * @returns True if state is valid
	 */
	validateState(state: string): boolean {
		// TODO: Implement proper state validation with expiration
		// For now, just check if state exists and has minimum length
		return state && state.length >= oauth2Config.state.length;
	}

	/**
	 * Generates a new OAuth2 state parameter.
	 * @returns New state parameter
	 */
	generateState(): OAuthState {
		const crypto = require('crypto');
		const state = crypto.randomBytes(oauth2Config.state.length).toString('hex');
		return OAuthState.create(state);
	}

	/**
	 * Gets provider configuration based on provider type.
	 * @param provider OAuth2 provider
	 * @returns Provider configuration object
	 * @throws HttpException if provider is not supported
	 */
	private getProviderConfig(provider: OAuthProvider): any {
		const providerType = provider.toString().toLowerCase();
		
		switch (providerType) {
			case 'google':
				return oauth2Config.google;
			case 'facebook':
				return oauth2Config.facebook;
			case 'github':
				return oauth2Config.github;
			default:
				throw new HttpException(
					`Unsupported OAuth2 provider: ${providerType}`,
					HttpStatus.BAD_REQUEST
				);
		}
	}

	/**
	 * Exchanges authorization code for access token.
	 * @param providerConfig Provider configuration
	 * @param code Authorization code
	 * @returns Token response
	 */
	private async exchangeCodeForAccessToken(providerConfig: any, code: string): Promise<any> {
		const response = await axios.post(providerConfig.tokenUrl, {
			client_id: providerConfig.clientId,
			client_secret: providerConfig.clientSecret,
			code,
			grant_type: 'authorization_code',
			redirect_uri: providerConfig.redirectUri,
		}, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		});

		return response.data;
	}

	/**
	 * Gets user information from OAuth2 provider.
	 * @param providerConfig Provider configuration
	 * @param accessToken Access token
	 * @returns User information
	 */
	private async getUserInfo(providerConfig: any, accessToken: string): Promise<any> {
		const response = await axios.get(providerConfig.userInfoUrl, {
			headers: {
				'Authorization': `Bearer ${accessToken}`,
				'Accept': 'application/json',
			},
		});

		return response.data;
	}

	/**
	 * Normalizes user information from different OAuth2 providers.
	 * @param userInfo Raw user information from provider
	 * @param provider Provider name
	 * @returns Normalized user information
	 */
	private normalizeUserInfo(userInfo: any, provider: string): {
		id: string;
		email: string;
		name: string;
		avatar?: string;
	} {
		switch (provider.toLowerCase()) {
			case 'google':
				return {
					id: userInfo.id,
					email: userInfo.email,
					name: userInfo.name,
					avatar: userInfo.picture,
				};
			case 'facebook':
				return {
					id: userInfo.id,
					email: userInfo.email,
					name: userInfo.name,
					avatar: userInfo.picture?.data?.url,
				};
			case 'github':
				return {
					id: userInfo.id.toString(),
					email: userInfo.email,
					name: userInfo.name || userInfo.login,
					avatar: userInfo.avatar_url,
				};
			default:
				return {
					id: userInfo.id,
					email: userInfo.email,
					name: userInfo.name,
					avatar: userInfo.avatar || userInfo.picture,
				};
		}
	}
}
