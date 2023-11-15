import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'
import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { GetPetsByCityUseCase } from '../get-pets-by-city-use-case'

export function makeGetPetsByCityUseCase() {
  const organizationRepository = new PrismaOrganizationRepository()
  const petRepository = new PrismaPetRepository()
  const useCase = new GetPetsByCityUseCase(
    organizationRepository,
    petRepository,
  )
  return useCase
}
