/**
 * Command DTO for email confirmation.
 */
export default class ConfirmEmailDto {
  userId: string;
  verificationToken: string;
}
