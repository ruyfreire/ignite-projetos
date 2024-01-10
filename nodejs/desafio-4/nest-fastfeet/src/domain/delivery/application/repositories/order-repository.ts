import { Order } from '../../enterprise/entities/order'

export abstract class OrderRepository {
  abstract create(order: Order): Promise<void>
  abstract findById(id: string): Promise<Order | null>
  abstract findByTitle(title: string): Promise<Order | null>
  abstract findMany(): Promise<Order[]>
  abstract update(order: Order): Promise<void>
  abstract delete(id: string): Promise<void>
}
