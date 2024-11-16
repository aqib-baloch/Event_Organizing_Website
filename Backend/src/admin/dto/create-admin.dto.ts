// src/admin/dto/create-admin.dto.ts
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../auth/entities/auth.entity';

export class CreateAdminDto {
  @ApiProperty({
    description: 'Username',
    example: 'John Doe',
  })
  @IsNotEmpty({ message: 'UserName is required' })
    username: string;
    

  @ApiProperty({
    description: 'Admin name',
    example: 'John Doe',
  })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({
    description: 'Admin email address',
    example: 'admin@example.com',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    description: 'Admin password (minimum 6 characters)',
    example: 'strongPassword123',
  })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @ApiProperty({
    description: 'The role of the user',
    enum: UserRole,
    default: UserRole.ADMIN,
  })
  @IsEnum(UserRole)
  role: UserRole;
}
