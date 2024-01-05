import { InMemoryUserRepository } from 'tests/repositories/in-memory-deliveryman-repository'
import { AuthenticateUseCase } from './authenticate'
import { FakeEncrypter } from 'tests/cryptography/fake-encrypter'
import { makeDeliveryMan } from 'tests/factories/make-deliveryman'

let sut: AuthenticateUseCase
let inMemoryUserRepository: InMemoryUserRepository
let fakeEncrypter: FakeEncrypter

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateUseCase(inMemoryUserRepository, fakeEncrypter)
  })

  it('should be able to authenticate user', async () => {
    const user = makeDeliveryMan()
    await inMemoryUserRepository.create(user)

    const result = await sut.execute({
      cpf: user.cpf,
      password: user.password,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
