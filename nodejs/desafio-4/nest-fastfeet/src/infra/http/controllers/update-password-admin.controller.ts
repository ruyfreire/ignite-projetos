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
import { AdminOnly } from '@/infra/auth/admin-only'
import { UpdatePasswordAdminUseCase } from '@/domain/delivery/application/use-cases/update-password-admin'

const bodySchema = z.object({ password: z.string() })
type BodySchema = z.infer<typeof bodySchema>

const paramSchema = z.string().min(11).max(11)
type ParamSchema = z.infer<typeof paramSchema>

@Controller('/admins/:cpf/password')
@AdminOnly()
export class UpdatePasswordAdminController {
  constructor(private updatePasswordAdminUseCase: UpdatePasswordAdminUseCase) {}

  @Put()
  @HttpCode(200)
  async handle(
    @Body(new ZodValidationPipe(bodySchema)) body: BodySchema,
    @Param('cpf') cpf: ParamSchema,
  ) {
    const { password } = body

    const result = await this.updatePasswordAdminUseCase.execute({
      password,
      cpf,
    })

    if (result.isLeft()) {
      throw new BadRequestException(result.value.message)
    }
  }
}
