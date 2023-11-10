import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetRepository } from '../pet-repository'

export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput, organizationId: string) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      age: data.age,
      size: data.size,
      description: data.description || null,
    }

    this.items.push(pet)

    return pet
  }
}
