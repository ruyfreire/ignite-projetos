import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetFilter, PetRepository } from '../pet-repository'

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data })
    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({ where: { id } })
    return pet
  }

  async findManyByOrganizationId(organizationId: string, filter?: PetFilter) {
    const filters: Prisma.PetWhereInput = {}

    if (filter?.name) {
      filters.name = { contains: filter.name, mode: 'insensitive' }
    }

    if (filter?.size) {
      filters.size = { equals: filter.size }
    }

    if (filter?.age) {
      filters.age = { lte: filter.age }
    }

    const pets = await prisma.pet.findMany({
      where: {
        organization_id: organizationId,
        ...filters,
      },
    })

    return pets
  }
}
