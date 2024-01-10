import { InMemoryDeliveryRepository } from 'tests/repositories/in-memory-delivery-repository'
import { makeDelivery } from 'tests/factories/make-delivery'
import { makeReceiver } from 'tests/factories/make-receiver'
import { FakeLocalization } from 'tests/geolocation/localization'
import { Address } from '../../enterprise/entities/value-objects/address'
import { FetchNearbyDeliveryUseCase } from './fetch-nearby-delivery'

let sut: FetchNearbyDeliveryUseCase
let localization: FakeLocalization
let inMemoryDeliveryRepository: InMemoryDeliveryRepository

describe('Fetch Delivery by receiver cpf use case', () => {
  beforeEach(() => {
    localization = new FakeLocalization()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(localization)
    sut = new FetchNearbyDeliveryUseCase(inMemoryDeliveryRepository)
  })

  it('should fetch delivery nearby coordinate', async () => {
    const address1 = new Address({ number: 10, latitude: 0, longitude: 0 })
    const receiver1 = makeReceiver({ address: address1, name: 'Cliente 1' })
    const delivery1 = makeDelivery({ receiver: receiver1 })

    const address2 = new Address({
      number: 10,
      latitude: -15.3087096,
      longitude: -54.6961727,
    })
    const receiver2 = makeReceiver({ address: address2, name: 'Cliente 2' })
    const delivery2 = makeDelivery({ receiver: receiver2 })

    inMemoryDeliveryRepository.items.push(delivery1)
    inMemoryDeliveryRepository.items.push(delivery2)

    const result = await sut.execute({ latitude: 0, longitude: 0 })

    const delivery = result.value?.delivery || []

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryDeliveryRepository.items.length).toBe(2)
    expect(delivery.length).toBe(1)
    expect(result.value).toEqual({
      delivery: expect.arrayContaining([
        expect.objectContaining({
          receiver: expect.objectContaining({
            name: 'Cliente 1',
          }),
        }),
      ]),
    })
  })
})
