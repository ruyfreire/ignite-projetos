import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetRepository } from '../pet-repository'

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
}
