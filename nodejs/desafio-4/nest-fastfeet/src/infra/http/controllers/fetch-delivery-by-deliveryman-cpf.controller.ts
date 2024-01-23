import { Controller, Get, Param, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { FetchDeliveryByDeliverymanCpfUseCase } from '@/domain/delivery/application/use-cases/fetch-delivery-by-deliveryman-cpf'
import { AdminOnly } from '@/infra/auth/admin-only'
import { DeliveryPresenter } from '../presenters/delivery-presenter'

const querySchema = z.string().min(11).max(11)

type QuerySchema = z.infer<typeof querySchema>

@Controller('/deliverymen/:cpf/deliveries')
@AdminOnly()
export class FetchDeliveryByDeliverymanCpfController {
  constructor(
    private fetchDeliveryByDeliverymanCpfUseCase: FetchDeliveryByDeliverymanCpfUseCase,
  ) {}

  @Get()
  @UsePipes(new ZodValidationPipe(querySchema))
  async handle(@Param('cpf') cpf: QuerySchema) {
    const result = await this.fetchDeliveryByDeliverymanCpfUseCase.execute({
      cpf,
    })

    return {
      deliveries: result.value?.delivery.map(DeliveryPresenter.toHTTP),
    }
  }
}
