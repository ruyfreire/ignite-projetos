import { Either, right } from '@/core/either'
import { DeliveryRepository } from '../repositories/delivery-repository'
import { Delivery } from '../../enterprise/entities/delivery'
import { Injectable } from '@nestjs/common'

type FetchDeliveryUseCaseResponse = Either<
  {
    delivery: Delivery[]
  },
  {
    delivery: Delivery[]
  }
>

@Injectable()
export class FetchDeliveryUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  public async execute(): Promise<FetchDeliveryUseCaseResponse> {
    const delivery = await this.deliveryRepository.findMany()

    return right({
      delivery,
    })
  }
}
