import {
  Deliveryman,
  DeliverymanProps,
} from '@/domain/delivery/enterprise/entities/deliveryman'
import { PrismaDeliverymanMapper } from '@/infra/repositories/prisma/mappers/prisma-deliveryman-mapper'
import { PrismaService } from '@/infra/repositories/prisma/prisma.service'
import { fakerPT_BR as faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

export function makeDeliveryman(
  override: Partial<DeliverymanProps> = {},
  id?: string,
) {
  const deliveryman = new Deliveryman(
    {
      name: faker.person.fullName(),
      cpf: faker.finance.pin({ length: 11 }).toString(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return deliveryman
}

@Injectable()
export class DeliverymanFactory {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async makePrismaDeliveryman(
    data: Partial<DeliverymanProps> = {},
  ): Promise<Deliveryman> {
    const deliveryman = makeDeliveryman(data)

    await this.prisma.user.create({
      data: PrismaDeliverymanMapper.toPrisma(deliveryman),
    })

    return deliveryman
  }

  async getToken(deliveryman: Deliveryman): Promise<string> {
    const token = await this.jwtService.signAsync({
      sub: deliveryman.id,
      role: deliveryman.role?.toString(),
    })

    return token
  }
}
