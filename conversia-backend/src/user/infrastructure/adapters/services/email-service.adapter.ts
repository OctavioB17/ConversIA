import { Injectable } from "@nestjs/common";
import { MailerService } from '@nestjs-modules/mailer';
import EmailServicePort from "src/user/app/ports/email-service.port";
import UserEmail from "src/user/domain/value-objects/user-email.vo";
import { emailConfig } from "../../config/email.config";

@Injectable()
export class EmailServiceAdapter implements EmailServicePort {
	constructor(private readonly mailerService: MailerService) {}

	async sendVerificationEmail(email: UserEmail, verificationToken: string, name: string): Promise<void> {
		await this.mailerService.sendMail({
				to: email.toString(),
				subject: emailConfig.templates.verification.subject,
				template: emailConfig.templates.verification.template,
				context: {
					name,
					verificationToken,
					verificationUrl: `${emailConfig.frontend.baseUrl}${emailConfig.frontend.verificationPath}?token=${verificationToken}`
				}
			})
	}

	async sendPasswordResetEmail(email: UserEmail, resetToken: string, name: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email.toString(),
      subject: emailConfig.templates.passwordReset.subject,
      template: emailConfig.templates.passwordReset.template,
      context: {
        name,
        resetToken,
        resetUrl: `${emailConfig.frontend.baseUrl}${emailConfig.frontend.passwordResetPath}?token=${resetToken}`,
      },
    });
  }
}
