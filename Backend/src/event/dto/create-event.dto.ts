import { IsNotEmpty, IsString, IsDate, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ description: 'The name of the event' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the event' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Venue of the event' })
  @IsNotEmpty()
  @IsString()
  venue: string;

  @ApiProperty({ description: 'Date of the event' })
  @IsNotEmpty()
   
  @IsDateString({ strict: true }) // Ensure strict date format (YYYY-MM-DD)
  date: string; // Keep this as a string initially

  @ApiProperty({ description: 'Total capacity of the event' })
  @IsNotEmpty()
  @IsNumber()
  capacity: number;
}
