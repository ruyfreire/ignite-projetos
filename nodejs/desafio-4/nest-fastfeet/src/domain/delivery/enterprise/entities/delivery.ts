import { Order } from './order'
import { Receiver } from './receiver'
import { Deliveryman } from './deliveryman'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { DeliveryStatusChangedEvent } from '../events/delivery-status-changed'
import { OrderDelivered } from './value-objects/order-delivered'

export type DeliveryStatus = 'AVAILABLE' | 'DELIVERED' | 'RETURNED' | null

export interface DeliveryProps {
  order: Order
  receiver: Receiver
  deliveryman?: Deliveryman | null
  availableAt?: Date | null
  delivered?: OrderDelivered | null
  returnedAt?: Date | null
  status?: DeliveryStatus
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

  set order(order: Order) {
    this.props.order = order
  }

  get receiver() {
    return this.props.receiver
  }

  set receiver(receiver: Receiver) {
    this.props.receiver = receiver
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

  setToAvailable(date?: Date) {
    this.updateStatus('AVAILABLE')
    this.props.availableAt = date || new Date()
  }

  revertAvailable() {
    this.updateStatus(null)
    this.props.availableAt = null
  }

  get delivered() {
    return this.props.delivered
  }

  setToDelivered(props: { deliveredAt?: Date | null; photoId: string }) {
    this.updateStatus('DELIVERED')
    this.props.delivered = new OrderDelivered({
      photoId: props.photoId,
      deliveredAt: props.deliveredAt,
    })
  }

  revertDelivered() {
    this.updateStatus(null)
    this.props.delivered = null
  }

  get returnedAt() {
    return this.props.returnedAt
  }

  setToReturned(date?: Date) {
    this.updateStatus('RETURNED')
    this.props.returnedAt = date || new Date()
  }

  revertReturned() {
    this.updateStatus(null)
    this.props.returnedAt = null
  }

  get status() {
    return this.props.status
  }

  updateStatus(status: DeliveryStatus) {
    this.props.status = status
    this.addDomainEvent(new DeliveryStatusChangedEvent(this, status))
  }
}
