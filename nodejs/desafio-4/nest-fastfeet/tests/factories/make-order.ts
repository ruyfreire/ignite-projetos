import { Order, OrderProps } from '@/domain/delivery/enterprise/entities/order'
import { PrismaOrderMapper } from '@/infra/repositories/prisma/mappers/prisma-order-mapper'
import { PrismaService } from '@/infra/repositories/prisma/prisma.service'
import { fakerPT_BR as faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

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

@Injectable()
export class OrderFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaOrder(data: Partial<OrderProps> = {}): Promise<Order> {
    const order = makeOrder(data)

    await this.prisma.order.create({
      data: PrismaOrderMapper.toPrisma(order),
    })

    return order
  }
}
