import { ApiProperty } from "@nestjs/swagger";

export class EventDeletionRequestDto {
  @ApiProperty({
    description: 'The ID of the event to be deleted.',
    type: String,
  })
  eventId: string;

  @ApiProperty({
    description: 'Optional reason for deletion.',
    type: String,
    required: false,
  })
  reason?: string; // Optional reason for deletion
}
