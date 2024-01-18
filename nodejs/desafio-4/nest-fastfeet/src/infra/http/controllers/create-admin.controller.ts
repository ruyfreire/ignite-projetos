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
import { Public } from '@/infra/auth/public'
import { CreateAdminUseCase } from '@/domain/delivery/application/use-cases/create-admin'
import { AdminAlreadyExistsError } from '@/domain/delivery/application/use-cases/errors/admin-already-exists-error'

const createAdminBodySchema = z.object({
  name: z.string(),
  cpf: z.string().min(11).max(11),
  password: z.string(),
})

type CreateAdminBodySchema = z.infer<typeof createAdminBodySchema>

@Controller('/admins')
@Public()
export class CreateAdminController {
  constructor(private createAdminUseCase: CreateAdminUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAdminBodySchema))
  async handle(@Body() body: CreateAdminBodySchema) {
    const { name, cpf, password } = body

    const result = await this.createAdminUseCase.execute({
      name,
      cpf,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case AdminAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
