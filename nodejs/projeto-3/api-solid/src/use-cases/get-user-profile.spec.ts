import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetUserProfileUserCase } from './get-user-profile'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUserCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUserCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const userCreated = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: userCreated.id,
    })

    expect(user).toMatchObject({
      id: expect.any(String),
      name: 'John Doe',
      email: 'johndoe@example.com',
    })
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'wrong_id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
