import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { faker } from '@faker-js/faker'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { NoOrganizationFoundInCityError } from './errors/no-organization-found-in-city-error'
import { GetPetsByCityUseCase } from './get-pets-by-city-use-case'

describe('Get Pets by city use-case', () => {
  let organizationRepository: InMemoryOrganizationRepository
  let petRepository: InMemoryPetRepository
  let sut: GetPetsByCityUseCase

  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new GetPetsByCityUseCase(organizationRepository, petRepository)
  })

  it('should list all pets in city', async () => {
    const city = faker.location.city()

    const organization = await organizationRepository.create({
      name: faker.company.name(),
      address: faker.location.street(),
      city,
      email: faker.internet.email(),
      password_hash: await hash(faker.internet.password(), 6),
      phone: faker.phone.number(),
    })

    await petRepository.create({
      name: faker.person.firstName(),
      age: faker.number.int({ min: 1, max: 15 }),
      size: faker.helpers.arrayElement(['SMALL', 'MEDIUM', 'LARGE']),
      description: faker.animal.dog(),
      organization_id: organization.id,
    })

    const pet = await petRepository.create({
      name: faker.person.firstName(),
      age: faker.number.int({ min: 1, max: 15 }),
      size: faker.helpers.arrayElement(['SMALL', 'MEDIUM', 'LARGE']),
      description: faker.animal.dog(),
      organization_id: organization.id,
    })

    const { pets } = await sut.execute({
      city,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toContainEqual(
      expect.objectContaining({
        id: pet.id,
      }),
    )
  })

  it('should filter pets by properties', async () => {
    const city = faker.location.city()

    const organization = await organizationRepository.create({
      name: faker.company.name(),
      address: faker.location.street(),
      city,
      email: faker.internet.email(),
      password_hash: await hash(faker.internet.password(), 6),
      phone: faker.phone.number(),
    })

    await petRepository.create({
      name: 'dog',
      age: 3,
      size: 'LARGE',
      description: faker.animal.dog(),
      organization_id: organization.id,
    })

    await petRepository.create({
      name: 'dog',
      age: 2,
      size: 'MEDIUM',
      description: faker.animal.dog(),
      organization_id: organization.id,
    })

    await petRepository.create({
      name: 'bird',
      age: 1,
      size: 'SMALL',
      description: faker.animal.dog(),
      organization_id: organization.id,
    })

    const { pets } = await sut.execute({ city })
    expect(pets).toHaveLength(3)

    const { pets: filterNameResponse } = await sut.execute({
      city,
      filter: { name: 'dog' },
    })
    expect(filterNameResponse).toHaveLength(2)
    expect(filterNameResponse).toEqual([
      expect.objectContaining({ size: 'LARGE' }),
      expect.objectContaining({ size: 'MEDIUM' }),
    ])

    const { pets: filterAgeResponse } = await sut.execute({
      city,
      filter: { age: 2 },
    })
    expect(filterAgeResponse).toHaveLength(2)
    expect(filterAgeResponse).toEqual([
      expect.objectContaining({ name: 'dog', age: 2 }),
      expect.objectContaining({ name: 'bird', age: 1 }),
    ])
  })

  it('should throw if not found organization in city', async () => {
    await expect(
      sut.execute({
        city: faker.location.city(),
      }),
    ).rejects.toThrowError(NoOrganizationFoundInCityError)
  })
})
