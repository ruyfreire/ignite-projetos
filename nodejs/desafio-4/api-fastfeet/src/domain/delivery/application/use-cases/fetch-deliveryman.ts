import { Either, right } from '@/core/either'
import { DeliverymanRepository } from '../repositories/deliveryman-repository'
import { Deliveryman } from '../../enterprise/entities/deliveryman'

interface FetchDeliverymanUseCaseProps {
  cpf?: string
}

type FetchDeliverymanUseCaseResponse = Either<
  Error,
  {
    deliveryman: Deliveryman[]
  }
>

export class FetchDeliverymanUseCase {
  constructor(private deliverymanRepository: DeliverymanRepository) {}

  public async execute({
    cpf,
  }: FetchDeliverymanUseCaseProps): Promise<FetchDeliverymanUseCaseResponse> {
    let deliveryman: Deliveryman[] = []

    if (cpf) {
      const deliverymanFound = await this.deliverymanRepository.findByCpf(cpf)

      deliveryman = deliverymanFound ? [deliverymanFound] : []
    } else {
      deliveryman = await this.deliverymanRepository.findMany()
    }

    return right({
      deliveryman,
    })
  }
}
