import { Order } from '@/domain/delivery/enterprise/entities/order'
import { Prisma, Order as PrismaOrder } from '@prisma/client'

export class PrismaOrderMapper {
  static toDomain(raw: PrismaOrder): Order {
    return new Order({ title: raw.title }, raw.id)
  }

  static toPrisma(order: Order): Prisma.OrderUncheckedCreateInput {
    return {
      id: order.id,
      title: order.title,
    }
  }
}
