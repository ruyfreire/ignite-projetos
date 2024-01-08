import {
  Receiver,
  ReceiverProps,
} from '@/domain/delivery/enterprise/entities/receiver'
import { Address } from '@/domain/delivery/enterprise/entities/value-objects/address'
import { fakerPT_BR as faker } from '@faker-js/faker'

export function makeReceiver(
  override: Partial<ReceiverProps> = {},
  id?: string,
) {
  const address = new Address({
    number: override.address?.number || faker.number.int({ min: 1, max: 999 }),
    latitude: override.address?.latitude || faker.location.latitude(),
    longitude: override.address?.longitude || faker.location.longitude(),
  })

  const receiver = new Receiver(
    {
      name: faker.person.fullName(),
      cpf: faker.finance.pin({ length: 11 }).toString(),
      address,
      ...override,
    },
    id,
  )

  return receiver
}
