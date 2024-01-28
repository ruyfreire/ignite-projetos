import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { z } from 'zod'
import { DeleteDeliveryUseCase } from '@/domain/delivery/application/use-cases/delete-delivery'
import { AdminOnly } from '@/infra/auth/admin-only'

const paramSchema = z.string().uuid()
type ParamSchema = z.infer<typeof paramSchema>

@Controller('/deliveries/:id')
@AdminOnly()
export class DeleteDeliveryController {
  constructor(private deleteDeliveryUseCase: DeleteDeliveryUseCase) {}

  @Delete()
  @HttpCode(200)
  async handle(@Param('id') id: ParamSchema) {
    const result = await this.deleteDeliveryUseCase.execute({
      id,
    })

    if (result.isLeft()) {
      console.log(result.value)
      throw new BadRequestException(result.value.message)
    }
  }
}
