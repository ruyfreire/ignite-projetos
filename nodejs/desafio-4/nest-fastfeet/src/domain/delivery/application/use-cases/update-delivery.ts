import { Either, left, right } from '@/core/either'
import { Delivery } from '../../enterprise/entities/delivery'
import { DeliveryRepository } from '../repositories/delivery-repository'
import { OrderRepository } from '../repositories/order-repository'
import { OrderNotFoundError } from './errors/order-not-found-error'
import { ReceiverNotFoundError } from './errors/receiver-not-found-error'
import { DeliveryAlreadyExistsError } from './errors/delivery-already-exists-error'
import { Injectable } from '@nestjs/common'
import { DeliverymanRepository } from '../repositories/deliveryman-repository'
import { DeliverymanNotFoundError } from './errors/deliveryman-not-found-error'
import { DeliveryNotFoundError } from './errors/delivery-not-found-error'
import { OrderDeliveredProps } from '../../enterprise/entities/value-objects/order-delivered'

interface UpdateDeliveryUseCaseProps {
  orderId?: string
  deliveryId: string
  deliverymanCpf?: string | null
  availableAt?: Date | null
  deliveredAt?: Date | null
  deliveredPhotoId?: string | null
  returnedAt?: Date | null
}

type UpdateDeliveryUseCaseResponse = Either<
  OrderNotFoundError | ReceiverNotFoundError | DeliveryAlreadyExistsError,
  {
    delivery: Delivery
  }
>

@Injectable()
export class UpdateDeliveryUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private deliveryRepository: DeliveryRepository,
    private deliverymanRepository: DeliverymanRepository,
  ) {}

  public async execute({
    deliveryId,
    orderId,
    deliverymanCpf,
    availableAt,
    deliveredAt,
    deliveredPhotoId,
    returnedAt,
  }: UpdateDeliveryUseCaseProps): Promise<UpdateDeliveryUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(deliveryId)

    if (!delivery) {
      return left(new DeliveryNotFoundError())
    }

    if (orderId) {
      const order = await this.orderRepository.findById(orderId)

      if (order) {
        delivery.order = order
      } else {
        return left(new OrderNotFoundError())
      }
    }

    if (deliverymanCpf) {
      const deliveryman =
        await this.deliverymanRepository.findByCpf(deliverymanCpf)

      if (deliveryman) {
        delivery.deliveryman = deliveryman
      } else {
        return left(new DeliverymanNotFoundError())
      }
    }

    if (availableAt) {
      delivery.setToAvailable(availableAt)
    } else if (availableAt === null) {
      delivery.revertAvailable()
    }

    if (returnedAt) {
      delivery.setToReturned(returnedAt)
    } else if (returnedAt === null) {
      delivery.revertReturned()
    }

    if (deliveredPhotoId === null) {
      delivery.revertDelivered()
    } else {
      if (delivery.delivered) {
        const delivered: OrderDeliveredProps = {
          photoId: delivery.delivered.photoId,
          deliveredAt: delivery.delivered.deliveredAt,
        }

        if (deliveredPhotoId || deliveredPhotoId === null) {
          delivered.photoId = deliveredPhotoId
        }

        if (deliveredAt || deliveredAt === null) {
          delivered.deliveredAt = deliveredAt
        }

        delivery.setToDelivered(delivered)
      }
    }

    await this.deliveryRepository.update(delivery)

    return right({
      delivery,
    })
  }
}
