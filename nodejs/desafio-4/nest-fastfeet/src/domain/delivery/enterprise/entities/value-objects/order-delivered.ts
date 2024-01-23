import { ValueObject } from '@/core/entities/value-object'

export interface OrderDeliveredProps {
  deliveredAt?: Date | null
  photoId: string
}

export class OrderDelivered extends ValueObject<OrderDeliveredProps> {
  constructor({ photoId, deliveredAt }) {
    super({
      photoId,
      deliveredAt: deliveredAt || new Date(),
    })
  }

  get deliveredAt() {
    return this.props.deliveredAt
  }

  get photoId() {
    return this.props.photoId
  }
}
