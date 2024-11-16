import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Patch,
  Param,
  Req,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
//import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Assumed JWT AuthGuard is in place
//import { Roles } from '../auth/roles.decorator';
//import { RolesGuard } from '../auth/roles.guard'; // Role guard
import { UserRole } from '../auth/entities/auth.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Event } from './entities/event.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventDeletionRequestDto } from './dto/event-deletion-request.dto';

@ApiTags('events')
@ApiBearerAuth('JWT-auth')
@Controller('events')
//@UseGuards(JwtAuthGuard, RolesGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiResponse({ status: 201, description: 'Event created successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('/create-event')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard) // Apply both JWT and Roles guard
  @Roles(UserRole.ORGANIZER) // Only users with the Organizer role can create an event
  async create(@Body() createEventDto: CreateEventDto, @Request() req) {
    const user = req.user; // The logged-in user with Organizer role
    //const admin = req.user;
    return this.eventService.createEvent(createEventDto, user);
  }

  @ApiResponse({ status: 200, description: 'Events retrieved successfully.' })
  @ApiResponse({ status: 403, description: 'Unauthorized access.' })
  @Get('/getAllEvents')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER)
  @ApiBearerAuth('JWT-auth') // Only allow users with Organizer role
  async findAllForOrganizer(@Request() req) {
    const organizer = req.user; // Logged-in organizer
    return this.eventService.findAllForOrganizer(organizer);
  }

  //geteventbyid
  @ApiResponse({ status: 200, description: 'Events retrieved successfully.' })
  @ApiResponse({ status: 403, description: 'Unauthorized access.' })
  @Get('/get-event-by-id/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER)
  @ApiBearerAuth('JWT-auth')
  async getEventById(@Param('id') id: string, @Request() req): Promise<Event> {
    const organizer = req.user;
    return await this.eventService.findOne(id); // Ensure the types match here
  }

  //updateEventByID
  @Patch('update-event-by-id/:id') // Patch method for event updates
  @UseGuards(JwtAuthGuard, RolesGuard) // Protect the route
  @Roles(UserRole.ORGANIZER) // Only allow users with Organizer role
  @ApiBearerAuth('JWT-auth')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @Request() req,
  ) {
    const organizer = req.user; // Get the logged-in user (Organizer)
    return this.eventService.updateEvent(id, updateEventDto, organizer);
  }

  // //GetEventbyId
  // @Get(':eventId')
  // @ApiBearerAuth('JWT-auth')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.ORGANIZER) // Only organizers can access this endpoint
  // @ApiOperation({ summary: 'Get an event by ID for the organizer' })
  // @ApiResponse({ status: 200, description: 'Event retrieved successfully.' })
  // @ApiResponse({ status: 404, description: 'Event not found or unauthorized.' })
  // async getEventById(@Param('eventId') eventId: string, @Request() req: any) {
  //   const organizerId = req.user.id; // Organizer's ID comes from the JWT token
  //   return this.eventService.findEventById(eventId, organizerId);
  // }

  @Post('/request-deletion')
  @UseGuards(JwtAuthGuard, RolesGuard) // Protect the route
  @Roles(UserRole.ORGANIZER) // Only allow users with Organizer role
  @ApiBearerAuth('JWT-auth')
  async requestEventDeletion(
    @Req() req, // The request contains the authenticated user
    @Body() deletionRequestDto: EventDeletionRequestDto,
  ) {
    const organizer = req.user;
    return this.eventService.requestEventDeletion(
      organizer,
      deletionRequestDto,
    );
  }

  // Admin fetches pending deletion requests
  // Assuming JWT is required
  // @Get('deletion-requests/pending')
  // @UseGuards(JwtAuthGuard, RolesGuard) // Protect the route
  // @Roles(UserRole.ORGANIZER) // Only allow users with Organizer role
  // @ApiBearerAuth('JWT-auth')
  // async getPendingDeletionRequests() {
  //   return this.eventService.getPendingDeletionRequests();
  // }

  @Get('deletion-requests/pending')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER)
  @ApiBearerAuth('JWT-auth')
  async getPendingDeletionRequests(@Req() req: Request) {
    const organizerId = req['user'].id;// Organizer ID from JWT
    return this.eventService.getPendingDeletionRequests(organizerId);
  }
}
