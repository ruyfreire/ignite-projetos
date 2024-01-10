import { OrderRepository } from '@/domain/delivery/application/repositories/order-repository'
import { Order } from '@/domain/delivery/enterprise/entities/order'

export class InMemoryOrderRepository implements OrderRepository {
  public items: Order[] = []

  async create(order: Order) {
    this.items.push(order)
  }

  async findById(id: string) {
    const order = this.items.find((item) => item.id === id)

    return order || null
  }

  async findByTitle(title: string) {
    const order = this.items.find((item) => item.title === title)

    return order || null
  }

  async findMany(): Promise<Order[]> {
    return this.items
  }

  async update(order: Order): Promise<void> {
    const orderIndex = this.items.findIndex((item) => item.id === order.id)

    this.items[orderIndex] = order
  }

  async delete(id: string): Promise<void> {
    const orderIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(orderIndex, 1)
  }
}
