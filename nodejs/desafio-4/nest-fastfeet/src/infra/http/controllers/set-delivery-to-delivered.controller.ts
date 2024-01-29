import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { DeliveryNotFoundError } from '@/domain/delivery/application/use-cases/errors/delivery-not-found-error'
import { PhotoNotFoundError } from '@/domain/delivery/application/use-cases/errors/photo-not-found-error'
import { SetDeliveryToDeliveredUseCase } from '@/domain/delivery/application/use-cases/set-delivery-to-delivered'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  UnauthorizedException,
} from '@nestjs/common'
import { z } from 'zod'

const paramSchema = z.string().uuid()
type ParamSchema = z.infer<typeof paramSchema>

const bodySchema = z.object({
  photo_id: z.string().uuid(),
})
type BodySchema = z.infer<typeof bodySchema>

@Controller('deliveries/:id/delivered')
export class SetDeliveryToDeliveredController {
  constructor(
    private setDeliveryToDeliveredUseCase: SetDeliveryToDeliveredUseCase,
  ) {}

  @Patch()
  @HttpCode(200)
  async handle(
    @Param('id') id: ParamSchema,
    @Body() body: BodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const result = await this.setDeliveryToDeliveredUseCase.execute({
      id,
      photoId: body.photo_id,
      deliverymanId: user.sub,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case DeliveryNotFoundError:
        case PhotoNotFoundError:
          throw new NotFoundException(error.message)

        case NotAllowedError:
          throw new UnauthorizedException(error.message)

        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
