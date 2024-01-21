import {
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { z } from 'zod'
import { DeleteOrderUseCase } from '@/domain/delivery/application/use-cases/delete-order'
import { AdminOnly } from '@/infra/auth/admin-only'

const paramSchema = z.string().uuid()
type ParamSchema = z.infer<typeof paramSchema>

@Controller('/orders/:id')
@AdminOnly()
export class DeleteOrderController {
  constructor(private deleteOrderUseCase: DeleteOrderUseCase) {}

  @Delete()
  @HttpCode(200)
  async handle(@Param('id') id: ParamSchema) {
    const result = await this.deleteOrderUseCase.execute({
      id,
    })

    if (result.isLeft()) {
      throw new NotFoundException(result.value.message)
    }
  }
}
