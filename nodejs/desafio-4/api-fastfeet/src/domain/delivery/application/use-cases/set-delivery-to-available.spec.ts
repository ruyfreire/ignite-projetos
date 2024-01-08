import { InMemoryDeliveryRepository } from 'tests/repositories/in-memory-delivery-repository'
import { makeDelivery } from 'tests/factories/make-delivery'
import { SetDeliveryToAvailableUseCase } from './set-delivery-to-available'
import { DeliveryNotFoundError } from './errors/delivery-not-found-error'

let sut: SetDeliveryToAvailableUseCase
let inMemoryDeliveryRepository: InMemoryDeliveryRepository

describe('Set Delivery to available use case', () => {
  beforeEach(() => {
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository()
    sut = new SetDeliveryToAvailableUseCase(inMemoryDeliveryRepository)
  })

  it('should set delivery to available', async () => {
    const delivery = makeDelivery()
    inMemoryDeliveryRepository.items.push(delivery)

    const result = await sut.execute({
      id: delivery.id,
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryDeliveryRepository.items[0]).toEqual(
      expect.objectContaining({
        id: delivery.id,
        availableAt: expect.any(Date),
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
