import { Either, left, right } from '@/core/either'
import { Delivery } from '../../enterprise/entities/delivery'
import { DeliveryRepository } from '../repositories/delivery-repository'
import { DeliveryNotFoundError } from './errors/delivery-not-found-error'

interface SetDeliveryToDeliveredUseCaseProps {
  id: string
}

type SetDeliveryToDeliveredUseCaseResponse = Either<
  DeliveryNotFoundError,
  {
    delivery: Delivery
  }
>

export class SetDeliveryToDeliveredUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  public async execute({
    id,
  }: SetDeliveryToDeliveredUseCaseProps): Promise<SetDeliveryToDeliveredUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(id)

    if (!delivery) {
      return left(new DeliveryNotFoundError())
    }

    delivery.setToDelivered()

    await this.deliveryRepository.update(delivery)

    return right({
      delivery,
    })
  }
}
