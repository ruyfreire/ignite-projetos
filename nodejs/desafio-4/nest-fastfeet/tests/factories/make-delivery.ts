import {
  Delivery,
  DeliveryProps,
} from '@/domain/delivery/enterprise/entities/delivery'
import { makeReceiver } from './make-receiver'
import { makeOrder } from './make-order'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/repositories/prisma/prisma.service'
import { PrismaDeliveryMapper } from '@/infra/repositories/prisma/mappers/prisma-delivery-mapper'
import { PrismaOrderMapper } from '@/infra/repositories/prisma/mappers/prisma-order-mapper'
import { PrismaReceiverMapper } from '@/infra/repositories/prisma/mappers/prisma-receiver-mapper'

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

@Injectable()
export class DeliveryFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaDelivery(
    data: Partial<DeliveryProps> = {},
  ): Promise<Delivery> {
    const delivery = makeDelivery(data)

    if (!data.order) {
      const order = await this.prisma.order.create({
        data: PrismaOrderMapper.toPrisma(makeOrder()),
      })

      delivery.order = PrismaOrderMapper.toDomain(order)
    }

    if (!data.receiver) {
      const receiver = await this.prisma.receiver.create({
        data: PrismaReceiverMapper.toPrisma(makeReceiver()),
      })

      delivery.receiver = PrismaReceiverMapper.toDomain(receiver)
    }

    await this.prisma.delivery.create({
      data: PrismaDeliveryMapper.toPrisma(delivery),
    })

    return delivery
  }
}
