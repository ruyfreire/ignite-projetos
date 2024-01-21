import { Either, left, right } from '@/core/either'
import { OrderRepository } from '../repositories/order-repository'
import { OrderNotFoundError } from './errors/order-not-found-error'
import { Injectable } from '@nestjs/common'

interface DeleteOrderUseCaseProps {
  id: string
}

type DeleteOrderUseCaseResponse = Either<OrderNotFoundError, null>

@Injectable()
export class DeleteOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  public async execute({
    id,
  }: DeleteOrderUseCaseProps): Promise<DeleteOrderUseCaseResponse> {
    const order = await this.orderRepository.findById(id)

    if (!order) {
      return left(new OrderNotFoundError())
    }

    await this.orderRepository.delete(id)

    return right(null)
  }
}
