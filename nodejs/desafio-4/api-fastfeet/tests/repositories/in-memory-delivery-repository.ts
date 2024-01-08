import { DeliveryRepository } from '@/domain/delivery/application/repositories/delivery-repository'
import { Delivery } from '@/domain/delivery/enterprise/entities/delivery'

export class InMemoryDeliveryRepository implements DeliveryRepository {
  public items: Delivery[] = []

  async create(delivery: Delivery) {
    this.items.push(delivery)
  }

  async findById(id: string) {
    const delivery = this.items.find((item) => item.id === id)

    return delivery || null
  }

  async findManyByCpfReceiver(cpf: string) {
    const delivery = this.items.filter((item) => item.receiver.cpf === cpf)

    return delivery || null
  }

  async findMany(): Promise<Delivery[]> {
    return this.items
  }

  async update(delivery: Delivery): Promise<void> {
    const deliveryIndex = this.items.findIndex(
      (item) => item.id === delivery.id,
    )

    this.items[deliveryIndex] = delivery
  }

  async delete(id: string): Promise<void> {
    const deliveryIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(deliveryIndex, 1)
  }
}
