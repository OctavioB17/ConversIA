import { CreateUserRequestDto } from '../dto/create-user-request.dto';
import { UpdateUserRequestDto } from '../dto/update-user-request.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { UserListResponseDto } from '../dto/user-list-response.dto';
import CreateUserDto from '../../app/dto/create-user.dto';
import UpdateUserDto from '../../app/dto/update-user.dto';
import AppUserResponseDto from '../../app/dto/user-response.dto';
import AppUserListResponseDto from '../../app/dto/user-list-response.dto';

/**
 * Mapper for converting between HTTP DTOs and Application DTOs.
 * Handles the transformation between presentation layer and application layer.
 */
export class UserPresentationMapper {
  /**
   * Converts CreateUserRequestDto (HTTP) to CreateUserDto (Application).
   * @param httpDto HTTP request DTO
   * @returns Application DTO
   */
  static toCreateUserDto(httpDto: CreateUserRequestDto): CreateUserDto {
    return {
      email: httpDto.email,
      password: httpDto.password,
      firstName: httpDto.firstName,
      lastName: httpDto.lastName,
      avatar: httpDto.avatar,
      role: httpDto.role,
      companyId: 'default-company', // TODO: Get from context
    };
  }

  /**
   * Converts UpdateUserRequestDto (HTTP) to UpdateUserDto (Application).
   * @param httpDto HTTP request DTO
   * @returns Application DTO
   */
  static toUpdateUserDto(httpDto: UpdateUserRequestDto, userId: string): UpdateUserDto {
    return {
      userId: userId,
      firstName: httpDto.firstName,
      lastName: httpDto.lastName,
      avatar: httpDto.avatar,
    };
  }

  /**
   * Converts AppUserResponseDto (Application) to UserResponseDto (HTTP).
   * @param appDto Application response DTO
   * @returns HTTP response DTO
   */
  static toUserResponseDto(appDto: AppUserResponseDto): UserResponseDto {
    return {
      id: appDto.id,
      email: appDto.email,
      name: appDto.name,
      avatar: appDto.avatar || null,
      isActive: appDto.isActive,
      role: appDto.role,
      emailVerifiedAt: appDto.emailVerifiedAt || null,
      createdAt: appDto.createdAt,
      updatedAt: appDto.updatedAt,
    };
  }

  /**
   * Converts AppUserListResponseDto (Application) to UserListResponseDto (HTTP).
   * @param appDto Application list response DTO
   * @returns HTTP list response DTO
   */
  static toUserListResponseDto(appDto: AppUserListResponseDto): UserListResponseDto {
    return {
      users: appDto.users.map(user => this.toUserResponseDto(user)),
      total: appDto.total,
      page: appDto.page,
      limit: appDto.limit,
      totalPages: Math.ceil(appDto.total / appDto.limit),
    };
  }

  /**
   * Converts array of AppUserResponseDto to array of UserResponseDto.
   * @param appUsers Array of application user DTOs
   * @returns Array of HTTP user DTOs
   */
  static toUserResponseDtoArray(appUsers: AppUserResponseDto[]): UserResponseDto[] {
    return appUsers.map(user => this.toUserResponseDto(user));
  }
}
