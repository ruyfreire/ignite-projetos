import { OrganizationRepository } from '@/repositories/organization-repository'
import { Organization } from '@prisma/client'
import { OrganizationNotExistsError } from './errors/organization-not-exists-error'

interface GetOrganizationDetailsUseCaseRequest {
  organizationId: string
}

interface GetOrganizationDetailsUseCaseResponse {
  organization: Organization
}

export class GetOrganizationDetailsUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({
    organizationId,
  }: GetOrganizationDetailsUseCaseRequest): Promise<GetOrganizationDetailsUseCaseResponse> {
    const organization =
      await this.organizationRepository.findById(organizationId)

    if (!organization) {
      throw new OrganizationNotExistsError()
    }

    return { organization }
  }
}
