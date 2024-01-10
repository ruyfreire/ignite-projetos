import { Either, left, right } from '@/core/either'
import { Deliveryman } from '../../enterprise/entities/deliveryman'
import { DeliveryNotFoundError } from './errors/delivery-not-found-error'
import { DeliverymanRepository } from '../repositories/deliveryman-repository'
import { HashGenerator } from '../cryptography/hash-generator'
import { DeliverymanNotFoundError } from './errors/deliveryman-not-found-error'

interface UpdateDeliverymanPasswordUseCaseProps {
  cpf: string
  password: string
}

type UpdateDeliverymanPasswordUseCaseResponse = Either<
  DeliveryNotFoundError,
  {
    deliveryman: Deliveryman
  }
>

export class UpdateDeliverymanPasswordUseCase {
  constructor(
    private deliverymanRepository: DeliverymanRepository,
    private hashGenerator: HashGenerator,
  ) {}

  public async execute({
    cpf,
    password,
  }: UpdateDeliverymanPasswordUseCaseProps): Promise<UpdateDeliverymanPasswordUseCaseResponse> {
    const deliveryman = await this.deliverymanRepository.findByCpf(cpf)

    if (!deliveryman) {
      return left(new DeliverymanNotFoundError())
    }

    deliveryman.password = await this.hashGenerator.hash(password)

    await this.deliverymanRepository.update(deliveryman)

    return right({
      deliveryman,
    })
  }
}
