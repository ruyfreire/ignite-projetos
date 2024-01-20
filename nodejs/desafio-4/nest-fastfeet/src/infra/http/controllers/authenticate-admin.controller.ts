import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { AuthenticateAdminUseCase } from '@/domain/delivery/application/use-cases/authenticate-admin'
import { Public } from '@/infra/auth/public'

const bodySchema = z.object({
  cpf: z.string().min(11).max(11),
  password: z.string().min(6),
})

type BodySchema = z.infer<typeof bodySchema>

@Controller('admins/authenticate')
@Public()
export class AuthenticateAdminController {
  constructor(private authenticateAdminUseCase: AuthenticateAdminUseCase) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(bodySchema))
  async handle(@Body() body: BodySchema) {
    const { cpf, password } = body

    const result = await this.authenticateAdminUseCase.execute({
      cpf,
      password,
    })

    if (result.isLeft()) {
      throw new UnauthorizedException(result.value.message)
    }

    return { access_token: result.value.accessToken }
  }
}
