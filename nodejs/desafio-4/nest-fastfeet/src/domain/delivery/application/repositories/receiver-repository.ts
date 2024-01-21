import { Receiver } from '../../enterprise/entities/receiver'

export abstract class ReceiverRepository {
  abstract create(receiver: Receiver): Promise<void>
  abstract findByCpf(cpf: string): Promise<Receiver | null>
  abstract findMany(): Promise<Receiver[]>
  abstract update(receiver: Receiver): Promise<void>
  abstract delete(cpf: string): Promise<void>
}
