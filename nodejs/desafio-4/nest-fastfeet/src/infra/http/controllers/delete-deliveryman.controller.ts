import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { z } from 'zod'
import { DeleteDeliverymanUseCase } from '@/domain/delivery/application/use-cases/delete-deliveryman'
import { AdminOnly } from '@/infra/auth/admin-only'

const paramSchema = z.string().min(11).max(11)
type ParamSchema = z.infer<typeof paramSchema>

@Controller('/deliverymen/:cpf')
@AdminOnly()
export class DeleteDeliverymanController {
  constructor(private deleteDeliverymanUseCase: DeleteDeliverymanUseCase) {}

  @Delete()
  @HttpCode(200)
  async handle(@Param('cpf') cpf: ParamSchema) {
    const result = await this.deleteDeliverymanUseCase.execute({
      cpf,
    })

    if (result.isLeft()) {
      throw new BadRequestException(result.value.message)
    }
  }
}
