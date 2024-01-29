import { DeliveryNotFoundError } from '@/domain/delivery/application/use-cases/errors/delivery-not-found-error'
import { SetDeliveryToReturnedUseCase } from '@/domain/delivery/application/use-cases/set-delivery-to-returned'
import { AdminOnly } from '@/infra/auth/admin-only'
import {
  BadRequestException,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common'
import { z } from 'zod'

const paramSchema = z.string().uuid()
type ParamSchema = z.infer<typeof paramSchema>

@Controller('deliveries/:id/returned')
@AdminOnly()
export class SetDeliveryToReturnedController {
  constructor(
    private setDeliveryToReturnedUseCase: SetDeliveryToReturnedUseCase,
  ) {}

  @Patch()
  @HttpCode(200)
  async handle(@Param('id') id: ParamSchema) {
    const result = await this.setDeliveryToReturnedUseCase.execute({
      id,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case DeliveryNotFoundError:
          throw new NotFoundException(error.message)

        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
