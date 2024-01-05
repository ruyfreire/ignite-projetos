import { Admin } from '../../enterprise/entities/admin'
import { DeliveryMan } from '../../enterprise/entities/deliveryman'

export type UserTypes = Admin | DeliveryMan

export abstract class UserRepository {
  abstract findByCpf(cpf: string): Promise<UserTypes | null>
  abstract create(user: UserTypes): Promise<UserTypes>
}
