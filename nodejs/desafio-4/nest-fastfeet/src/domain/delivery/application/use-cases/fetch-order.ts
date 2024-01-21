import { Either, right } from '@/core/either'
import { OrderRepository } from '../repositories/order-repository'
import { Order } from '../../enterprise/entities/order'
import { Injectable } from '@nestjs/common'

interface FetchOrderUseCaseProps {
  id?: string
}

type FetchOrderUseCaseResponse = Either<
  null,
  {
    order: Order[]
  }
>

@Injectable()
export class FetchOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  public async execute({
    id,
  }: FetchOrderUseCaseProps): Promise<FetchOrderUseCaseResponse> {
    let order: Order[] = []

    if (id) {
      const orderFound = await this.orderRepository.findById(id)

      order = orderFound ? [orderFound] : []
    } else {
      order = await this.orderRepository.findMany()
    }

    return right({
      order,
    })
  }
}
