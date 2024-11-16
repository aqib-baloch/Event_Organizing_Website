// create-booking.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({
    description: 'Name of the Attendee',
    example: 'xyz',
  })
  @IsNotEmpty()
  @IsString()
  attendeeName: string;

  @ApiProperty({
    description: 'CNIC of the attendee',
    example: '12345-6789301-9',
  })
  @IsNotEmpty()
  @IsString()
  attendeeCNIC: string;

  @ApiProperty({
    description: 'St#01, House#09, City, District',
    example: '12345-6789301-9',
  })
  @IsNotEmpty()
  @IsString()
  attendeeAddress: string;

  }
