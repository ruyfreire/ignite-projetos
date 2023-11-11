import { OrganizationRepository } from '@/repositories/organization-repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrganizationSameEmailAlreadyExistsError } from './errors/organization-same-email-already-exists-error'

interface CreateOrganizationUseCaseRequest {
  name: string
  address: string
  city: string
  phone: string
  email: string
  password: string
}

interface CreateOrganizationUseCaseResponse {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({
    name,
    address,
    city,
    phone,
    email,
    password,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const hasOrganization = await this.organizationRepository.findByEmail(email)

    if (hasOrganization) {
      throw new OrganizationSameEmailAlreadyExistsError()
    }

    const organization = await this.organizationRepository.create({
      name,
      address,
      city,
      phone,
      email,
      password_hash: await hash(password, 6),
    })

    return { organization }
  }
}
