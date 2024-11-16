import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
//import { User } from '../user/entities/user.entity';
import { User } from '../auth/entities/auth.entity'; // Use User entity
import { Event } from '../event/entities/event.entity'; // Ensure Event is imported

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

  ) {}

  async bookEvent(
    eventId: string,
    createBookingDto: CreateBookingDto,
    attendee: User, // Correct attendee type
  ): Promise<Booking> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

   // Check if there are available seats
    if (event.capacity <= 0) {
      throw new BadRequestException('No more seats available for this event.');
    }


    // Create a booking for the event
    const booking = this.bookingRepository.create({
      attendeeName: createBookingDto.attendeeName,
      attendeeCNIC: createBookingDto.attendeeCNIC,
      attendeeAddress: createBookingDto.attendeeAddress,
      attendee: attendee, // Attendee object (User)
      event: event, // Event object
      bookingDate: new Date(),
    });

     const savedBooking = await this.bookingRepository.save(booking);

     // Decrement the event's capacity
     event.capacity -= 1;
     await this.eventRepository.save(event);

     return savedBooking;

   // return await this.bookingRepository.save(booking);
  }
}
