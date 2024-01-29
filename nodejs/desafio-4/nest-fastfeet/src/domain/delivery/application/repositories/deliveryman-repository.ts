import { Deliveryman } from '../../enterprise/entities/deliveryman'

export abstract class DeliverymanRepository {
  abstract findById(id: string): Promise<Deliveryman | null>
  abstract findByCpf(cpf: string): Promise<Deliveryman | null>
  abstract findMany(): Promise<Deliveryman[]>
  abstract create(deliveryman: Deliveryman): Promise<void>
  abstract update(deliveryman: Deliveryman): Promise<void>
  abstract delete(cpf: string): Promise<void>
}
