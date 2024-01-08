import { InMemoryDeliverymanRepository } from 'tests/repositories/in-memory-deliveryman-repository'
import { makeDeliveryman } from 'tests/factories/make-deliveryman'
import { DeliverymanNotFoundError } from './errors/deliveryman-not-found-error'
import { UpdateDeliverymanPasswordUseCase } from './update-deliveryman-password'
import { FakeHasher } from 'tests/cryptography/fake-hasher'

let sut: UpdateDeliverymanPasswordUseCase
let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository
let fakeHasher: FakeHasher

describe('Update Deliveryman use case', () => {
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    fakeHasher = new FakeHasher()
    sut = new UpdateDeliverymanPasswordUseCase(
      inMemoryDeliverymanRepository,
      fakeHasher,
    )
  })

  it('should update a deliveryman password', async () => {
    const deliveryman = makeDeliveryman()
    inMemoryDeliverymanRepository.items.push(deliveryman)

    const result = await sut.execute({
      cpf: deliveryman.cpf,
      password: 'new password',
    })

    expect(result.isRight()).toBeTruthy()

    const passwordHashed = await fakeHasher.compare(
      'new password',
      inMemoryDeliverymanRepository.items[0]?.password,
    )

    expect(passwordHashed).toBeTruthy()
  })

  it('should not update a deliveryman not found', async () => {
    const deliveryman = makeDeliveryman()

    const result = await sut.execute({
      cpf: deliveryman.cpf,
      password: 'new password',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(DeliverymanNotFoundError)
  })
})
