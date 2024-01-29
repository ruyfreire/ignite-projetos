import { DeliveryNotFoundError } from '@/domain/delivery/application/use-cases/errors/delivery-not-found-error'
import { DeliverymanNotFoundError } from '@/domain/delivery/application/use-cases/errors/deliveryman-not-found-error'
import { SetDeliveryToDeliverymanUseCase } from '@/domain/delivery/application/use-cases/set-delivery-to-deliveryman'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
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

@Controller('deliveries/:id/deliveryman')
export class SetDeliveryToDeliverymanController {
  constructor(
    private setDeliveryToDeliverymanUseCase: SetDeliveryToDeliverymanUseCase,
  ) {}

  @Patch()
  @HttpCode(200)
  async handle(@Param('id') id: ParamSchema, @CurrentUser() user: UserPayload) {
    const result = await this.setDeliveryToDeliverymanUseCase.execute({
      id,
      deliverymanId: user.sub,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case DeliveryNotFoundError:
        case DeliverymanNotFoundError:
          throw new NotFoundException(error.message)

        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
