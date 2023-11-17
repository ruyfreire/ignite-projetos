import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'
import { AuthenticateOrganizationUseCase } from '../authenticate-use-case'

export function makeAuthenticateOrganizationUseCase() {
  const organizationRepository = new PrismaOrganizationRepository()
  const useCase = new AuthenticateOrganizationUseCase(organizationRepository)
  return useCase
}
