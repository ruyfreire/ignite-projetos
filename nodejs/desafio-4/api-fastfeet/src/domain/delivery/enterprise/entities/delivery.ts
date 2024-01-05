import { Entity } from '@/core/entities/entity'
import { Address } from './value-objects/address'

export interface DeliveryProps {
  orderId: string
  receiverId: string
  deliveryManId?: string | null
  availableAt: Date | null
  deliveredAt: Date | null
  returnedAt: Date | null
  address: Address
}

export class Delivery extends Entity {
  constructor(
    protected props: DeliveryProps,
    id?: string,
  ) {
    super(id)
  }

  get orderId() {
    return this.props.orderId
  }

  get receiverId() {
    return this.props.receiverId
  }

  get deliveryManId() {
    return this.props.deliveryManId
  }

  get availableAt() {
    return this.props.availableAt
  }

  get deliveredAt() {
    return this.props.deliveredAt
  }

  get returnedAt() {
    return this.props.returnedAt
  }

  get address() {
    return this.props.address
  }
}
