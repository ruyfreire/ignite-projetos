import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetFilter, PetRepository } from '../pet-repository'

export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      age: data.age,
      size: data.size,
      description: data.description || null,
      organization_id: data.organization_id,
      created_at: data.created_at ? new Date(data.created_at) : new Date(),
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    return pet || null
  }

  async findManyByOrganizationId(
    organizationId: string,
    filter: PetFilter = {},
  ) {
    const { name, size, age } = filter

    const pets = this.items.filter((pet) => {
      if (pet.organization_id !== organizationId) {
        return false
      }

      if (name && !pet.name.toLowerCase().includes(name.toLowerCase())) {
        return false
      }

      if (size && pet.size !== size) {
        return false
      }

      if (age && pet.age > age) {
        return false
      }

      return true
    })

    return pets
  }
}
