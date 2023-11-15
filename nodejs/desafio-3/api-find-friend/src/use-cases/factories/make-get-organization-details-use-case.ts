import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'
import { GetOrganizationDetailsUseCase } from '../get-organization-details-use-case'

export function makeGetOrganizationDetailsUseCase() {
  const organizationRepository = new PrismaOrganizationRepository()
  const useCase = new GetOrganizationDetailsUseCase(organizationRepository)
  return useCase
}
