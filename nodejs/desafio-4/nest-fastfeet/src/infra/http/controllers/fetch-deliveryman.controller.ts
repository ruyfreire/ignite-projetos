import { Controller, Get, Query, UsePipes } from '@nestjs/common'
import { z } from 'zod'

import { FetchDeliverymanUseCase } from '@/domain/delivery/application/use-cases/fetch-deliveryman'

import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { AdminOnly } from '@/infra/auth/admin-only'
import { DeliverymanPresenter } from '../presenters/deliveryman-presenter'

const queryParamSchema = z.string().min(11).max(11).optional()

type QueryParamSchema = z.infer<typeof queryParamSchema>

@Controller('/deliverymen')
@AdminOnly()
export class FetchDeliverymanController {
  constructor(private fetchDeliverymanUseCase: FetchDeliverymanUseCase) {}

  @Get()
  @UsePipes(new ZodValidationPipe(queryParamSchema))
  async handle(@Query('cpf') cpf: QueryParamSchema) {
    const result = await this.fetchDeliverymanUseCase.execute({
      cpf,
    })

    return {
      deliverymen: result.value.deliveryman.map(DeliverymanPresenter.toHTTP),
    }
  }
}
