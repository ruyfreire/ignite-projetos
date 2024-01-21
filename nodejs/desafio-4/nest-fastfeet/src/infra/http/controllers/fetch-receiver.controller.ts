import { Controller, Get, Query, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { FetchReceiverUseCase } from '@/domain/delivery/application/use-cases/fetch-receiver'
import { AdminOnly } from '@/infra/auth/admin-only'
import { ReceiverPresenter } from '../presenters/receiver-presenter'

const querySchema = z.string().min(11).max(11).optional()

type QuerySchema = z.infer<typeof querySchema>

@Controller('/receiver')
@AdminOnly()
export class FetchReceiverController {
  constructor(private fetchReceiverUseCase: FetchReceiverUseCase) {}

  @Get()
  @UsePipes(new ZodValidationPipe(querySchema))
  async handle(@Query('cpf') cpf: QuerySchema) {
    const result = await this.fetchReceiverUseCase.execute({
      cpf,
    })

    return {
      receiver: result.value?.receiver.map(ReceiverPresenter.toHTTP),
    }
  }
}
