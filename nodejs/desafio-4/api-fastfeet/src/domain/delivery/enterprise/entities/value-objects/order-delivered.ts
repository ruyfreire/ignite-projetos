import { ValueObject } from '@/core/entities/value-object'

export interface OrderDeliveredProps {
  deliveredAt: Date
  photoId: string
}

export class OrderDelivered extends ValueObject<OrderDeliveredProps> {
  constructor({ photoId }: { photoId: string }) {
    super({
      photoId,
      deliveredAt: new Date(),
    })
  }

  get deliveredAt() {
    return this.props.deliveredAt
  }

  get photoId() {
    return this.props.photoId
  }
}
