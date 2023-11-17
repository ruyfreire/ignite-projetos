import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { faker } from '@faker-js/faker'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateOrganizationUseCase } from './authenticate-use-case'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate organization use-case', () => {
  let sut: AuthenticateOrganizationUseCase

  beforeEach(async () => {
    const organizationRepository = new InMemoryOrganizationRepository()

    organizationRepository.create({
      name: faker.company.name(),
      address: faker.location.street(),
      city: faker.location.city(),
      email: 'org@email.com',
      password_hash: await hash('123456', 6),
      phone: faker.phone.number(),
    })

    sut = new AuthenticateOrganizationUseCase(organizationRepository)
  })

  it('should authenticate an organization', async () => {
    const { organization } = await sut.execute({
      email: 'org@email.com',
      password: '123456',
    })

    expect(organization).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })

  it('should error invalid credentials on email not exists', async () => {
    await expect(() =>
      sut.execute({
        email: faker.internet.email(),
        password: faker.internet.password(),
      }),
    ).rejects.toThrow(InvalidCredentialsError)
  })

  it('should error invalid credentials on invalid password', async () => {
    await expect(() =>
      sut.execute({
        email: 'org@email.com',
        password: faker.internet.password(),
      }),
    ).rejects.toThrow(InvalidCredentialsError)
  })
})
