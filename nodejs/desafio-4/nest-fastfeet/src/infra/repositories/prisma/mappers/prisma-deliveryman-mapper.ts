import { Prisma, User } from '@prisma/client'
import { Deliveryman } from '@/domain/delivery/enterprise/entities/deliveryman'

export class PrismaDeliverymanMapper {
  static toDomain(raw: User): Deliveryman {
    return new Deliveryman(
      {
        name: raw.name,
        cpf: raw.cpf,
        password: raw.password,
      },
      raw.id,
    )
  }

  static toPrisma(deliveryman: Deliveryman): Prisma.UserUncheckedCreateInput {
    return {
      id: deliveryman.id,
      name: deliveryman.name,
      cpf: deliveryman.cpf,
      password: deliveryman.password,
      role: deliveryman.role?.toString(),
    }
  }
}
