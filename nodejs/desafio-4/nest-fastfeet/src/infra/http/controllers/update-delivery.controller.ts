import {
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { UpdateDeliveryUseCase } from '@/domain/delivery/application/use-cases/update-delivery'
import { AdminOnly } from '@/infra/auth/admin-only'

const bodySchema = z
  .object({
    order_id: z.string().uuid(),
    deliveryman_cpf: z.string().min(11).max(11).nullable(),
    available_at: z.coerce.date().nullable(),
    returned_at: z.coerce.date().nullable(),
    delivered_at: z.coerce.date().nullable(),
    photo_id: z.string().uuid().nullable(),
  })
  .partial()
type BodySchema = z.infer<typeof bodySchema>

const paramSchema = z.string().uuid()
type ParamSchema = z.infer<typeof paramSchema>

@Controller('/deliveries/:id')
@AdminOnly()
export class UpdateDeliveryController {
  constructor(private updateDeliveryUseCase: UpdateDeliveryUseCase) {}

  @Put()
  @HttpCode(200)
  async handle(
    @Body(new ZodValidationPipe(bodySchema)) body: BodySchema,
    @Param('id') id: ParamSchema,
  ) {
    const {
      order_id,
      available_at,
      delivered_at,
      deliveryman_cpf,
      photo_id,
      returned_at,
    } = body

    const result = await this.updateDeliveryUseCase.execute({
      orderId: order_id,
      deliveryId: id,
      availableAt: available_at,
      deliveredAt: delivered_at,
      deliverymanCpf: deliveryman_cpf,
      deliveredPhotoId: photo_id,
      returnedAt: returned_at,
    })

    if (result.isLeft()) {
      console.error(result.value)
      throw new NotFoundException(result.value.message)
    }
  }
}
