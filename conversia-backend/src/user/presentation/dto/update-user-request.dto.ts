import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength, MaxLength, Matches } from 'class-validator';

export class UpdateUserRequestDto {
  @ApiProperty({
    description: 'User first name',
    example: 'Octavio',
    minLength: 2,
    maxLength: 50,
    required: false
  })
  @IsOptional()
  @IsString({ message: 'First name must be a string' })
  @MinLength(2, { message: 'First name must be at least 2 characters long' })
  @MaxLength(50, { message: 'First name must not exceed 50 characters' })
  firstName?: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Bruza',
    minLength: 2,
    maxLength: 50,
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Last name must be a string' })
  @MinLength(2, { message: 'Last name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
  lastName?: string;

  @ApiProperty({
    description: 'User avatar URL',
    example: 'https://example.com/avatar.jpg',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Avatar must be a string' })
  @Matches(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i, {
    message: 'Avatar must be a valid image URL'
  })
  avatar?: string;
}
