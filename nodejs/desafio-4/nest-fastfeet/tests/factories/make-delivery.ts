import {
  Delivery,
  DeliveryProps,
} from '@/domain/delivery/enterprise/entities/delivery'
import { makeAddress } from './make-address'
import { makeReceiver } from './make-receiver'
import { makeOrder } from './make-order'

export function makeDelivery(
  override: Partial<DeliveryProps> = {},
  id?: string,
) {
  const order = makeOrder()
  const address = makeAddress()
  const receiver = makeReceiver({ address })

  const delivery = new Delivery(
    {
      order,
      receiver,
      ...override,
    },
    id,
  )

  return delivery
}
