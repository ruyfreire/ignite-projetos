import { InMemoryDeliveryRepository } from 'tests/repositories/in-memory-delivery-repository'
import { makeDelivery } from 'tests/factories/make-delivery'
import { SetDeliveryToReturnedUseCase } from './set-delivery-to-returned'
import { DeliveryNotFoundError } from './errors/delivery-not-found-error'
import { FakeLocalization } from 'tests/geolocation/localization'
import { OrderDelivered } from '../../enterprise/entities/value-objects/order-delivered'
import { DeliveryNotDeliveredError } from './errors/delivery-not-delivered-error'

let sut: SetDeliveryToReturnedUseCase
let fakeLocalization: FakeLocalization
let inMemoryDeliveryRepository: InMemoryDeliveryRepository

describe('Set Delivery to returned use case', () => {
  beforeEach(() => {
    fakeLocalization = new FakeLocalization()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      fakeLocalization,
    )
    sut = new SetDeliveryToReturnedUseCase(inMemoryDeliveryRepository)
  })

  it('should set delivery to returned', async () => {
    const delivery = makeDelivery({
      delivered: new OrderDelivered({ photoId: '1', deliveredAt: new Date() }),
    })
    inMemoryDeliveryRepository.items.push(delivery)

    const result = await sut.execute({
      id: delivery.id,
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryDeliveryRepository.items[0]).toEqual(
      expect.objectContaining({
        id: delivery.id,
        returnedAt: expect.any(Date),
        status: 'RETURNED',
      }),
    )
  })

  it('should return error delivery not delivered', async () => {
    const delivery = makeDelivery()
    inMemoryDeliveryRepository.items.push(delivery)
    const result = await sut.execute({
      id: delivery.id,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(DeliveryNotDeliveredError)
  })

  it('should return error delivery not found', async () => {
    const result = await sut.execute({
      id: '1',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(DeliveryNotFoundError)
  })
})
