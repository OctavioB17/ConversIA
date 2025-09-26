import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class ConfirmEmailRequestDto {
  @ApiProperty({
    description: 'Email verification token',
    example: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6',
    minLength: 64,
    maxLength: 64
  })
  @IsString({ message: 'Token must be a string' })
  @IsNotEmpty({ message: 'Token is required' })
  @Length(64, 64, { message: 'Token must be exactly 64 characters long' })
  token: string;
}
