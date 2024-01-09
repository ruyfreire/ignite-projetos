import { DomainEvent } from '@/core/events/domain-event'
import { Delivery, DeliveryStatus } from '../entities/delivery'

export class DeliveryStatusChangedEvent implements DomainEvent {
  public ocurredAt: Date

  constructor(
    readonly delivery: Delivery,
    readonly status: DeliveryStatus,
  ) {
    this.ocurredAt = new Date()
  }

  getAggregateId(): string {
    return this.delivery.id
  }
}
