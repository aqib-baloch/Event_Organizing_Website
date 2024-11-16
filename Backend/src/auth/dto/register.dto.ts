// import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
// import { UserRole } from '../entities/auth.entity';

// export class RegisterDto {
//   @IsNotEmpty()
//   username: string;

//   @IsNotEmpty()
//   name: string;

//   @IsEmail()
//   email: string;

//   @IsNotEmpty()
//   @MinLength(6)
//   password: string;

//   @IsNotEmpty()
//   address: string;

//   @IsNotEmpty()
//   contactNo: string;

//   @IsNotEmpty()
//   cnic: string;

//   @IsEnum(UserRole)
//   role: UserRole;
// }


import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/auth.entity';

export class RegisterDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'StrongPassword123!',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'The address of the user',
    example: '123 Main St, Springfield',
  })
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'The contact number of the user',
    example: '1234567890',
  })
  @IsNotEmpty()
  contactNo: string;

  @ApiProperty({
    description: 'The CNIC number of the user',
    example: '12345-1234567-1',
  })
  @IsNotEmpty()
  cnic: string;

  @ApiProperty({
    description: 'The role of the user',
    enum: UserRole,
    default: UserRole.ATTENDEE,
  })
  @IsEnum(UserRole)
  role: UserRole;
}
