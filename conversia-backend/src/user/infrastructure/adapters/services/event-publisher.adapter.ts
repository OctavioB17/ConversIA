import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import EventPublisherPort from '../../../app/ports/event-publisher.port';

@Injectable()
export class EventPublisherAdapter implements EventPublisherPort {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  publish(event: unknown): Promise<void> {
    this.eventEmitter.emit('user.*', event);
    return Promise.resolve();
  }

  async publishMany(events: unknown[]): Promise<void> {
    for (const event of events) {
      await this.publish(event);
    }
  }
}
