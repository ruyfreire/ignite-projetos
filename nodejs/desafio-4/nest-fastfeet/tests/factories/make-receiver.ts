import {
  Receiver,
  ReceiverProps,
} from '@/domain/delivery/enterprise/entities/receiver'
import { fakerPT_BR as faker } from '@faker-js/faker'
import { makeAddress } from './make-address'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/repositories/prisma/prisma.service'
import { PrismaReceiverMapper } from '@/infra/repositories/prisma/mappers/prisma-receiver-mapper'

export function makeReceiver(
  override: Partial<ReceiverProps> = {},
  id?: string,
) {
  const address = makeAddress()

  const receiver = new Receiver(
    {
      name: faker.person.fullName(),
      cpf: faker.finance.pin({ length: 11 }).toString(),
      address: override.address || address,
      ...override,
    },
    id,
  )

  return receiver
}

@Injectable()
export class ReceiverFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaReceiver(
    data: Partial<ReceiverProps> = {},
  ): Promise<Receiver> {
    const receiver = makeReceiver(data)

    await this.prisma.receiver.create({
      data: PrismaReceiverMapper.toPrisma(receiver),
    })

    return receiver
  }
}
