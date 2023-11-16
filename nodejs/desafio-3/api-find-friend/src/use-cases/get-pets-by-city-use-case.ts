import { OrganizationRepository } from '@/repositories/organization-repository'
import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'
import { NoOrganizationFoundInCityError } from './errors/no-organization-found-in-city-error'

interface GetPetsByCityUseCaseRequest {
  city: string
  filter?: {
    name?: string
    size?: 'SMALL' | 'MEDIUM' | 'LARGE'
    age?: number
  }
}

interface GetPetsByCityUseCaseResponse {
  pets: Pet[]
}

export class GetPetsByCityUseCase {
  constructor(
    private organizationRepository: OrganizationRepository,
    private petRepository: PetRepository,
  ) {}

  async execute({
    city,
    filter,
  }: GetPetsByCityUseCaseRequest): Promise<GetPetsByCityUseCaseResponse> {
    const organization = await this.organizationRepository.findByCity(city)

    if (!organization) {
      throw new NoOrganizationFoundInCityError()
    }

    const pets = await this.petRepository.findManyByOrganizationId(
      organization.id,
      filter,
    )

    return { pets }
  }
}
