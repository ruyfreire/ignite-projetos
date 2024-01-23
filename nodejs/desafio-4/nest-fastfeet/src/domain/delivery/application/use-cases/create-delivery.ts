import { Either, left, right } from '@/core/either'
import { Delivery } from '../../enterprise/entities/delivery'
import { DeliveryRepository } from '../repositories/delivery-repository'
import { OrderRepository } from '../repositories/order-repository'
import { ReceiverRepository } from '../repositories/receiver-repository'
import { OrderNotFoundError } from './errors/order-not-found-error'
import { ReceiverNotFoundError } from './errors/receiver-not-found-error'
import { DeliveryAlreadyExistsError } from './errors/delivery-already-exists-error'
import { Injectable } from '@nestjs/common'

interface CreateDeliveryUseCaseProps {
  orderId: string
  receiverCpf: string
}

type CreateDeliveryUseCaseResponse = Either<
  OrderNotFoundError | ReceiverNotFoundError | DeliveryAlreadyExistsError,
  {
    delivery: Delivery
  }
>

@Injectable()
export class CreateDeliveryUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private receiverRepository: ReceiverRepository,
    private deliveryRepository: DeliveryRepository,
  ) {}

  public async execute({
    orderId,
    receiverCpf,
  }: CreateDeliveryUseCaseProps): Promise<CreateDeliveryUseCaseResponse> {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      return left(new OrderNotFoundError())
    }

    const receiver = await this.receiverRepository.findByCpf(receiverCpf)

    if (!receiver) {
      return left(new ReceiverNotFoundError())
    }

    const deliveries = await this.deliveryRepository.findManyByCpfReceiver(
      receiver.cpf,
    )
    const hasDelivery = deliveries.some(
      (delivery) => delivery.order.id === order.id,
    )

    if (hasDelivery) {
      return left(new DeliveryAlreadyExistsError())
    }

    const delivery = new Delivery({
      order,
      receiver,
    })

    await this.deliveryRepository.create(delivery)

    return right({
      delivery,
    })
  }
}
