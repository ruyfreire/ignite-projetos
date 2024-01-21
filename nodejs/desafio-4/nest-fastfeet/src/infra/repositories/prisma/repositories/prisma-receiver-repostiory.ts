import { ReceiverRepository } from '@/domain/delivery/application/repositories/receiver-repository'
import { Receiver } from '@/domain/delivery/enterprise/entities/receiver'
import { PrismaService } from '../prisma.service'
import { PrismaReceiverMapper } from '../mappers/prisma-receiver-mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaReceiverRepository implements ReceiverRepository {
  constructor(private prisma: PrismaService) {}

  async create(receiver: Receiver) {
    const data = PrismaReceiverMapper.toPrisma(receiver)

    await this.prisma.receiver.create({
      data,
    })
  }

  async findByCpf(cpf: string) {
    const receiver = await this.prisma.receiver.findUnique({
      where: {
        cpf,
      },
    })

    if (!receiver) {
      return null
    }

    return PrismaReceiverMapper.toDomain(receiver)
  }

  async findMany() {
    const receivers = await this.prisma.receiver.findMany()

    return receivers.map(PrismaReceiverMapper.toDomain)
  }

  async update(receiver: Receiver) {
    const data = PrismaReceiverMapper.toPrisma(receiver)

    await this.prisma.receiver.update({
      where: { cpf: receiver.cpf },
      data,
    })
  }

  async delete(cpf: string) {
    await this.prisma.receiver.delete({
      where: { cpf },
    })
  }
}
