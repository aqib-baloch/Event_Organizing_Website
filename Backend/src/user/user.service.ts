import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../auth/entities/auth.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  // async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
  //   await this.userRepository.update(id, updateUserDto);
  //   return this.findOne(id);
  // }

  // async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
  //   // Log the incoming updateUserDto
  //   console.log('Update User DTO:', updateUserDto);

  //   // Perform the update operation
  //   const result = await this.userRepository.update(id, updateUserDto);

  //   // Check if the update was successful
  //   if (result.affected === 0) {
  //     throw new NotFoundException(`User with ID ${id} not found`);
  //   }

  //   // Return the updated user
  //   return this.findOne(id);
  // }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // Only update if there's something in the updateUserDto
    if (Object.keys(updateUserDto).length === 0) {
      throw new BadRequestException('No fields to update provided.');
    }

    const result = await this.userRepository.update(id, updateUserDto);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Return the updated user
    return this.findOne(id);
  }
}
