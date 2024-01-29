import { Body, Controller, Get, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { FetchNearbyDeliveryUseCase } from '@/domain/delivery/application/use-cases/fetch-nearby-delivery'
import { DeliveryPresenter } from '../presenters/delivery-presenter'

const bodySchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
})
type BodySchema = z.infer<typeof bodySchema>

@Controller('/deliveries/nearby')
export class FetchNearbyDeliveryController {
  constructor(private fetchNearbyDeliveryUseCase: FetchNearbyDeliveryUseCase) {}

  @Get()
  @UsePipes(new ZodValidationPipe(bodySchema))
  async handle(@Body() body: BodySchema) {
    const { latitude, longitude } = body

    const result = await this.fetchNearbyDeliveryUseCase.execute({
      latitude,
      longitude,
    })

    return {
      deliveries: result.value.delivery.map(DeliveryPresenter.toHTTP),
    }
  }
}
