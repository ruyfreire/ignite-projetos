import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { UpdateDeliverymanUseCase } from '@/domain/delivery/application/use-cases/update-deliveryman'
import { AdminOnly } from '@/infra/auth/admin-only'

const bodySchema = z.object({ name: z.string() })
type BodySchema = z.infer<typeof bodySchema>

const paramSchema = z.string().min(11).max(11)
type ParamSchema = z.infer<typeof paramSchema>

@Controller('/deliverymen/:cpf')
@AdminOnly()
export class UpdateDeliverymanController {
  constructor(private updateDeliverymanUseCase: UpdateDeliverymanUseCase) {}

  @Put()
  @HttpCode(200)
  async handle(
    @Body(new ZodValidationPipe(bodySchema)) body: BodySchema,
    @Param('cpf') cpf: ParamSchema,
  ) {
    const { name } = body

    const result = await this.updateDeliverymanUseCase.execute({
      name,
      cpf,
    })

    if (result.isLeft()) {
      throw new BadRequestException(result.value.message)
    }
  }
}
