import { Either, left, right } from '@/core/either'
import { Encrypter } from '../cryptography/encrypter'
import { UserRepository } from '../repository/user-repository'

export interface AuthenticateUseCaseProps {
  cpf: string
  password: string
}

type AuthenticateUseCaseResponse = Either<
  Error,
  {
    accessToken: string
  }
>

export class AuthenticateUseCase {
  constructor(
    private userRepository: UserRepository,
    private encrypter: Encrypter,
  ) {}

  public async execute({
    cpf,
    password,
  }: AuthenticateUseCaseProps): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByCpf(cpf)

    if (!user || user.password !== password) {
      return left(new Error('Invalid credentials'))
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id,
    })

    return right({ accessToken })
  }
}
