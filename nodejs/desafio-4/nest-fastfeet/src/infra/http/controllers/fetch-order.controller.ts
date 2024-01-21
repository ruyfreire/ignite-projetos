import { Controller, Get, Query, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { FetchOrderUseCase } from '@/domain/delivery/application/use-cases/fetch-order'
import { AdminOnly } from '@/infra/auth/admin-only'
import { OrderPresenter } from '../presenters/order-presenter'

const querySchema = z.string().uuid().optional()

type QuerySchema = z.infer<typeof querySchema>

@Controller('/orders')
@AdminOnly()
export class FetchOrderController {
  constructor(private fetchOrderUseCase: FetchOrderUseCase) {}

  @Get()
  @UsePipes(new ZodValidationPipe(querySchema))
  async handle(@Query('id') id: QuerySchema) {
    const result = await this.fetchOrderUseCase.execute({
      id,
    })

    return {
      orders: result.value?.order.map(OrderPresenter.toHTTP),
    }
  }
}
