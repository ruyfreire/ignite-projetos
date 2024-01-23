import { Controller, Get, Param, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { FetchDeliveryByReceiverCpfUseCase } from '@/domain/delivery/application/use-cases/fetch-delivery-by-receiver-cpf'
import { AdminOnly } from '@/infra/auth/admin-only'
import { DeliveryPresenter } from '../presenters/delivery-presenter'

const querySchema = z.string().min(11).max(11)

type QuerySchema = z.infer<typeof querySchema>

@Controller('/receiver/:cpf/deliveries')
@AdminOnly()
export class FetchDeliveryByReceiverCpfController {
  constructor(
    private fetchDeliveryByReceiverCpfUseCase: FetchDeliveryByReceiverCpfUseCase,
  ) {}

  @Get()
  @UsePipes(new ZodValidationPipe(querySchema))
  async handle(@Param('cpf') cpf: QuerySchema) {
    const result = await this.fetchDeliveryByReceiverCpfUseCase.execute({
      cpf,
    })

    return {
      deliveries: result.value?.delivery.map(DeliveryPresenter.toHTTP),
    }
  }
}
