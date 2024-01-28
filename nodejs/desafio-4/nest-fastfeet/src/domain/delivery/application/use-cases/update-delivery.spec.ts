import { InMemoryDeliveryRepository } from 'tests/repositories/in-memory-delivery-repository'
import { makeDelivery } from 'tests/factories/make-delivery'
import { DeliveryNotFoundError } from './errors/delivery-not-found-error'
import { FakeLocalization } from 'tests/geolocation/localization'
import { OrderDelivered } from '../../enterprise/entities/value-objects/order-delivered'
import { makeOrder } from 'tests/factories/make-order'
import { makeDeliveryman } from 'tests/factories/make-deliveryman'
import { UpdateDeliveryUseCase } from './update-delivery'
import { InMemoryOrderRepository } from 'tests/repositories/in-memory-order-repository'
import { InMemoryDeliverymanRepository } from 'tests/repositories/in-memory-deliveryman-repository'
import { OrderNotFoundError } from './errors/order-not-found-error'
import { DeliverymanNotFoundError } from './errors/deliveryman-not-found-error'

let sut: UpdateDeliveryUseCase
let fakeLocalization: FakeLocalization
let inMemoryDeliveryRepository: InMemoryDeliveryRepository
let inMemoryDeliverymanRepository: InMemoryDeliverymanRepository
let inMemoryOrderRepository: InMemoryOrderRepository

describe('Update delivery use case', () => {
  beforeEach(() => {
    fakeLocalization = new FakeLocalization()
    inMemoryDeliverymanRepository = new InMemoryDeliverymanRepository()
    inMemoryOrderRepository = new InMemoryOrderRepository()
    inMemoryDeliveryRepository = new InMemoryDeliveryRepository(
      fakeLocalization,
    )
    sut = new UpdateDeliveryUseCase(
      inMemoryOrderRepository,
      inMemoryDeliveryRepository,
      inMemoryDeliverymanRepository,
    )
  })

  it('should update delivery', async () => {
    const date = new Date('2024-01-01 00:00:00')

    const order1 = makeOrder()
    const order2 = makeOrder()
    inMemoryOrderRepository.items.push(order1)
    inMemoryOrderRepository.items.push(order2)

    const deliveryman1 = makeDeliveryman()
    const deliveryman2 = makeDeliveryman()
    inMemoryDeliverymanRepository.items.push(deliveryman1)
    inMemoryDeliverymanRepository.items.push(deliveryman2)

    const delivery = makeDelivery({
      availableAt: date,
      returnedAt: date,
      delivered: new OrderDelivered({ deliveredAt: date, photoId: '1' }),
      order: order1,
      deliveryman: deliveryman1,
    })
    inMemoryDeliveryRepository.items.push(delivery)

    const result = await sut.execute({
      deliveryId: delivery.id,
      orderId: order2.id,
      deliverymanCpf: deliveryman2.cpf,
      availableAt: null,
      deliveredAt: null,
      returnedAt: null,
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryDeliveryRepository.items[0]).toMatchObject({
      id: delivery.id,
      order: expect.objectContaining({ id: order2.id }),
      deliveryman: expect.objectContaining({ cpf: deliveryman2.cpf }),
      availableAt: null,
      delivered: null,
      returnedAt: null,
      status: null,
    })
  })

  it('should return error delivery not found', async () => {
    const result = await sut.execute({
      deliveryId: '1',
      orderId: '1',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(DeliveryNotFoundError)
  })

  it('should return error order not found', async () => {
    const delivery = makeDelivery()
    inMemoryDeliveryRepository.items.push(delivery)

    const result = await sut.execute({
      deliveryId: delivery.id,
      orderId: '1',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(OrderNotFoundError)
  })

  it('should return error deliveryman not found', async () => {
    const order = makeOrder()
    inMemoryOrderRepository.items.push(order)

    const delivery = makeDelivery()
    inMemoryDeliveryRepository.items.push(delivery)

    const result = await sut.execute({
      deliveryId: delivery.id,
      orderId: order.id,
      deliverymanCpf: '12345678900',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(DeliverymanNotFoundError)
  })
})
