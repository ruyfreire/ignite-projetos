import { Either, right } from '@/core/either'
import { Delivery } from '../../enterprise/entities/delivery'
import { DeliveryRepository } from '../repositories/delivery-repository'
import { Injectable } from '@nestjs/common'

interface FetchNearbyDeliveryUseCaseProps {
  latitude: number
  longitude: number
}

type FetchNearbyDeliveryUseCaseResponse = Either<
  { delivery: Delivery[] },
  { delivery: Delivery[] }
>

@Injectable()
export class FetchNearbyDeliveryUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    latitude,
    longitude,
  }: FetchNearbyDeliveryUseCaseProps): Promise<FetchNearbyDeliveryUseCaseResponse> {
    const delivery = await this.deliveryRepository.findNearbyDelivery({
      latitude,
      longitude,
    })

    return right({
      delivery,
    })
  }
}
