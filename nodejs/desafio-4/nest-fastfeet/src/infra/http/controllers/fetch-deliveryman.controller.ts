import { Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'

import { FetchDeliverymanUseCase } from '@/domain/delivery/application/use-cases/fetch-deliveryman'

import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const queryParamSchema = z.string().uuid().optional()

const queryValidationPipe = new ZodValidationPipe(queryParamSchema)

type QueryParamSchema = z.infer<typeof queryParamSchema>

@Controller('/deliverymen')
export class FetchDeliverymanController {
  constructor(private fetchDeliverymanUseCase: FetchDeliverymanUseCase) {}

  @Get()
  async handle(@Query('cpf', queryValidationPipe) cpf: QueryParamSchema) {
    const result = await this.fetchDeliverymanUseCase.execute({
      cpf,
    })

    return {
      deliveryman: result.value?.deliveryman,
    }
  }
}
