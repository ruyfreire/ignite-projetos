import { Either, left, right } from '@/core/either'
import { Order } from '../../enterprise/entities/order'
import { OrderRepository } from '../repositories/order-repository'
import { OrderNotFoundError } from './errors/order-not-found-error'
import { Injectable } from '@nestjs/common'

interface UpdateOrderUseCaseProps {
  title: string
  id: string
}

type UpdateOrderUseCaseResponse = Either<
  OrderNotFoundError,
  {
    order: Order
  }
>

@Injectable()
export class UpdateOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  public async execute({
    title,
    id,
  }: UpdateOrderUseCaseProps): Promise<UpdateOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(id)

    if (!order) {
      return left(new OrderNotFoundError())
    }

    order.title = title

    await this.orderRepository.update(order)

    return right({
      order,
    })
  }
}
