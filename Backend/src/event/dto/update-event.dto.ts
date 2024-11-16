import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @ApiProperty({
    description: 'The name of the event',
    example: 'Updated Event Name',
    required: false, // Optional for updates
  })
  name?: string;

  @ApiProperty({
    description: 'The description of the event',
    example: 'Updated event description.',
    required: false, // Optional for updates
  })
  description?: string;

  // @ApiProperty({
  //   description: 'The location of the event',
  //   example: 'Updated Location',
  //   required: false, // Optional for updates
  // })
  // location?: string;

  @ApiProperty({
    description: 'The location of the event',
    example: 'Updated Location',
    required: false, // Optional for updates
  })
  venue?: string;

  @ApiProperty({
    description: 'The date of the event',
    example: '2024-12-31',
    required: false, // Optional for updates
  })
  @IsDateString({ strict: true }) // Ensure strict date format (YYYY-MM-DD)
  date: string; // Keep this as a string initially

  @ApiProperty({
    description: 'The maximum number of attendees allowed',
    example: 150,
    required: false, // Optional for updates
  })
  capacity: number;
}
