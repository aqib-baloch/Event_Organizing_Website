import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  Delete,
  UseGuards,
  Post,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../auth/entities/auth.entity';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { DeletionRequestStatus } from '../event/enums/deletion-request-status.enum';
import { UpdateDeletionRequestStatusDto } from '../event/dto/update-deletion-status.dto';
import { EventDeletionRequest } from '../event/entities/event-deletion-request.entity';
 

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: AdminService,
  ) {}

  @Post('createAdmin')
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  @Post('loginAdmin')
  @ApiOperation({ summary: 'Admin Login' })
  async login(@Body() loginAdminDto: LoginAdminDto) {
    return this.adminService.login(loginAdminDto);
  }

  // 1. View All Organizers
  @Get('viewAllOrganizers')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN) // Only Admin can access this route
  async getAllOrganizers() {
    return this.adminService.getAllOrganizers();
  }

  // 2. View All Attendees
  @Get('viewAllAttendees')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN) // Only Admin can access this route
  async getAllAttendees() {
    return this.adminService.getAllAttendees();
  }

  // 3. Endpoint to get all events
  @Get('GetAllEvents')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getAllEvents() {
    return await this.adminService.getAllEvents();
  }

  // 4. Endpoint to get all bookings
  @Get('GetAllBookings')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getAllBookings() {
    return await this.adminService.getAllBookings();
  }

  // Admin endpoint to block a user (Organizer or Attendee)
  @Patch('/block/:userId')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN) // Only admins can access this route
  async blockUser(@Param('userId') userId: number): Promise<string> {
    await this.adminService.blockUser(userId);
    return `User with ID ${userId} has been blocked.`;
  }

  // Admin endpoint to unblock a user (Organizer or Attendee)
  @Patch('/unblock/:userId')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN) // Only admins can access this route
  async unblockUser(@Param('userId') userId: number): Promise<string> {
    await this.adminService.unblockUser(userId);
    return `User with ID ${userId} has been unblocked.`;
  }

  @Get('/ViewDeletionRequests')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all pending event deletion requests' })
  @ApiResponse({
    status: 200,
    description: 'Fetched pending deletion requests successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'No pending deletion requests found.',
  })
  async getPendingDeletionRequests(): Promise<EventDeletionRequest[]> {
    return await this.adminService.getPendingDeletionRequests();
  }

  @Patch('review-deletion/:requestId')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Review and approve or reject a deletion request' })
  @ApiResponse({
    status: 200,
    description: 'Deletion request updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Deletion request not found.' })
  async reviewDeletionRequest(
    @Param('requestId') requestId: string,
    @Body() updateDeletionRequestStatusDto: UpdateDeletionRequestStatusDto, // Use DTO here
  ): Promise<void> {
    return this.adminService.reviewDeletionRequest(
      requestId,
      updateDeletionRequestStatusDto.status,
    );
  }
  // @Get('user/:id') // Admin can search for a user (Organizer/Attendee) by ID
  // @UseGuards(JwtAuthGuard, RolesGuard) // Protect the route with JWT and Roles guard
  // @Roles(UserRole.ADMIN) // Only Admin can access this route
  // async findUserById(@Param('id') userId: string) {
  //   return this.adminService.findUserById(userId);
  // }
}
