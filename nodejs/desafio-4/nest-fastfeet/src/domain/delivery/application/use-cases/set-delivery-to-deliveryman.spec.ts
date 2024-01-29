import { InMemoryDeliveryRepository } from 'tests/repositories/in-memory-delivery-repository'
import { makeDelivery } from 'tests/factories/make-delivery'
import { SetDeliveryToDeliverymanUseCase } from './set-delivery-to-deliveryman'
import { InMemoryDeliverymanRepository } from 'tests/repositories/in-memory-deliveryman-repository'
import { makeDeliveryman } from 'tests/factories/make-deliveryman'
import { DeliverymanNotFoundError } from './errors/deliveryman-not-found-error'
import { DeliveryNotFoundError } from './errors/delivery-not-found-error'
import { FakeLocalization } from 'tests/geolocation/localization'
import { DeliveryNotAvailableError } from './errors/delivery-not-available-error'

let sut: SetDeliveryToDeliverymanUseCase
let fakeLocalization: FakeLocalization
let inMemoryDeliveryRepository: InMemoryDeliveryRepository
let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository

describe('Set Delivery to deliveryman use case', () => {
  beforeEach(() => {
    fakeLocalization = new FakeLocalization()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      fakeLocalization,
    )
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    sut = new SetDeliveryToDeliverymanUseCase(
      inMemoryDeliveryRepository,
      inMemoryDeliverymanRepository,
    )
  })

  it('should set delivery to deliveryman', async () => {
    const deliveryman = makeDeliveryman()
    inMemoryDeliverymanRepository.items.push(deliveryman)

    const delivery = makeDelivery({
      availableAt: new Date(),
    })
    inMemoryDeliveryRepository.items.push(delivery)

    const result = await sut.execute({
      deliverymanId: deliveryman.id,
      id: delivery.id,
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryDeliveryRepository.items[0]).toEqual(
      expect.objectContaining({
        deliveryman: expect.objectContaining({
          cpf: deliveryman.cpf,
        }),
      }),
    )
  })

  it('should not update delivery before available status', async () => {
    const deliveryman = makeDeliveryman()
    inMemoryDeliverymanRepository.items.push(deliveryman)

    const delivery = makeDelivery()
    inMemoryDeliveryRepository.items.push(delivery)

    const result = await sut.execute({
      deliverymanId: deliveryman.id,
      id: delivery.id,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(DeliveryNotAvailableError)
  })

  it('should not update delivery on deliveryman not found', async () => {
    const delivery = makeDelivery({
      availableAt: new Date(),
    })
    inMemoryDeliveryRepository.items.push(delivery)

    const result = await sut.execute({
      deliverymanId: '11111111111',
      id: delivery.id,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(DeliverymanNotFoundError)
  })

  it('should return error delivery not found', async () => {
    const result = await sut.execute({
      id: '1',
      deliverymanId: '11111111111',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(DeliveryNotFoundError)
  })
})
