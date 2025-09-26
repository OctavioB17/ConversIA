import UserEmail from '../../domain/value-objects/user-email.vo';

/**
 * Port for email operations.
 * Defines the contract for email sending without implementation details.
 */
export default interface EmailServicePort {
	/**
   * Sends an email verification link.
   * @param email User's email address.
   * @param verificationToken Verification token.
   * @param name User's display name.
   * @throws Error if sending fails.
   */
	sendVerificationEmail(email: UserEmail, verificationToken: string, name: string): Promise<void>;

	/**
   * Sends a password reset email.
   * @param email User's email address.
   * @param resetToken Reset token.
   * @param name User's display name.
   * @throws Error if sending fails.
   */
	sendPasswordResetEmail(email: UserEmail, resetToken: string, name: string): Promise<void>;
}
