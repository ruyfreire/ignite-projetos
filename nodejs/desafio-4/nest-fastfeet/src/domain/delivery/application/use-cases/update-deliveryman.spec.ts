import { InMemoryDeliverymanRepository } from 'tests/repositories/in-memory-deliveryman-repository'
import { UpdateDeliverymanUseCase } from './update-deliveryman'
import { makeDeliveryman } from 'tests/factories/make-deliveryman'
import { DeliverymanNotFoundError } from './errors/deliveryman-not-found-error'

let sut: UpdateDeliverymanUseCase
let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository

describe('Update Deliveryman use case', () => {
  beforeEach(() => {
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    sut = new UpdateDeliverymanUseCase(inMemoryDeliverymanRepository)
  })

  it('should update a deliveryman', async () => {
    const deliveryman = makeDeliveryman()
    inMemoryDeliverymanRepository.items.push(deliveryman)

    const result = await sut.execute({
      name: 'new name',
      cpf: deliveryman.cpf,
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryDeliverymanRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'new name',
        }),
      ]),
    )
  })

  it('should not update a deliveryman not found', async () => {
    const deliveryman = makeDeliveryman()

    const result = await sut.execute({
      name: deliveryman.name,
      cpf: deliveryman.cpf,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(DeliverymanNotFoundError)
  })
})
