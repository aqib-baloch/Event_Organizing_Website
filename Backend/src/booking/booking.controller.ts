import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/entities/auth.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Booking')
@ApiBearerAuth('JWT-auth')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('/:eventId/book-event')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ATTENDEE) // Only allow attendees to book events
  async bookEvent(
    @Param('eventId') eventId: string, // Change to string if using UUID
    @Body() createBookingDto: CreateBookingDto,
    @Request() req,
  ) {
    const attendee = req.user; // Logged-in attendee
    return this.bookingService.bookEvent(eventId, createBookingDto, attendee);
  }
}