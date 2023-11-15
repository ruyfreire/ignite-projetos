import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'
import { PetNotExistsError } from './errors/pet-not-exists-error'

interface GetPetDetailsUseCaseRequest {
  petId: string
}

interface GetPetDetailsUseCaseResponse {
  pet: Pet
}

export class GetPetDetailsUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    petId,
  }: GetPetDetailsUseCaseRequest): Promise<GetPetDetailsUseCaseResponse> {
    const pet = await this.petRepository.findById(petId)

    if (!pet) {
      throw new PetNotExistsError()
    }

    return { pet }
  }
}
