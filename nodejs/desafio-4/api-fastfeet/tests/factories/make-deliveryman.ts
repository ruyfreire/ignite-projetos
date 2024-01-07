import {
  Deliveryman,
  DeliverymanProps,
} from '@/domain/delivery/enterprise/entities/deliveryman'
import { fakerPT_BR as faker } from '@faker-js/faker'

export function makeDeliveryMan(
  override: Partial<DeliverymanProps> = {},
  id?: string,
) {
  const deliveryman = new Deliveryman(
    {
      name: faker.person.fullName(),
      cpf: faker.finance.pin({ length: 11 }).toString(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return deliveryman
}
