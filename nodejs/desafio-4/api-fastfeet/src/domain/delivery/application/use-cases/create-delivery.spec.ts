import { InMemoryDeliveryRepository } from 'tests/repositories/in-memory-delivery-repository'
import { CreateDeliveryUseCase } from './create-delivery'
import { makeDelivery } from 'tests/factories/make-delivery'
import { DeliveryAlreadyExistsError } from './errors/delivery-already-exists-error'
import { InMemoryOrderRepository } from 'tests/repositories/in-memory-order-repository'
import { InMemoryReceiverRepository } from 'tests/repositories/in-memory-receiver-repository'
import { makeOrder } from 'tests/factories/make-order'
import { makeReceiver } from 'tests/factories/make-receiver'
import { OrderNotFoundError } from './errors/order-not-found-error'
import { ReceiverNotFoundError } from './errors/receiver-not-found-error'
import { FakeLocalization } from 'tests/geolocation/localization'

let sut: CreateDeliveryUseCase
let inMemoryOrderRepository: InMemoryOrderRepository
let fakeLocalization: FakeLocalization
let inMemoryReceiverRepository: InMemoryReceiverRepository
let inMemoryDeliveryRepository: InMemoryDeliveryRepository

describe('Create Delivery use case', () => {
  beforeEach(() => {
    inMemoryOrderRepository = new InMemoryOrderRepository()
    inMemoryReceiverRepository = new InMemoryReceiverRepository()
    fakeLocalization = new FakeLocalization()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      fakeLocalization,
    )
    sut = new CreateDeliveryUseCase(
      inMemoryOrderRepository,
      inMemoryReceiverRepository,
      inMemoryDeliveryRepository,
    )
  })

  it('should create a delivery', async () => {
    const order = makeOrder()
    inMemoryOrderRepository.create(order)

    const receiver = makeReceiver()
    inMemoryReceiverRepository.create(receiver)

    const result = await sut.execute({
      orderId: order.id,
      receiverCpf: receiver.cpf,
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryDeliveryRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          receiver: expect.objectContaining({
            cpf: receiver.cpf,
          }),
          order: expect.objectContaining({
            id: order.id,
          }),
        }),
      ]),
    )
  })

  it('should not create a delivery with not found order', async () => {
    const receiver = makeReceiver()
    inMemoryReceiverRepository.create(receiver)

    const result = await sut.execute({
      orderId: '1',
      receiverCpf: receiver.cpf,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(OrderNotFoundError)
    expect(inMemoryDeliveryRepository.items).toHaveLength(0)
  })

  it('should not create a delivery with not found receiver', async () => {
    const order = makeOrder()
    inMemoryOrderRepository.create(order)

    const result = await sut.execute({
      orderId: order.id,
      receiverCpf: '11111111111',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ReceiverNotFoundError)
    expect(inMemoryDeliveryRepository.items).toHaveLength(0)
  })

  it('should not create a delivery with delivery already exists', async () => {
    const order = makeOrder()
    inMemoryOrderRepository.create(order)

    const receiver = makeReceiver()
    inMemoryReceiverRepository.create(receiver)

    const delivery = makeDelivery({
      order,
      receiver,
    })
    inMemoryDeliveryRepository.create(delivery)

    const result = await sut.execute({
      orderId: order.id,
      receiverCpf: receiver.cpf,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(DeliveryAlreadyExistsError)
    expect(inMemoryDeliveryRepository.items).toHaveLength(1)
  })
})
