import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { z } from 'zod'
import { DeleteReceiverUseCase } from '@/domain/delivery/application/use-cases/delete-receiver'
import { AdminOnly } from '@/infra/auth/admin-only'

const paramSchema = z.string().min(11).max(11)
type ParamSchema = z.infer<typeof paramSchema>

@Controller('/receiver/:cpf')
@AdminOnly()
export class DeleteReceiverController {
  constructor(private deleteReceiverUseCase: DeleteReceiverUseCase) {}

  @Delete()
  @HttpCode(200)
  async handle(@Param('cpf') cpf: ParamSchema) {
    const result = await this.deleteReceiverUseCase.execute({
      cpf,
    })

    if (result.isLeft()) {
      throw new BadRequestException(result.value.message)
    }
  }
}
