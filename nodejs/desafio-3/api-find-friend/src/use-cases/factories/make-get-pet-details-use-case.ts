import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { GetPetDetailsUseCase } from '../get-pet-details-use-case'

export function makeGetPetDetailsUseCase() {
  const petRepository = new PrismaPetRepository()
  const useCase = new GetPetDetailsUseCase(petRepository)
  return useCase
}
