import { Order } from './order'
import { Receiver } from './receiver'
import { Deliveryman } from './deliveryman'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { DeliveryStatusChangedEvent } from '../events/delivery-status-changed'
import { OrderDelivered } from './value-objects/order-delivered'

export type DeliveryStatus = 'AVAILABLE' | 'DELIVERED' | 'RETURNED'

export interface DeliveryProps {
  order: Order
  receiver: Receiver
  deliveryman?: Deliveryman | null
  availableAt?: Date | null
  delivered?: OrderDelivered | null
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

  setToAvailable() {
    this.updateStatus('AVAILABLE')
    this.props.availableAt = new Date()
  }

  get delivered() {
    return this.props.delivered
  }

  setToDelivered({ photoId }: { photoId: string }) {
    this.updateStatus('DELIVERED')
    this.props.delivered = new OrderDelivered({
      photoId,
    })
  }

  get returnedAt() {
    return this.props.returnedAt
  }

  setToReturned() {
    this.updateStatus('RETURNED')
    this.props.returnedAt = new Date()
  }

  get status() {
    return this.props.status
  }

  updateStatus(status: DeliveryStatus) {
    this.props.status = status
    this.addDomainEvent(new DeliveryStatusChangedEvent(this, status))
  }
}
