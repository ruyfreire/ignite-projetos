import { Order } from './order'
import { Receiver } from './receiver'
import { Deliveryman } from './deliveryman'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { DeliveryStatusChangedEvent } from '../events/delivery-status-changed'

export type DeliveryStatus = 'AVAILABLE' | 'DELIVERED' | 'RETURNED'

export interface DeliveryProps {
  order: Order
  receiver: Receiver
  deliveryman?: Deliveryman | null
  availableAt?: Date | null
  deliveredAt?: Date | null
  returnedAt?: Date | null
  status?: DeliveryStatus | null
}

export class Delivery extends AggregateRoot {
  constructor(
    protected props: DeliveryProps,
    id?: string,
  ) {
    super(id)
  }

  get order() {
    return this.props.order
  }

  get receiver() {
    return this.props.receiver
  }

  get deliveryman() {
    return this.props.deliveryman
  }

  set deliveryman(deliveryman: Deliveryman | null | undefined) {
    this.props.deliveryman = deliveryman
  }

  get availableAt() {
    return this.props.availableAt
  }

  set availableAt(date: Date | null | undefined) {
    this.updateStatus('AVAILABLE')
    this.props.availableAt = date
  }

  get deliveredAt() {
    return this.props.deliveredAt
  }

  set deliveredAt(date: Date | null | undefined) {
    this.updateStatus('DELIVERED')
    this.props.deliveredAt = date
  }

  get returnedAt() {
    return this.props.returnedAt
  }

  set returnedAt(date: Date | null | undefined) {
    this.updateStatus('RETURNED')
    this.props.returnedAt = date
  }

  get status() {
    return this.props.status
  }

  updateStatus(status: DeliveryStatus) {
    this.props.status = status
    this.addDomainEvent(new DeliveryStatusChangedEvent(this, status))
  }
}
