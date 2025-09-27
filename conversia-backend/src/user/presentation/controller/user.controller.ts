import { Body, Controller, Get, Param, Post, Put, Delete, Query, UseGuards, UsePipes, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { CustomValidationPipe } from "../pipes/validation.pipe";
import { CustomTransformPipe } from "../pipes/transform.pipe";
import { Roles } from "../decorators/roles.decorator";
import { CurrentUser } from "../decorators/current-user.decorator";
import { UserRole } from "src/user/domain/entities/types/user-roles.types";
import { AuthenticatedRequest } from "../types/authenticated-request.types";
import CreateUserUseCase from "src/user/app/use-cases/create-user.use-case";
import ConfirmEmailUseCase from "src/user/app/use-cases/confirm-email.use-case";
import DeactivateUserUseCase from "src/user/app/use-cases/deactivate-user.use-case";
import GetUserByIdUseCase from "src/user/app/use-cases/get-user-by-id.use-case";
import ListUsersUseCase from "src/user/app/use-cases/list-users.use-case";
import ReactivateUserUseCase from "src/user/app/use-cases/reactivate-user.use-case";
import UpdateUserUseCase from "src/user/app/use-cases/update-user.use-case";
import { UserResponseDto } from "../dto/user-response.dto";
import { CreateUserRequestDto } from "../dto/create-user-request.dto";
import { UpdateUserRequestDto } from "../dto/update-user-request.dto";
import { ConfirmEmailRequestDto } from "../dto/confirm-email-request.dto";
import { UserPresentationMapper } from "../mappers/user-presentation.mapper";
import { UserListResponseDto } from "../dto/user-list-response.dto";
import { ErrorResponseDto } from "../dto/error-response.dto";

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
@UsePipes(CustomValidationPipe, CustomTransformPipe)
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly confirmEmailUseCase: ConfirmEmailUseCase,
        private readonly deactivateUserUseCase: DeactivateUserUseCase,
        private readonly getUserByIdUseCase: GetUserByIdUseCase,
        private readonly listUserUseCase: ListUsersUseCase,
        private readonly reactivateUserUseCase: ReactivateUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase
    ) {}

    @Post()
    @Roles(UserRole.ADMIN, UserRole.MANAGER)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully', type: UserResponseDto})
    @ApiResponse({ status: 400, description: 'Validation failed', type: ErrorResponseDto })
    @ApiResponse({ status: 401, description: 'Authentication required', type: ErrorResponseDto })
    @ApiResponse({ status: 403, description: 'Insufficient permissions', type: ErrorResponseDto })
    async create (@Body() createUserDto: CreateUserRequestDto): Promise<UserResponseDto> {
        const appDto = UserPresentationMapper.toCreateUserDto(createUserDto);
        const result = await this.createUserUseCase.execute(appDto);
        return UserPresentationMapper.toUserResponseDto(result)
    }

    @Get(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user by ID'})
    @ApiResponse({ status: 200, description: 'User found', type: UserResponseDto })
    @ApiResponse({ status: 404, description: 'User not found', type: ErrorResponseDto })
    @ApiResponse({ status: 401, description: 'Authentication required', type: ErrorResponseDto })
    async findOne(@Param('id') id: string, @CurrentUser() currentUser: AuthenticatedRequest['user']): Promise<UserResponseDto | null> {
        // Users can only view their own profile unless they are ADMIN/MANAGER
        if (currentUser?.role !== UserRole.ADMIN.toString() && currentUser?.role !== UserRole.MANAGER.toString() && currentUser?.id !== id) {
            throw new Error('Insufficient permissions to view this user');
        }
        
        const result = await this.getUserByIdUseCase.execute(id);
        return result ? UserPresentationMapper.toUserResponseDto(result) : null
    }

    @Get()
    @Roles(UserRole.ADMIN, UserRole.MANAGER)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Users retrieved successfully', type: UserListResponseDto })
    @ApiResponse({ status: 401, description: 'Authentication required', type: ErrorResponseDto })
    @ApiResponse({ status: 403, description: 'Insufficient permissions', type: ErrorResponseDto })
    async findAll(
        @Query('companyId') companyId: string, 
        @Query('page') page?: number, 
        @Query('limit') limit?: number
    ): Promise<UserListResponseDto> {
        const result = await this.listUserUseCase.execute(companyId, page || 1, limit || 20);
        return UserPresentationMapper.toUserListResponseDto(result);
    }

    @Put(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update user' })
    @ApiResponse({ status: 200, description: 'User updated successfully', type: UserResponseDto })
    @ApiResponse({ status: 404, description: 'User not found', type: ErrorResponseDto })
    @ApiResponse({ status: 401, description: 'Authentication required', type: ErrorResponseDto })
    @ApiResponse({ status: 403, description: 'Insufficient permissions', type: ErrorResponseDto })
    async update(
        @Param('id') id: string, 
        @Body() updateUserDto: UpdateUserRequestDto,
        @CurrentUser() currentUser: AuthenticatedRequest['user']
    ): Promise<UserResponseDto | null> {
        // Users can only update their own profile unless they are ADMIN
        if (currentUser?.role !== UserRole.ADMIN.toString() && currentUser?.id !== id) {
            throw new Error('Insufficient permissions to update this user');
        }
        
        const appDto = UserPresentationMapper.toUpdateUserDto(updateUserDto, id);
        const result = await this.updateUserUseCase.execute(appDto);
        return result ? UserPresentationMapper.toUserResponseDto(result) : null;
    }

    @Post('confirm-email')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Confirm user email' })
    @ApiResponse({ status: 200, description: 'Email confirmed successfully', type: UserResponseDto })
    @ApiResponse({ status: 400, description: 'Invalid or expired token', type: ErrorResponseDto })
    @ApiResponse({ status: 401, description: 'Authentication required', type: ErrorResponseDto })
    async confirmEmail(@Body() confirmEmailDto: ConfirmEmailRequestDto): Promise<UserResponseDto> {
        const appDto = UserPresentationMapper.toConfirmEmailDto(confirmEmailDto);
        const result = await this.confirmEmailUseCase.execute(appDto);
        return UserPresentationMapper.toUserResponseDto(result);
    }

    @Put(':id/deactivate')
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Deactivate user' })
    @ApiResponse({ status: 200, description: 'User deactivated successfully', type: UserResponseDto })
    @ApiResponse({ status: 404, description: 'User not found', type: ErrorResponseDto })
    @ApiResponse({ status: 401, description: 'Authentication required', type: ErrorResponseDto })
    @ApiResponse({ status: 403, description: 'Insufficient permissions', type: ErrorResponseDto })
    async deactivate(@Param('id') id: string): Promise<UserResponseDto | null> {
        const result = await this.deactivateUserUseCase.execute(id);
        return result ? UserPresentationMapper.toUserResponseDto(result) : null;
    }

    @Put(':id/reactivate')
    @Roles(UserRole.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Reactivate user' })
    @ApiResponse({ status: 200, description: 'User reactivated successfully', type: UserResponseDto })
    @ApiResponse({ status: 404, description: 'User not found', type: ErrorResponseDto })
    @ApiResponse({ status: 401, description: 'Authentication required', type: ErrorResponseDto })
    @ApiResponse({ status: 403, description: 'Insufficient permissions', type: ErrorResponseDto })
    async reactivate(@Param('id') id: string): Promise<UserResponseDto | null> {
        const result = await this.reactivateUserUseCase.execute(id);
        return result ? UserPresentationMapper.toUserResponseDto(result) : null;
    }

    @Get('me/profile')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get current user profile' })
    @ApiResponse({ status: 200, description: 'User profile retrieved', type: UserResponseDto })
    @ApiResponse({ status: 401, description: 'Authentication required', type: ErrorResponseDto })
    async getCurrentUserProfile(@CurrentUser() currentUser: AuthenticatedRequest['user']): Promise<UserResponseDto | null> {
        if (!currentUser) {
            return null;
        }
        
        const result = await this.getUserByIdUseCase.execute(currentUser.id);
        return result ? UserPresentationMapper.toUserResponseDto(result) : null;
    }
}