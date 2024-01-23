import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { CreateDeliveryUseCase } from '@/domain/delivery/application/use-cases/create-delivery'
import { DeliveryAlreadyExistsError } from '@/domain/delivery/application/use-cases/errors/delivery-already-exists-error'
import { AdminOnly } from '@/infra/auth/admin-only'

const bodySchema = z.object({
  order_id: z.string().uuid(),
  receiver_cpf: z.string().min(11).max(11),
})

type BodySchema = z.infer<typeof bodySchema>

@Controller('/deliveries')
@AdminOnly()
export class CreateDeliveryController {
  constructor(private createDeliveryUseCase: CreateDeliveryUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(bodySchema))
  async handle(@Body() body: BodySchema) {
    const { order_id, receiver_cpf } = body

    const result = await this.createDeliveryUseCase.execute({
      orderId: order_id,
      receiverCpf: receiver_cpf,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case DeliveryAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
