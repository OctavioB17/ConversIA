import AccessToken from '../../value-objects/access-token.vo';
import RefreshToken from '../../value-objects/refresh-token.vo';
import OAuthProvider from '../../value-objects/oauth-provider.vo';
import UserId from 'src/user/domain/value-objects/user-id.vo';

/**
 * Shape of the AuthSession domain entity internal state.
 * Supports both JWT and OAuth2 authentication methods.
 */
export type AuthSessionProps = {
    id: string;
    userId: UserId;
    accessToken: AccessToken;
    refreshToken: RefreshToken;
    provider: OAuthProvider;
    providerId?: string;
    deviceInfo?: string;
    ipAddress?: string;
    isActive: boolean;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
    lastUsedAt: Date;
}