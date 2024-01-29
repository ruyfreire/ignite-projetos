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
import { PrismaDeliverymanMapper } from '@/infra/repositories/prisma/mappers/prisma-deliveryman-mapper'
import { makeDeliveryman } from './make-deliveryman'

export function makeDelivery(
  override: Partial<DeliveryProps> = {},
  id?: string,
) {
  const order = makeOrder()
  const receiver = makeReceiver()
  const deliveryman = makeDeliveryman()

  const delivery = new Delivery(
    {
      order: override.order || order,
      receiver: override.receiver || receiver,
      deliveryman: override.deliveryman || deliveryman,
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
      await this.prisma.order.create({
        data: PrismaOrderMapper.toPrisma(delivery.order),
      })
    }

    if (!data.receiver) {
      await this.prisma.receiver.create({
        data: PrismaReceiverMapper.toPrisma(delivery.receiver),
      })
    }

    if (!data.deliveryman) {
      await this.prisma.user.create({
        data: PrismaDeliverymanMapper.toPrisma(
          delivery.deliveryman || makeDeliveryman(),
        ),
      })
    }

    await this.prisma.delivery.create({
      data: PrismaDeliveryMapper.toPrisma(delivery),
    })

    return delivery
  }
}
