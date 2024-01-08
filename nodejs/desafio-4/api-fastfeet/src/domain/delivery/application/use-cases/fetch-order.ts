import { Either, right } from '@/core/either'
import { OrderRepository } from '../repositories/order-repository'
import { Order } from '../../enterprise/entities/order'

interface FetchOrderUseCaseProps {
  title?: string
}

type FetchOrderUseCaseResponse = Either<
  null,
  {
    order: Order[]
  }
>

export class FetchOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  public async execute({
    title,
  }: FetchOrderUseCaseProps): Promise<FetchOrderUseCaseResponse> {
    let order: Order[] = []

    if (title) {
      const orderFound = await this.orderRepository.findByTitle(title)

      order = orderFound ? [orderFound] : []
    } else {
      order = await this.orderRepository.findMany()
    }

    return right({
      order,
    })
  }
}
