import { AuthProvider } from '../entities/types/auth-provider.types';

/**
 * Value Object representing an OAuth2 provider.
 * Invariant: must be a supported provider.
 */
export default class OAuthProvider {
	private constructor(private readonly value: AuthProvider) {}

	static create(provider: string): OAuthProvider {
		const upper = provider?.toUpperCase?.();
		if (!upper || !(upper in AuthProvider)) {
			throw new Error('Invalid OAuth provider');
		}
		return new OAuthProvider(upper as AuthProvider);
	}

	static from(provider: AuthProvider): OAuthProvider {
		return new OAuthProvider(provider);
	}

	toString(): string {
		return this.value;
	}

	get enum(): AuthProvider {
		return this.value;
	}

	equals(other: OAuthProvider): boolean {
		return this.value === other.value;
	}

	isLocal(): boolean {
		return this.value === AuthProvider.LOCAL;
	}

	isOAuth2(): boolean {
		return this.value !== AuthProvider.LOCAL;
	}
}