import { Either, left, right } from '@/core/either'
import { Delivery } from '../../enterprise/entities/delivery'
import { DeliveryRepository } from '../repositories/delivery-repository'
import { DeliveryNotFoundError } from './errors/delivery-not-found-error'
import { DeliverymanRepository } from '../repositories/deliveryman-repository'
import { DeliverymanNotFoundError } from './errors/deliveryman-not-found-error'

interface SetDeliveryToDeliverymanUseCaseProps {
  id: string
  deliveryManCpf: string
}

type SetDeliveryToDeliverymanUseCaseResponse = Either<
  DeliveryNotFoundError,
  {
    delivery: Delivery
  }
>

export class SetDeliveryToDeliverymanUseCase {
  constructor(
    private deliveryRepository: DeliveryRepository,
    private deliverymanRepository: DeliverymanRepository,
  ) {}

  public async execute({
    id,
    deliveryManCpf,
  }: SetDeliveryToDeliverymanUseCaseProps): Promise<SetDeliveryToDeliverymanUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(id)

    if (!delivery) {
      return left(new DeliveryNotFoundError())
    }

    const deliveryman =
      await this.deliverymanRepository.findByCpf(deliveryManCpf)

    if (!deliveryman) {
      return left(new DeliverymanNotFoundError())
    }

    delivery.deliveryman = deliveryman

    await this.deliveryRepository.update(delivery)

    return right({
      delivery,
    })
  }
}
