import { Either, right } from '@/core/either'
import { DeliverymanRepository } from '../repositories/deliveryman-repository'
import { Deliveryman } from '../../enterprise/entities/deliveryman'
import { Injectable } from '@nestjs/common'

interface FetchDeliverymanUseCaseProps {
  cpf?: string
}

type FetchDeliverymanUseCaseResponse = Either<
  {
    deliveryman: []
  },
  {
    deliveryman: Deliveryman[]
  }
>

@Injectable()
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
