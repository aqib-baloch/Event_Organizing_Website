import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
//import { Auth } from './entities/auth.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User, UserRole } from './entities/auth.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private authRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET_KEY,
    });
  }

  //Register Organizer/ Attendee

  async register(registerDto: RegisterDto) {
    const { username, email, contactNo, cnic } = registerDto;

    // Check if a user with the same username, email, contactNo, or cnic already exists
    const existingUser = await this.authRepository.findOne({
      where: [{ username }, { email }, { contactNo }, { cnic }],
    });
    // If the user already exists, throw an error
    if (existingUser) {
      throw new ConflictException(
        'User with the provided username, email, contact number, or CNIC already exists',
      );
    }
    // If no duplicate user is found, create and save the new user
    const newUser = this.authRepository.create(registerDto);
    await this.authRepository.save(newUser);

    return { message: 'User registered successfully' };
  }

  // Login Code
  async login(loginDto: LoginDto) {
    const { email, password, role } = loginDto;

    const user = await this.authRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (user.role === UserRole.BLOCKED) {
      throw new ForbiddenException(
        'Your account is blocked. Please contact the admin.',
      );
    }

    const isPasswordMatching = await user.comparePassword(password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Check if the role matches
    if (user.role !== role) {
      throw new UnauthorizedException('Role does not match');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
