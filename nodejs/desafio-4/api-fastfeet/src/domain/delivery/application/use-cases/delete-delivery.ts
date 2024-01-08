import { Either, left, right } from '@/core/either'
import { DeliveryRepository } from '../repositories/delivery-repository'
import { DeliveryNotFoundError } from './errors/delivery-not-found-error'

interface DeleteDeliveryUseCaseProps {
  id: string
}

type DeleteDeliveryUseCaseResponse = Either<DeliveryNotFoundError, null>

export class DeleteDeliveryUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  public async execute({
    id,
  }: DeleteDeliveryUseCaseProps): Promise<DeleteDeliveryUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(id)

    if (!delivery) {
      return left(new DeliveryNotFoundError())
    }

    await this.deliveryRepository.delete(id)

    return right(null)
  }
}
