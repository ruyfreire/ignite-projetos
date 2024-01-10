import { InMemoryDeliverymanRepository } from 'tests/repositories/in-memory-deliveryman-repository'
import { makeDeliveryman } from 'tests/factories/make-deliveryman'
import { DeliverymanNotFoundError } from './errors/deliveryman-not-found-error'
import { UpdatePasswordDeliverymanUseCase } from './update-password-deliveryman'
import { FakeHasher } from 'tests/cryptography/fake-hasher'

let sut: UpdatePasswordDeliverymanUseCase
let fakeHasher: FakeHasher
let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository

describe('Update password Deliveryman use case', () => {
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    fakeHasher = new FakeHasher()
    sut = new UpdatePasswordDeliverymanUseCase(
      inMemoryDeliverymanRepository,
      fakeHasher,
    )
  })

  it('should update password deliveryman', async () => {
    const deliveryman = makeDeliveryman({
      password: '123456',
    })
    inMemoryDeliverymanRepository.items.push(deliveryman)

    const result = await sut.execute({
      cpf: deliveryman.cpf,
      password: 'new_password',
    })

    const isPasswordChanged = await fakeHasher.compare(
      'new_password',
      inMemoryDeliverymanRepository.items[0].password,
    )

    expect(result.isRight()).toBeTruthy()
    expect(isPasswordChanged).toBeTruthy()
  })

  it('should not update a deliveryman not found', async () => {
    const result = await sut.execute({
      cpf: '11111111111',
      password: '123456',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(DeliverymanNotFoundError)
  })
})
