import { Order, OrderProps } from '@/domain/delivery/enterprise/entities/order'
import { fakerPT_BR as faker } from '@faker-js/faker'

export function makeOrder(override: Partial<OrderProps> = {}, id?: string) {
  const order = new Order(
    {
      title: faker.commerce.productName(),
      ...override,
    },
    id,
  )

  return order
}
