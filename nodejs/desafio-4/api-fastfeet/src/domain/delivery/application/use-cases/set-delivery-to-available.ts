import { Either, left, right } from '@/core/either'
import { Delivery } from '../../enterprise/entities/delivery'
import { DeliveryRepository } from '../repositories/delivery-repository'
import { DeliveryNotFoundError } from './errors/delivery-not-found-error'

interface SetDeliveryToAvailableUseCaseProps {
  id: string
}

type SetDeliveryToAvailableUseCaseResponse = Either<
  DeliveryNotFoundError,
  {
    delivery: Delivery
  }
>

export class SetDeliveryToAvailableUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  public async execute({
    id,
  }: SetDeliveryToAvailableUseCaseProps): Promise<SetDeliveryToAvailableUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(id)

    if (!delivery) {
      return left(new DeliveryNotFoundError())
    }

    delivery.availableAt = new Date()

    await this.deliveryRepository.update(delivery)

    return right({
      delivery,
    })
  }
}
