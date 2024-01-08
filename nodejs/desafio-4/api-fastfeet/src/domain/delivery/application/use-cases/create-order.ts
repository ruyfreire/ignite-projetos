import { Either, left, right } from '@/core/either'
import { Order } from '../../enterprise/entities/order'
import { OrderRepository } from '../repositories/order-repository'
import { OrderAlreadyExistsError } from './errors/order-already-exists-error'

interface CreateOrderUseCaseProps {
  title: string
}

type CreateOrderUseCaseResponse = Either<
  OrderAlreadyExistsError,
  { order: Order }
>

export class CreateOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({
    title,
  }: CreateOrderUseCaseProps): Promise<CreateOrderUseCaseResponse> {
    const orderExists = await this.orderRepository.findByTitle(title)

    if (orderExists) {
      return left(new OrderAlreadyExistsError())
    }

    const order = new Order({ title })

    await this.orderRepository.create(order)

    return right({
      order,
    })
  }
}
