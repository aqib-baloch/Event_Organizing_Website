// import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
// import { UserRole } from '../../auth/entities/auth.entity';

// export class CreateUserDto {
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
import { UserRole } from '../../auth/entities/auth.entity';

export class CreateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'jane_doe',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The full name of the user',
    example: 'Jane Doe',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'jane.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'SecurePassword123!',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'The address of the user',
    example: '456 Elm St, Springfield',
  })
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'The contact number of the user',
    example: '0987654321',
  })
  @IsNotEmpty()
  contactNo: string;

  @ApiProperty({
    description: 'The CNIC number of the user',
    example: '98765-9876543-2',
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
