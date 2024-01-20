import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { AdminRepository } from '@/domain/delivery/application/repositories/admin-repository'
import { Admin } from '@/domain/delivery/enterprise/entities/admin'
import { PrismaAdminMapper } from '../mappers/prisma-admin-mapper'

@Injectable()
export class PrismaAdminRepository implements AdminRepository {
  constructor(private prisma: PrismaService) {}

  async create(admin: Admin) {
    const data = PrismaAdminMapper.toPrisma(admin)

    await this.prisma.user.create({
      data,
    })
  }

  async findByCpf(cpf: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        cpf,
        role: 'ADMIN',
      },
    })

    if (!user) {
      return null
    }

    return PrismaAdminMapper.toDomain(user)
  }

  async update(admin: Admin) {
    const data = PrismaAdminMapper.toPrisma(admin)

    await this.prisma.user.update({
      where: {
        cpf: admin.cpf,
        role: 'ADMIN',
      },
      data,
    })
  }

  async delete(cpf: string) {
    await this.prisma.user.delete({
      where: {
        cpf,
        role: 'ADMIN',
      },
    })
  }
}
