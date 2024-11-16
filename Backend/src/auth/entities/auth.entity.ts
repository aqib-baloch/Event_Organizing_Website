 import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Event } from '../../event/entities/event.entity';
import { Booking } from '../../booking/entities/booking.entity';

export enum UserRole {
  ADMIN = 'Admin',
  ORGANIZER = 'Organizer',
  ATTENDEE = 'Attendee',
  BLOCKED = 'Blocked',
}

@Entity('users') // This serves as the main User table
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  contactNo: string;

  @Column({ unique: true })
  cnic: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.ATTENDEE,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserRole,
    nullable: true, // Add this column to store the previous role
  })
  previousRole: UserRole;


  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({ default: false })
  isBlocked: boolean;

  @OneToMany(() => Event, (event) => event.organizer)
  events: Event[];

  @OneToMany(() => Booking, (booking) => booking.attendee)
  bookings: Booking[]; // Fix this relationship


  async comparePassword(password: string): Promise<boolean> {
     return bcrypt.compare(password, this.password);
   }
}
