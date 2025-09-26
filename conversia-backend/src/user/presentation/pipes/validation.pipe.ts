import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

/**
 * Custom validation pipe that combines class-validator and class-transformer.
 * Provides detailed error messages and proper data transformation.
 */
@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const object = plainToClass(metatype, value);
    const errors = await validate(object as object);

    if (errors.length > 0) {
      const errorMessages = this.extractErrorMessages(errors);
      throw new BadRequestException({
        message: 'Validation failed',
        errors: errorMessages,
      });
    }

    return object;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return !types.includes(metatype);
  }

  private extractErrorMessages(errors: any[]): string[] {
    const messages: string[] = [];

    for (const error of errors) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error?.constraints) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
        const constraintValues = Object.values(error.constraints);
        for (const value of constraintValues) {
          if (typeof value === 'string') {
            messages.push(value);
          }
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error?.children && Array.isArray(error.children) && error.children.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
        messages.push(...this.extractErrorMessages(error.children));
      }
    }

    return messages;
  }
}
