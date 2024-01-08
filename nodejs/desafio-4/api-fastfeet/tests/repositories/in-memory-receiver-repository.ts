import { ReceiverRepository } from '@/domain/delivery/application/repositories/receiver-repository'
import { Receiver } from '@/domain/delivery/enterprise/entities/receiver'

export class InMemoryReceiverRepository implements ReceiverRepository {
  public items: Receiver[] = []

  async create(receiver: Receiver) {
    this.items.push(receiver)
  }

  async findByCpf(cpf: string) {
    const receiver = this.items.find((item) => item.cpf === cpf)

    return receiver || null
  }

  async findMany(): Promise<Receiver[]> {
    return this.items
  }

  async update(receiver: Receiver): Promise<void> {
    const receiverIndex = this.items.findIndex(
      (item) => item.cpf === receiver.cpf,
    )

    this.items[receiverIndex] = receiver
  }

  async delete(cpf: string): Promise<void> {
    const receiverIndex = this.items.findIndex((item) => item.cpf === cpf)

    this.items.splice(receiverIndex, 1)
  }
}
