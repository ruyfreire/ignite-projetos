import {
  DeliveryMan,
  DeliveryManProps,
} from '@/domain/delivery/enterprise/entities/deliveryman'
import { fakerPT_BR as faker } from '@faker-js/faker'

export function makeDeliveryMan(
  override: Partial<DeliveryManProps> = {},
  id?: string,
) {
  const deliveryman = new DeliveryMan(
    {
      name: faker.person.fullName(),
      cpf: faker.number.int({ min: 11, max: 11 }).toString(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return deliveryman
}
