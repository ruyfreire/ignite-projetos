import { OrganizationRepository } from '@/repositories/organization-repository'
import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'
import { OrganizationNotExistsError } from './errors/organization-not-exists-error'

interface CreatePetUseCaseRequest {
  name: string
  age: number
  description: string | null
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  organization_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petRepository: PetRepository,
    private organizationRepository: OrganizationRepository,
  ) {}

  async execute({
    name,
    age,
    description,
    size,
    organization_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const organizationExists =
      await this.organizationRepository.findById(organization_id)

    if (!organizationExists) {
      throw new OrganizationNotExistsError()
    }

    const pet = await this.petRepository.create({
      name,
      age,
      description,
      size,
      organization_id,
    })

    return { pet }
  }
}
