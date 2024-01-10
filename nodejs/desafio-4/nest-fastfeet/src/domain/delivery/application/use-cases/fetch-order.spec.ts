import { InMemoryOrderRepository } from 'tests/repositories/in-memory-order-repository'
import { FetchOrderUseCase } from './fetch-order'
import { makeOrder } from 'tests/factories/make-order'

let sut: FetchOrderUseCase
let inMemoryOrderRepository: InMemoryOrderRepository

describe('Fetch Order use case', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    sut = new FetchOrderUseCase(inMemoryOrderRepository)
  })

  it('should fetch all order', async () => {
    const order1 = makeOrder()
    const order2 = makeOrder()
    inMemoryOrderRepository.items.push(order1)
    inMemoryOrderRepository.items.push(order2)

    const result = await sut.execute({})

    const order = result.isRight() ? result.value.order : []

    expect(result.isRight()).toBeTruthy()
    expect(order.length).toBe(2)
    expect(result.value).toEqual({
      order: expect.arrayContaining([
        expect.objectContaining({
          title: order1.title,
        }),
        expect.objectContaining({
          title: order2.title,
        }),
      ]),
    })
  })

  it('should fetch unique order', async () => {
    const order1 = makeOrder()
    const order2 = makeOrder()
    inMemoryOrderRepository.items.push(order1)
    inMemoryOrderRepository.items.push(order2)

    const result = await sut.execute({
      title: order1.title,
    })

    const order = result.isRight() ? result.value.order : []

    expect(result.isRight()).toBeTruthy()
    expect(order.length).toBe(1)
    expect(result.value).toEqual({
      order: expect.arrayContaining([
        expect.objectContaining({
          title: order1.title,
        }),
      ]),
    })
  })
})
