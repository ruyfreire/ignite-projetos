import { Either, left, right } from '@/core/either'
import { Admin } from '../../enterprise/entities/admin'
import { AdminRepository } from '../repositories/admin-repository'
import { AdminNotFoundError } from './errors/admin-not-found-error'
import { HashGenerator } from '../cryptography/hash-generator'
import { Injectable } from '@nestjs/common'

interface UpdatePasswordAdminUseCaseProps {
  cpf: string
  password: string
}

type UpdatePasswordAdminUseCaseResponse = Either<
  AdminNotFoundError,
  {
    admin: Admin
  }
>

@Injectable()
export class UpdatePasswordAdminUseCase {
  constructor(
    private adminRepository: AdminRepository,
    private hashGenerator: HashGenerator,
  ) {}

  public async execute({
    cpf,
    password,
  }: UpdatePasswordAdminUseCaseProps): Promise<UpdatePasswordAdminUseCaseResponse> {
    const admin = await this.adminRepository.findByCpf(cpf)

    if (!admin) {
      return left(new AdminNotFoundError())
    }

    admin.password = await this.hashGenerator.hash(password)

    await this.adminRepository.update(admin)

    return right({
      admin,
    })
  }
}
