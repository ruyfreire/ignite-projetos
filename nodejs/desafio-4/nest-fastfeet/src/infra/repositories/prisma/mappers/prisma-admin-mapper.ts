import { Prisma, User } from '@prisma/client'
import { Admin } from '@/domain/delivery/enterprise/entities/admin'

export class PrismaAdminMapper {
  static toDomain(raw: User): Admin {
    return new Admin(
      {
        name: raw.name,
        cpf: raw.cpf,
        password: raw.password,
      },
      raw.id,
    )
  }

  static toPrisma(admin: Admin): Prisma.UserUncheckedCreateInput {
    return {
      id: admin.id,
      name: admin.name,
      cpf: admin.cpf,
      password: admin.password,
      role: admin.role?.toString(),
    }
  }
}
