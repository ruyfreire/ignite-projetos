import {
  Prisma,
  Delivery as PrismaDelivery,
  Order as PrismaOrder,
  Receiver as PrismaReceiver,
  User,
} from '@prisma/client'
import { Delivery } from '@/domain/delivery/enterprise/entities/delivery'
import { Order } from '@/domain/delivery/enterprise/entities/order'
import { Receiver } from '@/domain/delivery/enterprise/entities/receiver'
import { Address } from '@/domain/delivery/enterprise/entities/value-objects/address'
import { Deliveryman } from '@/domain/delivery/enterprise/entities/deliveryman'
import { OrderDelivered } from '@/domain/delivery/enterprise/entities/value-objects/order-delivered'

type PrismaDeliveryRaw = PrismaDelivery & {
  order: PrismaOrder
  receiver: PrismaReceiver
  deliveryman: Omit<User, 'password'> | null
}

export class PrismaDeliveryMapper {
  static toDomain(raw: PrismaDeliveryRaw): Delivery {
    const address = new Address({
      zip_code: raw.receiver.zip_code,
      city: raw.receiver.city,
      neighborhood: raw.receiver.neighborhood,
      number: raw.receiver.number,
      state: raw.receiver.state,
      street: raw.receiver.street,
      latitude: raw.receiver.latitude,
      longitude: raw.receiver.longitude,
    })

    const receiver = new Receiver(
      {
        cpf: raw.receiver.cpf,
        name: raw.receiver.name,
        address,
      },
      raw.order.id,
    )

    let deliveryman: Deliveryman | null = null
    if (raw.deliveryman) {
      deliveryman = new Deliveryman({
        name: raw.deliveryman.name,
        cpf: raw.deliveryman.cpf,
        password: '',
      })
    }

    const order = new Order({ title: raw.order.title }, raw.order.id)

    let delivered: OrderDelivered | null = null
    if (raw.deliveredAt && raw.photoId) {
      delivered = new OrderDelivered({
        photoId: raw.photoId,
        deliveredAt: raw.deliveredAt,
      })
    }

    return new Delivery(
      {
        order,
        receiver,
        deliveryman,
        availableAt: raw.availableAt,
        delivered,
        returnedAt: raw.returnedAt,
        status: raw.status,
      },
      raw.id,
    )
  }

  static toPrisma(delivery: Delivery): Prisma.DeliveryUncheckedCreateInput {
    return {
      orderId: delivery.order.id,
      receiverId: delivery.receiver.id,
      receiverLatitude: delivery.receiver.address.latitude,
      receiverLongitude: delivery.receiver.address.longitude,
      availableAt: delivery.availableAt ?? null,
      deliveredAt: delivery.delivered?.deliveredAt ?? null,
      photoId: delivery.delivered?.photoId ?? null,
      returnedAt: delivery.returnedAt ?? null,
      status: delivery.status ?? null,
      deliverymanId: delivery.deliveryman?.id ?? null,
    }
  }
}
