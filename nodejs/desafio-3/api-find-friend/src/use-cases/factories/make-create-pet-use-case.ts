import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'
import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { CreatePetUseCase } from '../create-pet-use-case'

export function makeCreatePetUseCase() {
  const organizationRepository = new PrismaOrganizationRepository()
  const petRepository = new PrismaPetRepository()
  const useCase = new CreatePetUseCase(organizationRepository, petRepository)
  return useCase
}
