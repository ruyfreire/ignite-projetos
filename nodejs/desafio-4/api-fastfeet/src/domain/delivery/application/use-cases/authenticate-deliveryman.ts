import { Either, left, right } from '@/core/either'
import { Encrypter } from '../cryptography/encrypter'
import { DeliverymanRepository } from '../repositories/deliveryman-repository'
import { HashComparer } from '../cryptography/hash-comparer'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateDeliverymanUseCaseProps {
  cpf: string
  password: string
}

type AuthenticateDeliverymanUseCaseResponse = Either<
  Error,
  {
    accessToken: string
  }
>

export class AuthenticateDeliverymanUseCase {
  constructor(
    private deliverymanRepository: DeliverymanRepository,
    private encrypter: Encrypter,
    private hashComparer: HashComparer,
  ) {}

  public async execute({
    cpf,
    password,
  }: AuthenticateDeliverymanUseCaseProps): Promise<AuthenticateDeliverymanUseCaseResponse> {
    const deliveryman = await this.deliverymanRepository.findByCpf(cpf)

    if (!deliveryman) {
      return left(new InvalidCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      deliveryman.password,
    )

    if (!isPasswordValid) {
      return left(new InvalidCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: deliveryman.id,
    })

    return right({ accessToken })
  }
}
