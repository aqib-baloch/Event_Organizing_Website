// // booking.entity.ts
// //import { User } from 'src/auth/entities/auth.entity';
// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   JoinColumn,
//   CreateDateColumn,
// } from 'typeorm';
// import { Auth, User } from '../../auth/entities/auth.entity'; // Import the User entity
// import { Event } from '../../event/entities/event.entity'; // Import the Event entity

// @Entity()
// export class Booking {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column({ nullable: false })
//   attendeeName: string;

//   @Column({ nullable: false })
//   attendeeCNIC: string;

//   @Column({ nullable: false })
//   attendeeAddress: string;

//   @ManyToOne(() => Event, (event) => event.bookings)
//   @JoinColumn({ name: 'eventId' })
//     event: Event;
    
//   @ManyToOne(() => User, (user) => user.bookings) // Use User instead of Auth here
//   @JoinColumn({ name: 'attendeeId' })
//   attendee: User;

//   @CreateDateColumn()
//   bookingDate: Date;
// }


// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   JoinColumn,
// } from 'typeorm';
// import { Event } from '../../event/entities/event.entity';
// import { User } from '../../user/entities/user.entity';

// @Entity()
// export class Booking {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   attendeeName: string;

//   @Column()
//   attendeeCNIC: string;

//   @Column()
//   attendeeAddress: string;

//   @ManyToOne(() => Event, (event) => event.bookings)
//   @JoinColumn({ name: 'eventId' })
//   event: Event;

//   @ManyToOne(() => User, (user) => user.bookings)
//   @JoinColumn({ name: 'attendeeId' })
//   attendee: User;

//   @Column({ type: 'timestamptz' })
//   bookingDate: Date;
// }

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Event } from '../../event/entities/event.entity';
import { User } from '../../auth/entities/auth.entity'; // Use the merged User entity

@Entity('booking')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  attendeeName: string;

  @Column()
  attendeeCNIC: string;

  @Column()
  attendeeAddress: string;

  @ManyToOne(() => Event, (event) => event.bookings)
  @JoinColumn({ name: 'eventId' })
  event: Event;

  @ManyToOne(() => User, (user) => user.bookings)
  @JoinColumn({ name: 'attendeeId' })
  attendee: User; // Use User entity directly

  @Column({ type: 'timestamptz' })
  bookingDate: Date;
}

