import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
//import { Auth } from '../auth/entities/auth.entity'; // User table
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { User } from '../auth/entities/auth.entity';
import { Admin } from './entities/admin.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Booking } from '../booking/entities/booking.entity';
import { Event } from '../event/entities/event.entity';
import { EventDeletionRequest } from '../event/entities/event-deletion-request.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Admin,
      Event,
      Booking,
      EventDeletionRequest,
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService, JwtStrategy, RolesGuard],
})
export class AdminModule {}
