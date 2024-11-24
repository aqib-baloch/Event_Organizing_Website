import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  ConflictException,
  Body,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { User } from '../auth/entities/auth.entity';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventDeletionRequest } from './entities/event-deletion-request.entity';
import { DeletionRequestStatus } from './enums/deletion-request-status.enum';
import { EventDeletionRequestDto } from './dto/event-deletion-request.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(EventDeletionRequest)
    private deletionRequestRepository: Repository<EventDeletionRequest>,
  ) {}

  async createEvent(
    createEventDto: CreateEventDto,
    organizer: User,
  ): Promise<Event> {
    // Ensure the user is an organizer before proceeding
    if (organizer.role !== 'Organizer') {
      throw new ForbiddenException(
        'Only organizers or Admin can create events',
      );
    }

    // Create and save the event
    const event = this.eventRepository.create({
      ...createEventDto,
      date: new Date(createEventDto.date),
      organizer,
    });

    return await this.eventRepository.save(event);
  }

  async findAllForOrganizer(organizer: User): Promise<Event[]> {
    return await this.eventRepository.find({
      where: { organizer: { id: organizer.id } }, // Filter events based on the organizer's ID
      relations: ['organizer'], // Eagerly load organizer data if needed
    });
  }

  // GetEventByID
  async findOne(id: string): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['organizer', 'bookings', 'deletionRequests'], // Adjust as needed
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  async updateEvent(
    id: string,
    updateEventDto: UpdateEventDto,
    organizer: User,
  ): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['organizer'],
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (updateEventDto.capacity !== undefined) {
      event.capacity = updateEventDto.capacity; // apply new capacity from DTO
    }

    // Check if the logged-in organizer is the owner of the event
    if (event.organizer.id !== organizer.id) {
      throw new ForbiddenException('You can only update your own events');
    }

    // Apply the updates
    Object.assign(event, updateEventDto);

    // Save the updated event
    return await this.eventRepository.save(event);
  }

  // Request for event deletion
  // Organizer requests deletion
  async requestEventDeletion(
    organizer: User,
    deletionRequestDto: EventDeletionRequestDto,
  ): Promise<EventDeletionRequest> {
    const { eventId, reason } = deletionRequestDto;
    const event = await this.eventRepository.findOne({
      where: { id: eventId, organizer },
    });

    if (!event) {
      throw new NotFoundException(
        'Event not found or you are not authorized to delete it.',
      );
    }

    // Check if a pending deletion request already exists for this event
    const existingRequest = await this.deletionRequestRepository.findOne({
      where: { event, status: DeletionRequestStatus.PENDING },
    });

    if (existingRequest) {
      throw new ConflictException(
        'A deletion request for this event is already pending.',
      );
    }

    const deletionRequest = this.deletionRequestRepository.create({
      event,
      organizer,
      reason,
      status: DeletionRequestStatus.PENDING,
    });

    return this.deletionRequestRepository.save(deletionRequest);
  }

  async getPendingDeletionRequests(
    organizerId: number,
  ): Promise<EventDeletionRequest[]> {
    return await this.deletionRequestRepository.find({
      where: {
        status: DeletionRequestStatus.PENDING,
        organizer: { id: organizerId },
      },
      relations: ['event', 'organizer'],
    });
  }
}
