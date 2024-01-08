import { Either, right } from '@/core/either'
import { DeliveryRepository } from '../repositories/delivery-repository'
import { Delivery } from '../../enterprise/entities/delivery'

interface FetchDeliveryByReceiverCpfUseCaseProps {
  cpf: string
}

type FetchDeliveryByReceiverCpfUseCaseResponse = Either<
  null,
  {
    delivery: Delivery[]
  }
>

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
