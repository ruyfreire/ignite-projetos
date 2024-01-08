import { Either, left, right } from '@/core/either'
import { Deliveryman } from '../../enterprise/entities/deliveryman'
import { DeliverymanRepository } from '../repositories/deliveryman-repository'
import { DeliverymanAlreadyExistsError } from './errors/deliveryman-already-exists-error'
import { HashGenerator } from '../cryptography/hash-generator'

interface CreateDeliverymanUseCaseProps {
  name: string
  cpf: string
  password: string
}

type CreateDeliverymanUseCaseResponse = Either<
  DeliverymanAlreadyExistsError,
  {
    deliveryman: Deliveryman
  }
>

export class CreateDeliverymanUseCase {
  constructor(
    private deliverymanRepository: DeliverymanRepository,
    private hashGenerator: HashGenerator,
  ) {}

  public async execute({
    name,
    cpf,
    password,
  }: CreateDeliverymanUseCaseProps): Promise<CreateDeliverymanUseCaseResponse> {
    const hasDeliveryman = await this.deliverymanRepository.findByCpf(cpf)

    if (hasDeliveryman) {
      return left(new DeliverymanAlreadyExistsError())
    }

    const deliveryman = new Deliveryman({
      name,
      cpf,
      password: await this.hashGenerator.hash(password),
    })

    await this.deliverymanRepository.create(deliveryman)

    return right({
      deliveryman,
    })
  }
}
