import { Admin } from '../../enterprise/entities/admin'

export abstract class AdminRepository {
  abstract findByCpf(cpf: string): Promise<Admin | null>
  abstract create(admin: Admin): Promise<void>
  abstract update(admin: Admin): Promise<void>
  abstract delete(cpf: string): Promise<void>
}
