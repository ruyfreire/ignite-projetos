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
import { CreateOrderUseCase } from '@/domain/delivery/application/use-cases/create-order'
import { OrderAlreadyExistsError } from '@/domain/delivery/application/use-cases/errors/order-already-exists-error'
import { AdminOnly } from '@/infra/auth/admin-only'

const bodySchema = z.object({
  title: z.string(),
})

type BodySchema = z.infer<typeof bodySchema>

@Controller('/orders')
@AdminOnly()
export class CreateOrderController {
  constructor(private createOrderUseCase: CreateOrderUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(bodySchema))
  async handle(@Body() body: BodySchema) {
    const { title } = body

    const result = await this.createOrderUseCase.execute({
      title,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case OrderAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
