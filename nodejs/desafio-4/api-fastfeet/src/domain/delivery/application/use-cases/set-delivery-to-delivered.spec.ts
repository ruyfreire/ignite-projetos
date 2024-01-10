import { InMemoryDeliveryRepository } from 'tests/repositories/in-memory-delivery-repository'
import { makeDelivery } from 'tests/factories/make-delivery'
import { SetDeliveryToDeliveredUseCase } from './set-delivery-to-delivered'
import { DeliveryNotFoundError } from './errors/delivery-not-found-error'
import { FakeLocalization } from 'tests/geolocation/localization'
import { makeDeliveryman } from 'tests/factories/make-deliveryman'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

let sut: SetDeliveryToDeliveredUseCase
let fakeLocalization: FakeLocalization
let inMemoryDeliveryRepository: InMemoryDeliveryRepository

describe('Set Delivery to delivered use case', () => {
  beforeEach(() => {
    fakeLocalization = new FakeLocalization()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      fakeLocalization,
    )
    sut = new SetDeliveryToDeliveredUseCase(inMemoryDeliveryRepository)
  })

  it('should set delivery to delivered', async () => {
    const deliveryman = makeDeliveryman()
    const delivery = makeDelivery({
      deliveryman,
    })
    inMemoryDeliveryRepository.items.push(delivery)

    const result = await sut.execute({
      id: delivery.id,
      deliverymanCpf: deliveryman.cpf,
      photoId: '1',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryDeliveryRepository.items[0]).toEqual(
      expect.objectContaining({
        id: delivery.id,
        status: 'DELIVERED',
        delivered: {
          props: {
            deliveredAt: expect.any(Date),
            photoId: '1',
          },
        },
      }),
    )
  })

  it('should return error delivery not found', async () => {
    const result = await sut.execute({
      id: '1',
      deliverymanCpf: '11111111111',
      photoId: '1',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(DeliveryNotFoundError)
  })

  it('should not be able to set delivered a delivery from another user', async () => {
    const deliveryman = makeDeliveryman()
    const delivery = makeDelivery({
      deliveryman,
    })
    inMemoryDeliveryRepository.items.push(delivery)

    const result = await sut.execute({
      id: delivery.id,
      deliverymanCpf: '11111111111',
      photoId: '1',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
