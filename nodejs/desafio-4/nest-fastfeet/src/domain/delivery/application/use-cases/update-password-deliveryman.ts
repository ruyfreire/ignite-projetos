import { Either, left, right } from '@/core/either'
import { Deliveryman } from '../../enterprise/entities/deliveryman'
import { DeliverymanRepository } from '../repositories/deliveryman-repository'
import { DeliverymanNotFoundError } from './errors/deliveryman-not-found-error'
import { HashGenerator } from '../cryptography/hash-generator'
import { Injectable } from '@nestjs/common'

interface UpdatePasswordDeliverymanUseCaseProps {
  cpf: string
  password: string
}

type UpdatePasswordDeliverymanUseCaseResponse = Either<
  DeliverymanNotFoundError,
  {
    deliveryman: Deliveryman
  }
>

@Injectable()
export class UpdatePasswordDeliverymanUseCase {
  constructor(
    private deliverymanRepository: DeliverymanRepository,
    private hashGenerator: HashGenerator,
  ) {}

  public async execute({
    cpf,
    password,
  }: UpdatePasswordDeliverymanUseCaseProps): Promise<UpdatePasswordDeliverymanUseCaseResponse> {
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
