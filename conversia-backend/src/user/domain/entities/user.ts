import UserId from "../value-objects/user-id.vo";
import { UserProps } from "./types/user.props";
import UserAvatarUrl from "../value-objects/avatar-url.vo";
import PersonName from "../value-objects/person-name.vo";
import CompanyId from "../value-objects/company-id.vo";
import UserEmailConfirmedEvent from "../events/user-email-confirmed.event";
import UserDeactivatedEvent from "../events/user-deactivated.event";
import UserReactivatedEvent from "../events/user-reactivated.event";
import UserAlreadyVerifiedError from "../errors/user-already-verified.error";
import UserNotActiveError from "../errors/user-not-active.error";
import UserAlreadyActiveError from "../errors/user-already-active.error";
import crypto from 'crypto'
/**
 * User domain entity.
 * Invariants: Valid email, hashed password, UUID id.
 */
export default class User {
    private readonly events: Array<unknown> = [];
    private constructor(private readonly props: UserProps) {}

	  /**
     * Creates a new user applying domain invariants.
     * @param props Normalized email, password hash, name.
     * @returns User entity ready to persist.
     * @throws Throws error if any invariant is not fulfilled.
     */
    static create(props: Omit<UserProps, 'id' | 'createdAt' | 'updatedAt' | 'isActive' | 'emailVerifiedAt'>) {
        return new User({ id: UserId.new(), isActive: false, emailVerifiedAt: null, ...props, createdAt: new Date(), updatedAt: new Date() });
    }

	/**
	 * Reconstructs a User entity from persisted data.
	 * Used when loading from database or external sources.
	 * @param props Complete user properties from persistence.
	 * @returns User entity with existing data.
	 */
	static hydrate(props: UserProps): User {
		return new User(props);
	}

    get id() { return this.props.id; }
    get email() { return this.props.email; }
    get password() { return this.props.password; }
    get name() { return this.props.name.full }
    get isActive() { return this.props.isActive }
    get avatar() { return this.props.avatar }
    get companyId() { return this.props.companyId || null }
    get createdAt() { return this.props.createdAt }
    get updatedAt() { return this.props.updatedAt }
    get emailVerifiedAt() { return this.props.emailVerifiedAt ?? null }
	get role() { return this.props.role }

    /**
     * Confirms the user's email and activates the account.
     * @throws UserAlreadyVerifiedError if email is already verified.
     */
    confirmEmail(): void {
        if (this.props.emailVerifiedAt) {
            throw new UserAlreadyVerifiedError();
        }
        this.props.emailVerifiedAt = new Date();
        this.props.isActive = true;
        this.props.updatedAt = new Date();
        this.events.push(new UserEmailConfirmedEvent(this.props.id));
    }

    /**
     * Changes the user's display name.
     * @param name New person name (first + last).
     */
    rename(name: PersonName): void {
        this.props.name = name;
        this.props.updatedAt = new Date();
    }

    /**
     * Updates the user's avatar URL.
     * @param avatar New avatar URL or undefined to remove.
     */
    changeAvatar(avatar: UserAvatarUrl | undefined): void {
        this.props.avatar = avatar;
        this.props.updatedAt = new Date();
    }

    /**
     * Deactivates the user (prevents login and actions).
     * @throws UserNotActiveError if user is already inactive.
     */
    deactivate(): void {
        if (!this.props.isActive) {
            throw new UserNotActiveError();
        }
        this.props.isActive = false;
        this.props.updatedAt = new Date();
        this.events.push(new UserDeactivatedEvent(this.props.id));
    }

    /**
     * Reactivates the user (allows login and actions).
     * @throws UserAlreadyActiveError if user is already active.
     */
    reactivate(): void {
        if (this.props.isActive) {
            throw new UserAlreadyActiveError();
        }
        this.props.isActive = true;
        this.props.updatedAt = new Date();
        this.events.push(new UserReactivatedEvent(this.props.id));
    }

    /**
     * Verifies if the provided password matches the user's password hash.
     * This method encapsulates password verification logic within the domain.
     * @param passwordHasher Password hasher service to verify the password
     * @param plainPassword Plain text password to verify
     * @returns Promise<boolean> True if password is valid
     */
    async verifyPassword(passwordHasher: { verify(plain: string, hash: string): Promise<boolean> }, plainPassword: string): Promise<boolean> {
        return await passwordHasher.verify(plainPassword, this.props.password.getHash());
    }

    /**
     * Assigns the user to a company.
     * @param companyId Company identifier to assign.
     */
    assignToCompany(companyId: CompanyId): void {
        this.props.companyId = companyId;
        this.props.updatedAt = new Date();
    }

    /**
     * Removes the user from their current company.
     */
    removeFromCompany(): void {
        this.props.companyId = undefined;
        this.props.updatedAt = new Date();
    }

    /**
     * Returns and clears queued domain events.
     * Called by application layer to publish events after persistence.
     * @returns Array of domain events that occurred during entity operations.
     */
    pullDomainEvents(): Array<unknown> {
        const out = [...this.events];
        this.events.length = 0;
        return out;
    }

		/**
		 * Generates a verification token for email confirmation.
		 * @returns Verification token string
		 */
		generateVerificationToken(): string {
			return crypto.randomBytes(32).toString('hex');
		}
}
