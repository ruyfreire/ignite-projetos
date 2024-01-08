import { Entity } from '@/core/entities/entity'
import { Order } from './order'
import { Receiver } from './receiver'
import { Deliveryman } from './deliveryman'

export interface DeliveryProps {
  order: Order
  receiver: Receiver
  deliveryman?: Deliveryman | null
  availableAt?: Date | null
  deliveredAt?: Date | null
  returnedAt?: Date | null
}

export class Delivery extends Entity {
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
    this.props.availableAt = date
  }

  get deliveredAt() {
    return this.props.deliveredAt
  }

  set deliveredAt(date: Date | null | undefined) {
    this.props.deliveredAt = date
  }

  get returnedAt() {
    return this.props.returnedAt
  }

  set returnedAt(date: Date | null | undefined) {
    this.props.returnedAt = date
  }
}
