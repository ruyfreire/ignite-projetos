import { InMemoryDeliverymanRepository } from 'tests/repositories/in-memory-deliveryman-repository'
import { AuthenticateDeliverymanUseCase } from './authenticate-deliveryman'
import { FakeEncrypter } from 'tests/cryptography/fake-encrypter'
import { makeDeliveryman } from 'tests/factories/make-deliveryman'
import { FakeHasher } from 'tests/cryptography/fake-hasher'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let sut: AuthenticateDeliverymanUseCase
let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository
let fakeEncrypter: FakeEncrypter
let fakeHasher: FakeHasher

describe('Authenticate deliveryman Use Case', () => {
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    fakeEncrypter = new FakeEncrypter()
    fakeHasher = new FakeHasher()
    sut = new AuthenticateDeliverymanUseCase(
      inMemoryDeliverymanRepository,
      fakeEncrypter,
      fakeHasher,
    )
  })

  it('should be able to authenticate deliveryman', async () => {
    const deliveryman = makeDeliveryman({
      password: await fakeHasher.hash('123456'),
    })
    await inMemoryDeliverymanRepository.create(deliveryman)

    const result = await sut.execute({
      cpf: deliveryman.cpf,
      password: '123456',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })

  it('should not be able to authenticate deliveryman with wrong password', async () => {
    const deliveryman = makeDeliveryman({
      password: await fakeHasher.hash('123456'),
    })
    await inMemoryDeliverymanRepository.create(deliveryman)

    const result = await sut.execute({
      cpf: deliveryman.cpf,
      password: '654321',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(InvalidCredentialsError)
  })
})
