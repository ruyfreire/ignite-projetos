import { Either, left, right } from '@/core/either'
import { Delivery } from '../../enterprise/entities/delivery'
import { DeliveryRepository } from '../repositories/delivery-repository'
import { DeliveryNotFoundError } from './errors/delivery-not-found-error'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

interface SetDeliveryToDeliveredUseCaseProps {
  id: string
  deliverymanCpf: string
  photoId: string
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
    deliverymanCpf,
    photoId,
  }: SetDeliveryToDeliveredUseCaseProps): Promise<SetDeliveryToDeliveredUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(id)

    if (!delivery) {
      return left(new DeliveryNotFoundError())
    }

    if (delivery.deliveryman?.cpf !== deliverymanCpf) {
      return left(new NotAllowedError())
    }

    delivery.setToDelivered({ photoId })

    await this.deliveryRepository.update(delivery)

    return right({
      delivery,
    })
  }
}
