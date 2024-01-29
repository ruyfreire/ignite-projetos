import { SetDeliveryToAvailableUseCase } from '@/domain/delivery/application/use-cases/set-delivery-to-available'
import { AdminOnly } from '@/infra/auth/admin-only'
import {
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common'
import { z } from 'zod'

const paramSchema = z.string().uuid()
type ParamSchema = z.infer<typeof paramSchema>

@Controller('deliveries/:id/available')
@AdminOnly()
export class SetDeliveryToAvailableController {
  constructor(
    private setDeliveryToAvailableUseCase: SetDeliveryToAvailableUseCase,
  ) {}

  @Patch()
  @HttpCode(200)
  async handle(@Param('id') id: ParamSchema) {
    const result = await this.setDeliveryToAvailableUseCase.execute({
      id,
    })

    if (result.isLeft()) {
      throw new NotFoundException(result.value.message)
    }
  }
}
