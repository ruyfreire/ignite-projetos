import { Either, left, right } from '@/core/either'
import { Delivery } from '../../enterprise/entities/delivery'
import { DeliveryRepository } from '../repositories/delivery-repository'
import { DeliveryNotFoundError } from './errors/delivery-not-found-error'
import { Injectable } from '@nestjs/common'
import { DeliveryNotDeliveredError } from './errors/delivery-not-delivered-error'

interface SetDeliveryToReturnedUseCaseProps {
  id: string
}

type SetDeliveryToReturnedUseCaseResponse = Either<
  DeliveryNotFoundError | DeliveryNotDeliveredError,
  {
    delivery: Delivery
  }
>

@Injectable()
export class SetDeliveryToReturnedUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  public async execute({
    id,
  }: SetDeliveryToReturnedUseCaseProps): Promise<SetDeliveryToReturnedUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(id)

    if (!delivery) {
      return left(new DeliveryNotFoundError())
    }

    if (!delivery.delivered?.deliveredAt) {
      return left(new DeliveryNotDeliveredError())
    }

    delivery.setToReturned()

    await this.deliveryRepository.update(delivery)

    return right({
      delivery,
    })
  }
}
