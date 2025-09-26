/**
 * Port for password hashing operations.
 * Defines the contract for password security without implementation details.
 */
export default interface PasswordHasherPort {
	/**
   * Hashes a plain text password.
   * @param plainPassword Raw password text.
   * @returns Hashed password string.
   * @throws Error if hashing fails.
   */
	hash(plainPassword: string): Promise<string>;

	/**
   * Verifies a plain password against a hash.
   * @param plainPassword Raw password text.
   * @param hash Stored password hash.
   * @returns True if password matches, false otherwise.
   */
	verify(plainPassword: string, hash: string): Promise<boolean>
}
