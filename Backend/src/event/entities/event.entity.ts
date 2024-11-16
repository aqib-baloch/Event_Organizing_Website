import { Booking } from '../../booking/entities/booking.entity';
import { User } from '../../auth/entities/auth.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
  
} from 'typeorm';
import { EventDeletionRequest } from './event-deletion-request.entity';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  venue: string;

  @Column({ nullable: true })
  date: Date;

  @Column()
  capacity: number;

  @ManyToOne(() => User, (user) => user.events)
  organizer: User;

  // @ManyToOne(() => Admin, (admin) => admin.events,)
  // admin: Admin; // Add this to track if the event was created by an Admin

  @OneToMany(() => Booking, (booking) => booking.event)
  bookings: Booking[];

  @OneToMany(
    () => EventDeletionRequest,
    (deletionRequest) => deletionRequest.event,
    {
      onDelete: 'CASCADE', // Optional, handles deletion of related requests when event is deleted
    },
  )
  deletionRequests: EventDeletionRequest[];

  @CreateDateColumn()
  createdAt: Date;
}

