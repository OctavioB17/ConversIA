import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsOptional, IsEnum, Matches } from 'class-validator';
import { UserRole } from '../../domain/entities/types/user-roles.types';


export class CreateUserRequestDto {
	@ApiProperty({
		description: 'User email address',
		example: 'octavio@conversia.com',
		format: 'email'
	})
	@IsEmail({}, { message: 'Email must be a valid email address'})
	@IsNotEmpty({message: 'Email required'})
	email: string;

	@ApiProperty({
		description: 'User password',
		example: '123456',
		minLength: 8,
		maxLength: 128
	})
	@IsString({ message: 'Password must be a string' })
	@IsNotEmpty({ message: 'Password is required' })
	@MinLength(8, { message: 'Password must be at least 8 characters long' })
	@MaxLength(128, { message: 'Password must not exceed 128 characters'})
	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  })
	password: string

	@ApiProperty({
    description: 'User first name',
    example: 'Octavio',
    minLength: 2,
    maxLength: 50
  })
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is required' })
  @MinLength(2, { message: 'First name must be at least 2 characters long' })
  @MaxLength(50, { message: 'First name must not exceed 50 characters' })
  firstName: string;

	@ApiProperty({
    description: 'User last name',
    example: 'Bruza',
    minLength: 2,
    maxLength: 50
  })
  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name is required' })
  @MinLength(2, { message: 'Last name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
  lastName: string;

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

	@ApiProperty({
    description: 'Company ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Company ID must be a string' })
  companyId?: string;

	@ApiProperty({
    description: 'User role',
    enum: UserRole,
    example: UserRole.AGENT,
    default: UserRole.AGENT
  })
  @IsEnum(UserRole, { message: 'Role must be a valid user role' })
  @IsNotEmpty({ message: 'Role is required' })
  role: UserRole;
}
