import { InMemoryDeliveryRepository } from 'tests/repositories/in-memory-delivery-repository'
import { makeDelivery } from 'tests/factories/make-delivery'
import { SetDeliveryToDeliveredUseCase } from './set-delivery-to-delivered'
import { DeliveryNotFoundError } from './errors/delivery-not-found-error'
import { FakeLocalization } from 'tests/geolocation/localization'
import { makeDeliveryman } from 'tests/factories/make-deliveryman'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { InMemoryPhotosRepository } from 'tests/repositories/in-memory-photos-repository'
import { makePhoto } from 'tests/factories/make-photo'

let sut: SetDeliveryToDeliveredUseCase
let fakeLocalization: FakeLocalization
let inMemoryDeliveryRepository: InMemoryDeliveryRepository
let inMemoryPhotosRepository: InMemoryPhotosRepository

describe('Set Delivery to delivered use case', () => {
  beforeEach(() => {
    fakeLocalization = new FakeLocalization()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      fakeLocalization,
    )
    inMemoryPhotosRepository = new InMemoryPhotosRepository()
    sut = new SetDeliveryToDeliveredUseCase(
      inMemoryDeliveryRepository,
      inMemoryPhotosRepository,
    )
  })

  it('should set delivery to delivered', async () => {
    const deliveryman = makeDeliveryman()
    const delivery = makeDelivery({
      deliveryman,
      status: 'ASSIGNED',
    })
    inMemoryDeliveryRepository.items.push(delivery)
    const photo = makePhoto()
    inMemoryPhotosRepository.items.push(photo)

    const result = await sut.execute({
      id: delivery.id,
      deliverymanId: deliveryman.id,
      photoId: photo.id,
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryDeliveryRepository.items[0]).toEqual(
      expect.objectContaining({
        id: delivery.id,
        status: 'DELIVERED',
        delivered: expect.objectContaining({
          deliveredAt: expect.any(Date),
          photoId: photo.id,
        }),
      }),
    )
  })

  it('should return error delivery not found', async () => {
    const result = await sut.execute({
      id: '1',
      deliverymanId: '11111111111',
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
    const photo = makePhoto()
    inMemoryPhotosRepository.items.push(photo)

    const result = await sut.execute({
      id: delivery.id,
      deliverymanId: '11111111111',
      photoId: photo.id,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
