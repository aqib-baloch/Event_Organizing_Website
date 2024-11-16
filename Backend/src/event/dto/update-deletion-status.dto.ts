// src/admin/dto/update-deletion-request-status.dto.ts
import { IsEnum } from 'class-validator';
import { DeletionRequestStatus } from '../../event/enums/deletion-request-status.enum'; // Adjust the path as needed

export class UpdateDeletionRequestStatusDto {
  @IsEnum(DeletionRequestStatus, {
    message: 'Status must be one of the following: APPROVED, REJECTED, PENDING',
  })
  status: DeletionRequestStatus;
}
