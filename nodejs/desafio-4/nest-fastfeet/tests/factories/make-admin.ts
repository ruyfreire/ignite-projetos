import { Admin, AdminProps } from '@/domain/delivery/enterprise/entities/admin'
import { PrismaAdminMapper } from '@/infra/repositories/prisma/mappers/prisma-admin-mapper'
import { PrismaService } from '@/infra/repositories/prisma/prisma.service'
import { fakerPT_BR as faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

export function makeAdmin(override: Partial<AdminProps> = {}, id?: string) {
  const admin = new Admin(
    {
      name: faker.person.fullName(),
      cpf: faker.number.int({ min: 11, max: 11 }).toString(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return admin
}

@Injectable()
export class AdminFactory {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async makePrismaAdmin(data: Partial<AdminProps> = {}): Promise<Admin> {
    const admin = makeAdmin(data)

    await this.prisma.user.create({
      data: PrismaAdminMapper.toPrisma(admin),
    })

    return admin
  }

  async getToken(admin: Admin): Promise<string> {
    const token = await this.jwtService.signAsync({
      sub: admin.id,
      role: admin.role?.toString(),
    })

    return token
  }
}
