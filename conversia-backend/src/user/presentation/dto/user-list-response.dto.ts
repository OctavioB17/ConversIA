import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from './user-response.dto';

export class UserListResponseDto {
  @ApiProperty({
    description: 'Array of users',
    type: [UserResponseDto]
  })
  users: UserResponseDto[];

  @ApiProperty({
    description: 'Total number of users',
    example: 25
  })
  total: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1
  })
  page: number;

  @ApiProperty({
    description: 'Number of users per page',
    example: 20
  })
  limit: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 2
  })
  totalPages: number;
}
