import { Either, left, right } from '@/core/either'
import { Deliveryman } from '../../enterprise/entities/deliveryman'
import { DeliverymanRepository } from '../repositories/deliveryman-repository'
import { DeliverymanNotFoundError } from './errors/deliveryman-not-found-error'
import { Injectable } from '@nestjs/common'

interface UpdateDeliverymanUseCaseProps {
  name: string
  cpf: string
}

type UpdateDeliverymanUseCaseResponse = Either<
  DeliverymanNotFoundError,
  {
    deliveryman: Deliveryman
  }
>

@Injectable()
export class UpdateDeliverymanUseCase {
  constructor(private deliverymanRepository: DeliverymanRepository) {}

  public async execute({
    name,
    cpf,
  }: UpdateDeliverymanUseCaseProps): Promise<UpdateDeliverymanUseCaseResponse> {
    const deliveryman = await this.deliverymanRepository.findByCpf(cpf)

    if (!deliveryman) {
      return left(new DeliverymanNotFoundError())
    }

    deliveryman.name = name

    await this.deliverymanRepository.update(deliveryman)

    return right({
      deliveryman,
    })
  }
}
