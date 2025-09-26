import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../domain/entities/types/user-roles.types';

export class UserResponseDto {
  @ApiProperty({
    description: 'User unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @ApiProperty({
    description: 'User email address',
    example: 'octavio@conversia.com'
  })
  email: string;

  @ApiProperty({
    description: 'User full name',
    example: 'Octavio Bruza'
  })
  name: string;

  @ApiProperty({
    description: 'User avatar URL',
    example: 'https://example.com/avatar.jpg',
    nullable: true
  })
  avatar: string | null;

  @ApiProperty({
    description: 'User active status',
    example: true
  })
  isActive: boolean;

  @ApiProperty({
    description: 'User role',
    enum: UserRole,
    example: UserRole.AGENT
  })
  role: UserRole;

  @ApiProperty({
    description: 'Email verification date',
    example: '2024-01-15T10:30:00.000Z',
    nullable: true
  })
  emailVerifiedAt: Date | null;

  @ApiProperty({
    description: 'User creation date',
    example: '2024-01-15T10:30:00.000Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'User last update date',
    example: '2024-01-15T10:30:00.000Z'
  })
  updatedAt: Date;
}
