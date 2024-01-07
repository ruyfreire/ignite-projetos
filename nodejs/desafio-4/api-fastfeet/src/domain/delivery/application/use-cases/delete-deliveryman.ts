import { Either, left, right } from '@/core/either'
import { DeliverymanRepository } from '../repositories/deliveryman-repository'
import { DeliverymanNotFoundError } from './errors/deliveryman-not-found-error'

interface DeleteDeliverymanUseCaseProps {
  cpf: string
}

type DeleteDeliverymanUseCaseResponse = Either<Error, null>

export class DeleteDeliverymanUseCase {
  constructor(private deliverymanRepository: DeliverymanRepository) {}

  public async execute({
    cpf,
  }: DeleteDeliverymanUseCaseProps): Promise<DeleteDeliverymanUseCaseResponse> {
    const deliveryman = await this.deliverymanRepository.findByCpf(cpf)

    if (!deliveryman) {
      return left(new DeliverymanNotFoundError())
    }

    await this.deliverymanRepository.delete(cpf)

    return right(null)
  }
}
