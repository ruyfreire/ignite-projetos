import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { faker } from '@faker-js/faker'
import { hash } from 'bcryptjs'
import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { OrganizationNotExistsError } from './errors/organization-not-exists-error'
import { GetOrganizationDetailsUseCase } from './get-organization-details-use-case'

describe('Get Organization details use-case', () => {
  let sut: GetOrganizationDetailsUseCase
  let organizationRepository: InMemoryOrganizationRepository

  beforeEach(async () => {
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new GetOrganizationDetailsUseCase(organizationRepository)
  })

  it('should be able to get organization details', async () => {
    const organizationDatabase = await organizationRepository.create({
      name: faker.company.name(),
      address: faker.location.street(),
      city: faker.location.city(),
      email: faker.internet.email(),
      password_hash: await hash(faker.internet.password(), 6),
      phone: faker.phone.number(),
    })

    const { organization } = await sut.execute({
      organizationId: organizationDatabase.id,
    })

    expect(organization).toEqual(
      expect.objectContaining({
        id: organizationDatabase.id,
      }),
    )
  })

  it('should throw organization not exists error', async () => {
    await expect(() =>
      sut.execute({
        organizationId: randomUUID(),
      }),
    ).rejects.toThrowError(OrganizationNotExistsError)
  })
})
