import { InMemoryDeliveryRepository } from 'tests/repositories/in-memory-delivery-repository'
import { makeDelivery } from 'tests/factories/make-delivery'
import { FetchDeliveryByDeliverymanCpfUseCase } from './fetch-delivery-by-deliveryman-cpf'
import { makeDeliveryman } from 'tests/factories/make-deliveryman'
import { FakeLocalization } from 'tests/geolocation/localization'

let sut: FetchDeliveryByDeliverymanCpfUseCase
let localization: FakeLocalization
let inMemoryDeliveryRepository: InMemoryDeliveryRepository

describe('Fetch Delivery by deliveryman cpf use case', () => {
  beforeEach(() => {
    localization = new FakeLocalization()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(localization)
    sut = new FetchDeliveryByDeliverymanCpfUseCase(inMemoryDeliveryRepository)
  })

  it('should fetch delivery by deliveryman cpf', async () => {
    const deliveryman1 = makeDeliveryman()
    const delivery1 = makeDelivery({
      deliveryman: deliveryman1,
    })

    const deliveryman2 = makeDeliveryman()
    const delivery2 = makeDelivery({
      deliveryman: deliveryman2,
    })

    inMemoryDeliveryRepository.items.push(delivery1)
    inMemoryDeliveryRepository.items.push(delivery2)

    const result = await sut.execute({
      cpf: deliveryman1.cpf,
    })

    const delivery = result.value?.delivery || []

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryDeliveryRepository.items).toHaveLength(2)
    expect(delivery).toHaveLength(1)
    expect(result.value).toEqual({
      delivery: expect.arrayContaining([
        expect.objectContaining({
          deliveryman: expect.objectContaining({
            cpf: deliveryman1.cpf,
          }),
        }),
      ]),
    })
  })
})
