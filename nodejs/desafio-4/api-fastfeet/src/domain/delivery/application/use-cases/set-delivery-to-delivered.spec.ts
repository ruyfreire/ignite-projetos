import { InMemoryDeliveryRepository } from 'tests/repositories/in-memory-delivery-repository'
import { makeDelivery } from 'tests/factories/make-delivery'
import { SetDeliveryToDeliveredUseCase } from './set-delivery-to-delivered'
import { DeliveryNotFoundError } from './errors/delivery-not-found-error'

let sut: SetDeliveryToDeliveredUseCase
let inMemoryDeliveryRepository: InMemoryDeliveryRepository

describe('Set Delivery to delivered use case', () => {
  beforeEach(() => {
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository()
    sut = new SetDeliveryToDeliveredUseCase(inMemoryDeliveryRepository)
  })

  it('should set delivery to delivered', async () => {
    const delivery = makeDelivery()
    inMemoryDeliveryRepository.items.push(delivery)

    const result = await sut.execute({
      id: delivery.id,
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryDeliveryRepository.items[0]).toEqual(
      expect.objectContaining({
        id: delivery.id,
        deliveredAt: expect.any(Date),
      }),
    )
  })

  it('should return error delivery not found', async () => {
    const result = await sut.execute({
      id: '1',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(DeliveryNotFoundError)
  })
})
