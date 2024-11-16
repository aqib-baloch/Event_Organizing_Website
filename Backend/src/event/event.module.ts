import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { UserModule } from '../user/user.module'; // Import UserModule
import { JwtService } from '@nestjs/jwt';
import { Booking } from '../booking/entities/booking.entity';
import { AdminModule } from 'src/admin/admin.module';
import { Admin } from 'typeorm';
import { User } from '../auth/entities/auth.entity';
import { EventDeletionRequest } from './entities/event-deletion-request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Event,
      Booking,
     
      EventDeletionRequest,
    ]),
    UserModule,
  ], // Import UserModule
  controllers: [EventController],
  providers: [EventService, JwtService],
})
export class EventModule {}
