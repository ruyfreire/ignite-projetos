import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { OrganizationRepository } from '../organization-repository'

export class PrismaOrganizationRepository implements OrganizationRepository {
  async create(data: Prisma.OrganizationUncheckedCreateInput) {
    const organization = await prisma.organization.create({
      data,
    })

    return organization
  }

  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return organization
  }

  async findById(id: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
    })

    return organization
  }

  async findByCity(city: string) {
    const organization = await prisma.organization.findFirst({
      where: {
        city: {
          equals: city,
          mode: 'insensitive',
        },
      },
    })

    return organization
  }
}
