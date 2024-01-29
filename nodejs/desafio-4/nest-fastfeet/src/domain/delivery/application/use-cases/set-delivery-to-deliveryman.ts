import { Either, left, right } from '@/core/either'
import { Delivery } from '../../enterprise/entities/delivery'
import { DeliveryRepository } from '../repositories/delivery-repository'
import { DeliveryNotFoundError } from './errors/delivery-not-found-error'
import { DeliverymanRepository } from '../repositories/deliveryman-repository'
import { DeliverymanNotFoundError } from './errors/deliveryman-not-found-error'
import { Injectable } from '@nestjs/common'
import { DeliveryNotAvailableError } from './errors/delivery-not-available-error'

interface SetDeliveryToDeliverymanUseCaseProps {
  id: string
  deliverymanId: string
}

type SetDeliveryToDeliverymanUseCaseResponse = Either<
  DeliveryNotFoundError | DeliveryNotAvailableError | DeliverymanNotFoundError,
  {
    delivery: Delivery
  }
>

@Injectable()
export class SetDeliveryToDeliverymanUseCase {
  constructor(
    private deliveryRepository: DeliveryRepository,
    private deliverymanRepository: DeliverymanRepository,
  ) {}

  public async execute({
    id,
    deliverymanId,
  }: SetDeliveryToDeliverymanUseCaseProps): Promise<SetDeliveryToDeliverymanUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(id)

    if (!delivery) {
      return left(new DeliveryNotFoundError())
    }

    if (!delivery.availableAt) {
      return left(new DeliveryNotAvailableError())
    }

    const deliveryman = await this.deliverymanRepository.findById(deliverymanId)

    if (!deliveryman) {
      return left(new DeliverymanNotFoundError())
    }

    delivery.setToDeliveryman(deliveryman)

    await this.deliveryRepository.update(delivery)

    return right({
      delivery,
    })
  }
}
