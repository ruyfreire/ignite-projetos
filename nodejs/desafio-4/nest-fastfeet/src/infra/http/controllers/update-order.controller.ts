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
import { UpdateOrderUseCase } from '@/domain/delivery/application/use-cases/update-order'
import { AdminOnly } from '@/infra/auth/admin-only'

const bodySchema = z.object({ title: z.string() })
type BodySchema = z.infer<typeof bodySchema>

const paramSchema = z.string().uuid()
type ParamSchema = z.infer<typeof paramSchema>

@Controller('/orders/:id')
@AdminOnly()
export class UpdateOrderController {
  constructor(private updateOrderUseCase: UpdateOrderUseCase) {}

  @Put()
  @HttpCode(200)
  async handle(
    @Body(new ZodValidationPipe(bodySchema)) body: BodySchema,
    @Param('id') id: ParamSchema,
  ) {
    const result = await this.updateOrderUseCase.execute({
      id,
      title: body.title,
    })

    if (result.isLeft()) {
      throw new NotFoundException(result.value.message)
    }
  }
}
