import { Either, right } from '@/core/either'
import { DeliveryRepository } from '../repositories/delivery-repository'
import { Delivery } from '../../enterprise/entities/delivery'
import { Injectable } from '@nestjs/common'

interface FetchDeliveryByDeliverymanCpfUseCaseProps {
  cpf: string
}

type FetchDeliveryByDeliverymanCpfUseCaseResponse = Either<
  null,
  {
    delivery: Delivery[]
  }
>

@Injectable()
export class FetchDeliveryByDeliverymanCpfUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  public async execute({
    cpf,
  }: FetchDeliveryByDeliverymanCpfUseCaseProps): Promise<FetchDeliveryByDeliverymanCpfUseCaseResponse> {
    const delivery = await this.deliveryRepository.findManyByCpfDeliveryman(cpf)

    return right({
      delivery,
    })
  }
}
