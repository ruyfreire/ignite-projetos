import { Either, left, right } from '@/core/either'
import { Deliveryman } from '../../enterprise/entities/deliveryman'
import { DeliverymanRepository } from '../repositories/deliveryman-repository'
import { DeliverymanNotFoundError } from './errors/deliveryman-not-found-error'

interface UpdateDeliverymanUseCaseProps {
  name: string
  cpf: string
}

type UpdateDeliverymanUseCaseResponse = Either<
  Error,
  {
    deliveryman: Deliveryman
  }
>

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
