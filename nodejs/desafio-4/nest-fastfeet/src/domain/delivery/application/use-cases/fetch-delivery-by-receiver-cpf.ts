import { Either, right } from '@/core/either'
import { DeliveryRepository } from '../repositories/delivery-repository'
import { Delivery } from '../../enterprise/entities/delivery'
import { Injectable } from '@nestjs/common'

interface FetchDeliveryByReceiverCpfUseCaseProps {
  cpf: string
}

type FetchDeliveryByReceiverCpfUseCaseResponse = Either<
  null,
  {
    delivery: Delivery[]
  }
>

@Injectable()
export class FetchDeliveryByReceiverCpfUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  public async execute({
    cpf,
  }: FetchDeliveryByReceiverCpfUseCaseProps): Promise<FetchDeliveryByReceiverCpfUseCaseResponse> {
    const delivery = await this.deliveryRepository.findManyByCpfReceiver(cpf)

    return right({
      delivery,
    })
  }
}
