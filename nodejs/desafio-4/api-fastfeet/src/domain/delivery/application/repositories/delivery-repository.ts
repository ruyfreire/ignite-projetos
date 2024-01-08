import { Delivery } from '../../enterprise/entities/delivery'

export abstract class DeliveryRepository {
  abstract findById(id: string): Promise<Delivery | null>
  abstract findManyByCpfReceiver(cpf: string): Promise<Delivery[]>
  abstract findMany(): Promise<Delivery[]>
  abstract create(delivery: Delivery): Promise<void>
  abstract update(delivery: Delivery): Promise<void>
  abstract delete(id: string): Promise<void>
}
