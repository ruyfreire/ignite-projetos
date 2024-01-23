import { InMemoryDeliveryRepository } from 'tests/repositories/in-memory-delivery-repository'
import { makeDelivery } from 'tests/factories/make-delivery'
import { FetchDeliveryUseCase } from './fetch-delivery'
import { FakeLocalization } from 'tests/geolocation/localization'

let sut: FetchDeliveryUseCase
let localization: FakeLocalization
let inMemoryDeliveryRepository: InMemoryDeliveryRepository

describe('Fetch Delivery use case', () => {
  beforeEach(() => {
    localization = new FakeLocalization()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(localization)
    sut = new FetchDeliveryUseCase(inMemoryDeliveryRepository)
  })

  it('should fetch all delivery', async () => {
    const delivery1 = makeDelivery()
    const delivery2 = makeDelivery()

    inMemoryDeliveryRepository.items.push(delivery1)
    inMemoryDeliveryRepository.items.push(delivery2)

    const result = await sut.execute()

    const delivery = result.value?.delivery || []

    expect(result.isRight()).toBeTruthy()
    expect(delivery.length).toBe(2)
  })
})
