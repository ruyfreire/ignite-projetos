import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'

interface CreatePetUseCaseRequest {
  pet: {
    name: string
    age: number
    description: string
    size: 'SMALL' | 'MEDIUM' | 'LARGE'
  }
  organizationId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private repository: PetRepository) {}

  async execute(
    request: CreatePetUseCaseRequest,
  ): Promise<CreatePetUseCaseResponse> {
    const { pet, organizationId } = request

    const created = await this.repository.create(pet, organizationId)

    return { pet: created }
  }
}
