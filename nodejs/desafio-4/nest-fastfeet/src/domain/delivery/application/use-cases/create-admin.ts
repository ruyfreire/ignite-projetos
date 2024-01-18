import { Either, left, right } from '@/core/either'
import { Admin } from '../../enterprise/entities/admin'
import { AdminRepository } from '../repositories/admin-repository'
import { AdminAlreadyExistsError } from './errors/admin-already-exists-error'
import { HashGenerator } from '../cryptography/hash-generator'
import { Injectable } from '@nestjs/common'

interface CreateAdminUseCaseProps {
  name: string
  cpf: string
  password: string
}

type CreateAdminUseCaseResponse = Either<
  AdminAlreadyExistsError,
  {
    admin: Admin
  }
>

@Injectable()
export class CreateAdminUseCase {
  constructor(
    private adminRepository: AdminRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    cpf,
    password,
  }: CreateAdminUseCaseProps): Promise<CreateAdminUseCaseResponse> {
    const hasAdmin = await this.adminRepository.findByCpf(cpf)

    if (hasAdmin) {
      return left(new AdminAlreadyExistsError())
    }

    const admin = new Admin({
      name,
      cpf,
      password: await this.hashGenerator.hash(password),
    })

    await this.adminRepository.create(admin)

    return right({
      admin,
    })
  }
}
