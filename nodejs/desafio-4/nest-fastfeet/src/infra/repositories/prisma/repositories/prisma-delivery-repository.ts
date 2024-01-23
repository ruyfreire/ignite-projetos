import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { DeliveryRepository } from '@/domain/delivery/application/repositories/delivery-repository'
import { Delivery } from '@/domain/delivery/enterprise/entities/delivery'
import { PrismaDeliveryMapper } from '../mappers/prisma-delivery-mapper'
import { Coordinate } from '@/domain/delivery/application/geolocation/localization'
import { Prisma } from '@prisma/client'

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
    const deliveries = await this.prisma.$queryRaw<Delivery[]>`
      SELECT * from deliveries
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( receiver_latitude ) ) * cos( radians( receiver_longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( receiver_latitude ) ) ) ) <= 10
    `

    return deliveries
  }

  async update(delivery: Delivery) {
    const fields = PrismaDeliveryMapper.toPrisma(delivery)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { receiverId, receiverLatitude, receiverLongitude, ...data } = fields

    try {
      await this.prisma.delivery.update({
        where: { id: delivery.id },
        data,
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(JSON.stringify(error))
      }
    }
  }

  async delete(id: string) {
    await this.prisma.delivery.delete({
      where: { id },
    })
  }
}
