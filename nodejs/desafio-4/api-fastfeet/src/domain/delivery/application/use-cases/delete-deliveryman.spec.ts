import { InMemoryDeliverymanRepository } from 'tests/repositories/in-memory-deliveryman-repository'
import { DeleteDeliverymanUseCase } from './delete-deliveryman'
import { makeDeliveryMan } from 'tests/factories/make-deliveryman'
import { DeliverymanNotFoundError } from './errors/deliveryman-not-found-error'

let sut: DeleteDeliverymanUseCase
let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository

describe('Delete Deliveryman use case', () => {
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    sut = new DeleteDeliverymanUseCase(inMemoryDeliverymanRepository)
  })

  it('should delete a deliveryman', async () => {
    const deliveryman = makeDeliveryMan()
    inMemoryDeliverymanRepository.items.push(deliveryman)

    const result = await sut.execute({
      cpf: deliveryman.cpf,
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryDeliverymanRepository.items).toHaveLength(0)
  })

  it('should not delete a deliveryman not found', async () => {
    const deliveryman = makeDeliveryMan()

    const result = await sut.execute({
      cpf: deliveryman.cpf,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(DeliverymanNotFoundError)
  })
})
