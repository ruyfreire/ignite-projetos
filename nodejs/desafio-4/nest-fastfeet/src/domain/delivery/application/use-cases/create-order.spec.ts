import { InMemoryOrderRepository } from 'tests/repositories/in-memory-order-repository'
import { CreateOrderUseCase } from './create-order'
import { makeOrder } from 'tests/factories/make-order'
import { OrderAlreadyExistsError } from './errors/order-already-exists-error'

let sut: CreateOrderUseCase
let inMemoryOrderRepository: InMemoryOrderRepository

describe('Create Order use case', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    sut = new CreateOrderUseCase(inMemoryOrderRepository)
  })

  it('should create a order', async () => {
    const order = makeOrder()

    const result = await sut.execute({
      title: order.title,
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryOrderRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: order.title,
        }),
      ]),
    )
  })

  it('should not create a order with same title', async () => {
    const order = makeOrder()
    inMemoryOrderRepository.items.push(order)

    const result = await sut.execute({
      title: order.title,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(OrderAlreadyExistsError)
    expect(inMemoryOrderRepository.items).toHaveLength(1)
  })
})
