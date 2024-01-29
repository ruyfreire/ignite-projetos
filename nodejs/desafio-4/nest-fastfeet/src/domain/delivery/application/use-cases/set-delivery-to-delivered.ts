import { Either, left, right } from '@/core/either'
import { Delivery } from '../../enterprise/entities/delivery'
import { DeliveryRepository } from '../repositories/delivery-repository'
import { DeliveryNotFoundError } from './errors/delivery-not-found-error'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { Injectable } from '@nestjs/common'
import { PhotosRepository } from '../repositories/photos-repository'
import { PhotoNotFoundError } from './errors/photo-not-found-error'

interface SetDeliveryToDeliveredUseCaseProps {
  id: string
  deliverymanId: string
  photoId: string
}

type SetDeliveryToDeliveredUseCaseResponse = Either<
  DeliveryNotFoundError | PhotoNotFoundError | NotAllowedError,
  {
    delivery: Delivery
  }
>

@Injectable()
export class SetDeliveryToDeliveredUseCase {
  constructor(
    private deliveryRepository: DeliveryRepository,
    private photoRepository: PhotosRepository,
  ) {}

  public async execute({
    id,
    deliverymanId,
    photoId,
  }: SetDeliveryToDeliveredUseCaseProps): Promise<SetDeliveryToDeliveredUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(id)

    if (!delivery) {
      return left(new DeliveryNotFoundError())
    }

    if (delivery.status !== 'ASSIGNED') {
      return left(new NotAllowedError())
    }

    if (delivery.deliveryman?.id !== deliverymanId) {
      return left(new NotAllowedError())
    }

    const photo = await this.photoRepository.findById(photoId)

    if (!photo) {
      return left(new PhotoNotFoundError())
    }

    delivery.setToDelivered({ photoId })

    await this.deliveryRepository.update(delivery)

    return right({
      delivery,
    })
  }
}
