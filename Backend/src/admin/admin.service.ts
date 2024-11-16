import {
  ForbiddenException,
  Get,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../auth/entities/auth.entity';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginAdminDto } from './dto/login-admin.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Booking } from '../booking/entities/booking.entity';
import { EventDeletionRequest } from '../event/entities/event-deletion-request.entity';
import { DeletionRequestStatus } from '../event/enums/deletion-request-status.enum';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    //private readonly adminRepository: AdminRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(EventDeletionRequest)
    private deletionRequestRepository: Repository<EventDeletionRequest>,
  ) {}

  validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET_KEY,
    });
  }
  // Endpoint for Admin create
  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const admin = this.adminRepository.create(createAdminDto);
    return this.adminRepository.save(admin);
  }

  // Login code start
  async validateAdmin(email: string, password: string): Promise<any> {
    const admin = await this.adminRepository.findOne({
      where: { email, role: UserRole.ADMIN },
    });
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return admin;
  }
  // Login Endpoint
  async login(loginAdminDto: LoginAdminDto): Promise<{ accessToken: string }> {
    const { email, password } = loginAdminDto;
    const admin = await this.validateAdmin(email, password);

    // JWT payload: Include role, email, and other admin details
    const payload = { email: admin.email, role: admin.role, sub: admin.id };
    const secret = this.configService.get('JWT_SECRET');
    const accessToken = this.jwtService.sign(payload, { secret });

    return { accessToken };
  }

  // 1. Get all users with the role of Organizer
  async getAllOrganizers(): Promise<User[]> {
    return this.userRepository.find({
      where: { role: UserRole.ORGANIZER }, // Fetch users where role is 'Organizer'
    });
  }

  // 2. Get all users with the role of Attendee
  async getAllAttendees(): Promise<User[]> {
    return this.userRepository.find({
      where: { role: UserRole.ATTENDEE }, // Fetch users where role is 'Attendee'
    });
  }

  // Fetch all events
  async getAllEvents(): Promise<Event[]> {
    return await this.eventRepository.find();
  }

  // Fetch all bookings
  async getAllBookings(): Promise<Booking[]> {
    return await this.bookingRepository.find({
      relations: ['attendee', 'event'],
    });
  }

  // Admin blocks a user (organizer or attendee)
  async blockUser(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if the user is already blocked
    if (user.role === UserRole.BLOCKED) {
      throw new ForbiddenException('User is already blocked');
    }

    // Save the current role in 'previousRole' and set 'role' to BLOCKED
    user.previousRole = user.role;
    user.role = UserRole.BLOCKED;

    await this.userRepository.save(user);
  }

  // Admin unblocks a user
  async unblockUser(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if the user is actually blocked
    if (user.role !== UserRole.BLOCKED) {
      throw new ForbiddenException('User is not blocked');
    }

    // Restore the previous role
    user.role = user.previousRole;
    user.previousRole = null; // Clear the previous role field

    await this.userRepository.save(user);
  }

  // Fetch pending deletion requests
  async getPendingDeletionRequests(): Promise<EventDeletionRequest[]> {
    return await this.deletionRequestRepository.find({
      where: { status: DeletionRequestStatus.PENDING },
      relations: ['event', 'organizer'],
    });
  }

  // Approve or reject a deletion request

  async reviewDeletionRequest(
    requestId: string,
    status: DeletionRequestStatus,
  ): Promise<void> {
    // Fetch the deletion request along with the associated event
    const deletionRequest = await this.deletionRequestRepository.findOne({
      where: { id: requestId },
      relations: ['event'],
    });

    if (!deletionRequest) {
      throw new NotFoundException('Deletion request not found.');
    }

    // Update the status of the deletion request
    deletionRequest.status = status;
    await this.deletionRequestRepository.save(deletionRequest);

    // If the deletion request is approved, delete the associated event
    if (status === DeletionRequestStatus.APPROVED) {
      await this.eventRepository.delete(deletionRequest.event.id); // This should delete the event
      // The deletion of the EventDeletionRequest is handled automatically via cascade
    }

  }
}
  
  
//   async reviewDeletionRequest(
//     requestId: string,
//     status: DeletionRequestStatus,
//   ): Promise<EventDeletionRequest> {
//     const deletionRequest = await this.deletionRequestRepository.findOne({
//       where: { id: requestId },
//       relations: ['event'],
//     });

//     if (!deletionRequest) {
//       throw new NotFoundException('Deletion request not found.');
//     }

//     deletionRequest.status = status;

//     const updatedRequest = await this.deletionRequestRepository.save(deletionRequest);

//     if (status === DeletionRequestStatus.APPROVED) {
//       await this.eventRepository.delete(deletionRequest.event.id);
//     }

//     return updatedRequest;
//   }
// }
  // async findUserById(userId: string): Promise<User> {
  //   const user = await this.userRepository.findOne({
  //     where: { id: userId }, // Specify the `where` condition
  //   });

  //   if (!user) {
  //     throw new NotFoundException(`User with ID ${userId} not found`);
  //   }

  //   return user;
  // }

