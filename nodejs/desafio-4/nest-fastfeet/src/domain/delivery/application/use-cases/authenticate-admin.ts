import { Either, left, right } from '@/core/either'
import { Encrypter } from '../cryptography/encrypter'
import { AdminRepository } from '../repositories/admin-repository'
import { HashComparer } from '../cryptography/hash-comparer'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { Injectable } from '@nestjs/common'

interface AuthenticateAdminUseCaseProps {
  cpf: string
  password: string
}

type AuthenticateAdminUseCaseResponse = Either<
  InvalidCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateAdminUseCase {
  constructor(
    private adminRepository: AdminRepository,
    private encrypter: Encrypter,
    private hashComparer: HashComparer,
  ) {}

  public async execute({
    cpf,
    password,
  }: AuthenticateAdminUseCaseProps): Promise<AuthenticateAdminUseCaseResponse> {
    const admin = await this.adminRepository.findByCpf(cpf)

    if (!admin) {
      return left(new InvalidCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      admin.password,
    )

    if (!isPasswordValid) {
      return left(new InvalidCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: admin.id,
      role: admin.role?.toString(),
    })

    return right({ accessToken })
  }
}
