import {
  Delivery,
  DeliveryProps,
} from '@/domain/delivery/enterprise/entities/delivery'
import { Order } from '@/domain/delivery/enterprise/entities/order'
import { Receiver } from '@/domain/delivery/enterprise/entities/receiver'
import { Address } from '@/domain/delivery/enterprise/entities/value-objects/address'
import { fakerPT_BR as faker } from '@faker-js/faker'

export function makeDelivery(
  override: Partial<DeliveryProps> = {},
  id?: string,
) {
  const order = new Order({
    title: override.order?.title || faker.commerce.productName(),
  })

  const address = new Address({
    number:
      override.receiver?.address?.number ||
      Number(faker.location.buildingNumber()),
    latitude: override.receiver?.address?.latitude || faker.location.latitude(),
    longitude:
      override.receiver?.address?.longitude || faker.location.longitude(),
  })

  const receiver = new Receiver({
    name: override.receiver?.name || faker.person.fullName(),
    cpf: override.receiver?.cpf || faker.finance.pin({ length: 11 }).toString(),
    address: override.receiver?.address || address,
  })

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
