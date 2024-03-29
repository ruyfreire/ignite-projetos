import { InMemoryDeliveryRepository } from 'tests/repositories/in-memory-delivery-repository'
import { DeleteDeliveryUseCase } from './delete-delivery'
import { makeDelivery } from 'tests/factories/make-delivery'
import { DeliveryNotFoundError } from './errors/delivery-not-found-error'
import { FakeLocalization } from 'tests/geolocation/localization'

let sut: DeleteDeliveryUseCase
let fakeLocalization: FakeLocalization
let inMemoryDeliveryRepository: InMemoryDeliveryRepository

describe('Delete Delivery use case', () => {
  beforeEach(() => {
    fakeLocalization = new FakeLocalization()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      fakeLocalization,
    )
    sut = new DeleteDeliveryUseCase(inMemoryDeliveryRepository)
  })

  it('should delete a delivery', async () => {
    const delivery = makeDelivery()
    inMemoryDeliveryRepository.items.push(delivery)

    const result = await sut.execute({
      id: delivery.id,
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryDeliveryRepository.items).toHaveLength(0)
  })

  it('should not delete a delivery not found', async () => {
    const delivery = makeDelivery()

    const result = await sut.execute({
      id: delivery.id,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(DeliveryNotFoundError)
  })
})
