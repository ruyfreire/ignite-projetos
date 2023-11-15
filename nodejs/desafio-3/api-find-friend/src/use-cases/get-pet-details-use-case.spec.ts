import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { PetNotExistsError } from './errors/pet-not-exists-error'
import { GetPetDetailsUseCase } from './get-pet-details-use-case'

describe('Get Pet details use-case', () => {
  let sut: GetPetDetailsUseCase
  let petRepository: InMemoryPetRepository

  beforeEach(async () => {
    petRepository = new InMemoryPetRepository()
    sut = new GetPetDetailsUseCase(petRepository)
  })

  it('should be able to get pet details', async () => {
    const databasePet = await petRepository.create({
      name: faker.person.firstName(),
      age: faker.number.int({ min: 1, max: 15 }),
      size: faker.helpers.arrayElement(['SMALL', 'MEDIUM', 'LARGE']),
      description: faker.animal.dog(),
      organization_id: randomUUID(),
    })

    const { pet } = await sut.execute({
      petId: databasePet.id,
    })

    expect(pet).toEqual(
      expect.objectContaining({
        id: databasePet.id,
      }),
    )
  })

  it('should throw pet not exists error', async () => {
    await expect(() =>
      sut.execute({
        petId: randomUUID(),
      }),
    ).rejects.toThrowError(PetNotExistsError)
  })
})
