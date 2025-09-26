import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    description: 'HTTP status code',
    example: 400
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error message',
    example: 'Validation failed'
  })
  message: string;

  @ApiProperty({
    description: 'Detailed error information',
    example: ['Email must be a valid email address', 'Password is required']
  })
  errors?: string[];

  @ApiProperty({
    description: 'Error timestamp',
    example: '2024-01-15T10:30:00.000Z'
  })
  timestamp: string;

  @ApiProperty({
    description: 'Request path',
    example: '/users'
  })
  path: string;
}
