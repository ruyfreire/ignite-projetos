import { Controller, Get } from '@nestjs/common'
import { FetchDeliveryUseCase } from '@/domain/delivery/application/use-cases/fetch-delivery'
import { AdminOnly } from '@/infra/auth/admin-only'
import { DeliveryPresenter } from '../presenters/delivery-presenter'

@Controller('/deliveries')
@AdminOnly()
export class FetchDeliveryController {
  constructor(private fetchDeliveryUseCase: FetchDeliveryUseCase) {}

  @Get()
  async handle() {
    const result = await this.fetchDeliveryUseCase.execute()

    return {
      deliveries: result.value?.delivery.map(DeliveryPresenter.toHTTP),
    }
  }
}
