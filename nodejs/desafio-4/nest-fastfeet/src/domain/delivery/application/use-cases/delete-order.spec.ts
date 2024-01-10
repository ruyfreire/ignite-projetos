import { InMemoryOrderRepository } from 'tests/repositories/in-memory-order-repository'
import { DeleteOrderUseCase } from './delete-order'
import { makeOrder } from 'tests/factories/make-order'
import { OrderNotFoundError } from './errors/order-not-found-error'

let sut: DeleteOrderUseCase
let inMemoryOrderRepository: InMemoryOrderRepository

describe('Delete Order use case', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    sut = new DeleteOrderUseCase(inMemoryOrderRepository)
  })

  it('should delete a order', async () => {
    const order = makeOrder()
    inMemoryOrderRepository.items.push(order)

    const result = await sut.execute({
      id: order.id,
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryOrderRepository.items).toHaveLength(0)
  })

  it('should not delete a order not found', async () => {
    const order = makeOrder()

    const result = await sut.execute({
      id: order.id,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(OrderNotFoundError)
  })
})
