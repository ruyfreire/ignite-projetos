import {
  Delivery,
  DeliveryProps,
} from '@/domain/delivery/enterprise/entities/delivery'
import { makeReceiver } from './make-receiver'
import { makeOrder } from './make-order'

export function makeDelivery(
  override: Partial<DeliveryProps> = {},
  id?: string,
) {
  const order = makeOrder()
  const receiver = makeReceiver()

  const delivery = new Delivery(
    {
      order: override.order || order,
      receiver: override.receiver || receiver,
      ...override,
    },
    id,
  )

  return delivery
}
