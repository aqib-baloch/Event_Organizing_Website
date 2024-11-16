// import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

// export class UpdateUserDto {
//   @ApiProperty({
//     description: 'The username of the user',
//     example: 'jane_doe',
//     required: false, // Marking as optional
//   })
//   @IsOptional()
//   @IsNotEmpty()
//   username?: string;

//   @ApiProperty({
//     description: 'The full name of the user',
//     example: 'Jane Doe',
//     required: false, // Marking as optional
//   })
//   @IsOptional()
//   @IsNotEmpty()
//   name?: string;

//   @ApiProperty({
//     description: 'The email of the user',
//     example: 'jane.doe@example.com',
//     required: false, // Marking as optional
//   })
//   @IsOptional()
//   @IsEmail()
//   email?: string;

//   @ApiProperty({
//     description: 'The password of the user',
//     example: 'SecurePassword123!',
//     required: false, // Marking as optional
//   })
//   @IsOptional()
//   @MinLength(6)
//   password?: string;

//   @ApiProperty({
//     description: 'The address of the user',
//     example: '456 Elm St, Springfield',
//     required: false, // Marking as optional
//   })
//   @IsOptional()
//   address?: string;

//   @ApiProperty({
//     description: 'The contact number of the user',
//     example: '0987654321',
//     required: false, // Marking as optional
//   })
//   @IsOptional()
//   contactNo?: string;

//   @ApiProperty({
//     description: 'The CNIC number of the user',
//     example: '98765-9876543-2',
//     required: false, // Marking as optional
//   })
//   @IsOptional()
//   cnic?: string;


// }


import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'jane_doe',
    required: false, // Marking as optional
  })
  @IsOptional()
  @IsNotEmpty()
  username?: string;

  @ApiProperty({
    description: 'The full name of the user',
    example: 'Jane Doe',
    required: false, // Marking as optional
  })
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'jane.doe@example.com',
    required: false, // Marking as optional
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'SecurePassword123!',
    required: false, // Marking as optional
  })
  @IsOptional()
  @MinLength(6)
  password?: string;

  @ApiProperty({
    description: 'The address of the user',
    example: '456 Elm St, Springfield',
    required: false, // Marking as optional
  })
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: 'The contact number of the user',
    example: '0987654321',
    required: false, // Marking as optional
  })
  @IsOptional()
  contactNo?: string;

  @ApiProperty({
    description: 'The CNIC number of the user',
    example: '98765-9876543-2',
    required: false, // Marking as optional
  })
  @IsOptional()
  cnic?: string;
}
