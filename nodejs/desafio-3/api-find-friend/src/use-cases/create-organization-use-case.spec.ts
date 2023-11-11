import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { faker } from '@faker-js/faker'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrganizationUseCase } from './create-organization-use-case'
import { OrganizationSameEmailAlreadyExistsError } from './errors/organization-same-email-already-exists-error'

describe('Create organization use-case', () => {
  let sut: CreateOrganizationUseCase

  beforeEach(() => {
    const organizationRepository = new InMemoryOrganizationRepository()
    sut = new CreateOrganizationUseCase(organizationRepository)
  })

  it('should create an organization', async () => {
    const { organization } = await sut.execute({
      name: faker.company.name(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
    })

    expect(organization).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        created_at: expect.any(Date),
        password_hash: expect.any(String),
      }),
    )
  })

  it('should hash organization  password upon create', async () => {
    const { organization } = await sut.execute({
      name: faker.company.name(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      email: faker.internet.email(),
      password: '123456',
      phone: faker.phone.number(),
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not create an organization same email', async () => {
    const email = faker.internet.email()

    await sut.execute({
      name: faker.company.name(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      email,
      password: faker.internet.password(),
      phone: faker.phone.number(),
    })

    await expect(() =>
      sut.execute({
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        email,
        password: faker.internet.password(),
        phone: faker.phone.number(),
      }),
    ).rejects.toThrow(OrganizationSameEmailAlreadyExistsError)
  })
})
