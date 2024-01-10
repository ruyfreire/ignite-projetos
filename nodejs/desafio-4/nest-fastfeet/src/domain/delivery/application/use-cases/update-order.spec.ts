import { InMemoryOrderRepository } from 'tests/repositories/in-memory-order-repository'
import { UpdateOrderUseCase } from './update-order'
import { makeOrder } from 'tests/factories/make-order'
import { OrderNotFoundError } from './errors/order-not-found-error'

let sut: UpdateOrderUseCase
let inMemoryOrderRepository: InMemoryOrderRepository

describe('Update Order use case', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    sut = new UpdateOrderUseCase(inMemoryOrderRepository)
  })

  it('should update a order', async () => {
    const order = makeOrder()
    inMemoryOrderRepository.items.push(order)

    const result = await sut.execute({
      title: 'new title',
      id: order.id,
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryOrderRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'new title',
        }),
      ]),
    )
  })

  it('should not update a order not found', async () => {
    const order = makeOrder()

    const result = await sut.execute({
      title: order.title,
      id: order.id,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(OrderNotFoundError)
  })
})
