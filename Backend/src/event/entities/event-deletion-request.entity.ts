 



// src/event/entities/event-deletion-request.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../../auth/entities/auth.entity'; // Make sure this path is correct
import { Event } from './event.entity';
import { DeletionRequestStatus } from '../enums/deletion-request-status.enum';

@Entity('event_deletion_requests')
export class EventDeletionRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  organizer: User;

  @ManyToOne(() => Event, (event) => event.deletionRequests, {
    onDelete: 'CASCADE', // This ensures the event deletion triggers deletion of related requests
    nullable: false, // The event must exist
  })
  event: Event;

  @Column({
    type: 'enum',
    enum: DeletionRequestStatus,
    default: DeletionRequestStatus.PENDING,
  })
  status: DeletionRequestStatus;

  @Column({ nullable: true })
  reason?: string;
}
