import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import PasswordHasherPort from "../../../app/ports/password-hasher.port";
import { securityConfig } from "../../config/security.config";

@Injectable()
export class PasswordHasherAdapter implements PasswordHasherPort {
	async hash(plainPassword: string): Promise<string> {
		const saltRounds = securityConfig.password.saltRounds;
		return await bcrypt.hash(plainPassword, saltRounds);
	}

	async verify(plainPassword: string, hash: string): Promise<boolean> {
		return await bcrypt.compare(plainPassword, hash);
	}
}
