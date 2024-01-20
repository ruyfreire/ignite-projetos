import { InMemoryAdminRepository } from 'tests/repositories/in-memory-admin-repository'
import { AuthenticateAdminUseCase } from './authenticate-admin'
import { FakeEncrypter } from 'tests/cryptography/fake-encrypter'
import { makeAdmin } from 'tests/factories/make-admin'
import { FakeHasher } from 'tests/cryptography/fake-hasher'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let sut: AuthenticateAdminUseCase
let inMemoryAdminRepository: InMemoryAdminRepository
let fakeEncrypter: FakeEncrypter
let fakeHasher: FakeHasher

describe('Authenticate admin Use Case', () => {
  beforeEach(() => {
    inMemoryAdminRepository = new InMemoryAdminRepository()
    fakeEncrypter = new FakeEncrypter()
    fakeHasher = new FakeHasher()
    sut = new AuthenticateAdminUseCase(
      inMemoryAdminRepository,
      fakeEncrypter,
      fakeHasher,
    )
  })

  it('should be able to authenticate admin', async () => {
    const admin = makeAdmin({
      password: await fakeHasher.hash('123456'),
    })
    await inMemoryAdminRepository.create(admin)

    const result = await sut.execute({
      cpf: admin.cpf,
      password: '123456',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })

  it('should not be able to authenticate admin with wrong password', async () => {
    const admin = makeAdmin({
      password: await fakeHasher.hash('123456'),
    })
    await inMemoryAdminRepository.create(admin)

    const result = await sut.execute({
      cpf: admin.cpf,
      password: '654321',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(InvalidCredentialsError)
  })
})
