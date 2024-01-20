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
import { CreateDeliverymanUseCase } from '@/domain/delivery/application/use-cases/create-deliveryman'
import { DeliverymanAlreadyExistsError } from '@/domain/delivery/application/use-cases/errors/deliveryman-already-exists-error'
import { AdminOnly } from '@/infra/auth/admin-only'

const bodySchema = z.object({
  name: z.string(),
  cpf: z.string().min(11).max(11),
  password: z.string(),
})

type BodySchema = z.infer<typeof bodySchema>

@Controller('/deliverymen')
@AdminOnly()
export class CreateDeliverymanController {
  constructor(private createDeliverymanUseCase: CreateDeliverymanUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(bodySchema))
  async handle(@Body() body: BodySchema) {
    const { name, cpf, password } = body

    const result = await this.createDeliverymanUseCase.execute({
      name,
      cpf,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case DeliverymanAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
