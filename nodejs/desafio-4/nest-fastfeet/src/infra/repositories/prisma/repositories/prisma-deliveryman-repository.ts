import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { DeliverymanRepository } from '@/domain/delivery/application/repositories/deliveryman-repository'
import { Deliveryman } from '@/domain/delivery/enterprise/entities/deliveryman'
import { PrismaDeliverymanMapper } from '../mappers/prisma-deliveryman-mapper'

@Injectable()
export class PrismaDeliverymanRepository implements DeliverymanRepository {
  constructor(private prisma: PrismaService) {}

  async create(deliveryman: Deliveryman) {
    const data = PrismaDeliverymanMapper.toPrisma(deliveryman)

    await this.prisma.user.create({
      data,
    })
  }

  async findMany() {
    const users = await this.prisma.user.findMany()
    return users.map(PrismaDeliverymanMapper.toDomain)
  }

  async findByCpf(cpf: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        cpf,
      },
    })

    if (!user) {
      return null
    }

    return PrismaDeliverymanMapper.toDomain(user)
  }

  async update(deliveryman: Deliveryman) {
    const data = PrismaDeliverymanMapper.toPrisma(deliveryman)

    await this.prisma.user.update({
      where: {
        cpf: deliveryman.cpf,
      },
      data,
    })
  }

  async delete(cpf: string) {
    await this.prisma.user.delete({
      where: {
        cpf,
      },
    })
  }
}
