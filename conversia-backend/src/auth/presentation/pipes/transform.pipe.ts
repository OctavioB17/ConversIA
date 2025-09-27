import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

/**
 * Custom transformation pipe for data conversion.
 * Handles type conversion and data sanitization for Auth endpoints.
 */
@Injectable()
export class AuthTransformPipe implements PipeTransform<any> {
	transform(value: any, { metatype }: ArgumentMetadata) {
		if (!metatype || !this.toTransform(metatype)) {
			return value;
		}

		try {
			return plainToClass(metatype, value, {
				excludeExtraneousValues: true,
				enableImplicitConversion: true
			});
		} catch {
			throw new BadRequestException('Data transformation failed')            
		}
	}

	private toTransform(metatype: any): boolean {
		const types = [String, Boolean, Number, Array, Object];

		return !types.includes(metatype)
	}
}
