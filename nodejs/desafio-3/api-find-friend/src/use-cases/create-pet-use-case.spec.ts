import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { faker } from '@faker-js/faker'
import { hash } from 'bcryptjs'
import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet-use-case'
import { OrganizationNotExistsError } from './errors/organization-not-exists-error'

describe('Create pet use-case', () => {
  let petRepository: InMemoryPetRepository
  let sut: CreatePetUseCase
  let organizationRepository: InMemoryOrganizationRepository

  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new CreatePetUseCase(organizationRepository, petRepository)
  })

  it('should create a pet', async () => {
    const organization = await organizationRepository.create({
      name: faker.company.name(),
      address: faker.location.street(),
      city: faker.location.city(),
      email: faker.internet.email(),
      password_hash: await hash(faker.internet.password(), 6),
      phone: faker.phone.number(),
    })

    const { pet } = await sut.execute({
      name: faker.person.firstName(),
      age: faker.number.int({ min: 1, max: 15 }),
      size: faker.helpers.arrayElement(['SMALL', 'MEDIUM', 'LARGE']),
      description: faker.animal.dog(),
      organization_id: organization.id,
    })

    expect(pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        created_at: expect.any(Date),
      }),
    )

    expect(petRepository.items).toHaveLength(1)
  })

  it('should not create pet if organization_id not exists', async () => {
    await expect(() =>
      sut.execute({
        name: faker.person.firstName(),
        age: faker.number.int({ min: 1, max: 15 }),
        size: faker.helpers.arrayElement(['SMALL', 'MEDIUM', 'LARGE']),
        description: faker.animal.dog(),
        organization_id: randomUUID(),
      }),
    ).rejects.toThrow(OrganizationNotExistsError)

    expect(petRepository.items).toHaveLength(0)
  })
})
