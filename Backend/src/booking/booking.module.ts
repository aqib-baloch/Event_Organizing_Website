import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { JwtService } from '@nestjs/jwt';
import { Event } from '../event/entities/event.entity';
import { User } from 'src/auth/entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Event, User])],
  controllers: [BookingController],
  providers: [BookingService, JwtService],
})
export class BookingModule {}
