import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { DeliveryRepository } from '@/domain/delivery/application/repositories/delivery-repository'
import { Delivery } from '@/domain/delivery/enterprise/entities/delivery'
import { PrismaDeliveryMapper } from '../mappers/prisma-delivery-mapper'
import { Coordinate } from '@/domain/delivery/application/geolocation/localization'
import { DomainEvents } from '@/core/events/domain-events'
import { Delivery as PrismaDelivery } from '@prisma/client'

@Injectable()
export class PrismaDeliveryRepository implements DeliveryRepository {
  constructor(private prisma: PrismaService) {}

  async create(delivery: Delivery) {
    const data = PrismaDeliveryMapper.toPrisma(delivery)

    await this.prisma.delivery.create({ data })
  }

  async findById(id: string) {
    const delivery = await this.prisma.delivery.findUnique({
      where: { id },
      include: {
        order: true,
        receiver: true,
        deliveryman: true,
      },
    })

    if (!delivery) {
      return null
    }

    return PrismaDeliveryMapper.toDomain(delivery)
  }

  async findManyByCpfReceiver(cpf: string) {
    const deliveries = await this.prisma.delivery.findMany({
      where: {
        receiver: {
          cpf,
        },
      },
      include: {
        order: true,
        receiver: true,
        deliveryman: true,
      },
    })

    return deliveries.map(PrismaDeliveryMapper.toDomain)
  }

  async findManyByCpfDeliveryman(cpf: string) {
    const deliveries = await this.prisma.delivery.findMany({
      where: {
        deliveryman: {
          cpf,
        },
      },
      include: {
        order: true,
        receiver: true,
        deliveryman: true,
      },
    })

    return deliveries.map(PrismaDeliveryMapper.toDomain)
  }

  async findMany() {
    const deliveries = await this.prisma.delivery.findMany({
      include: {
        order: true,
        receiver: true,
        deliveryman: true,
      },
    })

    return deliveries.map(PrismaDeliveryMapper.toDomain)
  }

  async findNearbyDelivery({ latitude, longitude }: Coordinate) {
    const deliveries = await this.prisma.$queryRaw<PrismaDelivery[]>`
      SELECT * from deliveries
      WHERE status = 'AVAILABLE' AND ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( receiver_latitude ) ) * cos( radians( receiver_longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( receiver_latitude ) ) ) ) <= 10
    `

    if (deliveries.length > 0) {
      const result = await this.prisma.delivery.findMany({
        where: {
          id: {
            in: deliveries.map((delivery) => delivery.id),
          },
        },
        include: {
          order: true,
          receiver: true,
          deliveryman: true,
        },
      })

      return result.map(PrismaDeliveryMapper.toDomain)
    }

    return []
  }

  async update(delivery: Delivery) {
    const deliveryOnDatabase = await this.prisma.delivery.findUnique({
      where: { id: delivery.id },
    })

    if (deliveryOnDatabase) {
      const data = PrismaDeliveryMapper.toPrismaUpdate(delivery)

      await this.prisma.delivery.update({
        where: { id: delivery.id },
        data,
      })

      if (deliveryOnDatabase.status !== delivery.status) {
        DomainEvents.dispatchEventsForAggregate(delivery.id)
      }
    }
  }

  async delete(id: string) {
    await this.prisma.delivery.delete({
      where: { id },
    })
  }
}
