import { InMemoryDeliveryRepository } from 'tests/repositories/in-memory-delivery-repository'
import { makeDelivery } from 'tests/factories/make-delivery'
import { FetchDeliveryByReceiverCpfUseCase } from './fetch-delivery-by-receiver-cpf'
import { makeReceiver } from 'tests/factories/make-receiver'
import { FakeLocalization } from 'tests/geolocation/localization'

let sut: FetchDeliveryByReceiverCpfUseCase
let localization: FakeLocalization
let inMemoryDeliveryRepository: InMemoryDeliveryRepository

describe('Fetch Delivery by receiver cpf use case', () => {
  beforeEach(() => {
    localization = new FakeLocalization()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(localization)
    sut = new FetchDeliveryByReceiverCpfUseCase(inMemoryDeliveryRepository)
  })

  it('should fetch delivery by cpf', async () => {
    const receiver = makeReceiver()
    const delivery1 = makeDelivery({
      receiver,
    })
    const delivery2 = makeDelivery({
      receiver,
    })

    inMemoryDeliveryRepository.items.push(delivery1)
    inMemoryDeliveryRepository.items.push(delivery2)

    const result = await sut.execute({
      cpf: receiver.cpf,
    })

    const delivery = result.value?.delivery || []

    expect(result.isRight()).toBeTruthy()
    expect(delivery.length).toBe(2)
    expect(result.value).toEqual({
      delivery: expect.arrayContaining([
        expect.objectContaining({
          receiver: expect.objectContaining({
            cpf: receiver.cpf,
          }),
        }),
      ]),
    })
  })
})
