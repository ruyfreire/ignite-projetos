import { DeliverymanRepository } from '@/domain/delivery/application/repositories/deliveryman-repository'
import { Deliveryman } from '@/domain/delivery/enterprise/entities/deliveryman'

export class InMemoryDeliverymanRepository implements DeliverymanRepository {
  public items: Deliveryman[] = []

  async create(deliveryman: Deliveryman) {
    this.items.push(deliveryman)
  }

  async findByCpf(cpf: string) {
    const deliveryman = this.items.find((item) => item.cpf === cpf)

    return deliveryman || null
  }

  async findMany(): Promise<Deliveryman[]> {
    return this.items
  }

  async update(deliveryman: Deliveryman): Promise<void> {
    const deliverymanIndex = this.items.findIndex(
      (item) => item.cpf === deliveryman.cpf,
    )

    this.items[deliverymanIndex] = deliveryman
  }

  async delete(cpf: string): Promise<void> {
    const deliverymanIndex = this.items.findIndex((item) => item.cpf === cpf)

    this.items.splice(deliverymanIndex, 1)
  }
}
