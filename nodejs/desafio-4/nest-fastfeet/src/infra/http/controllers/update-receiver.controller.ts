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
import { UpdateReceiverUseCase } from '@/domain/delivery/application/use-cases/update-receiver'
import { AdminOnly } from '@/infra/auth/admin-only'

const bodySchema = z
  .object({
    name: z.string(),
    address: z
      .object({
        zip_code: z.string(),
        street: z.string(),
        neighborhood: z.string(),
        city: z.string(),
        state: z.string(),
        complement: z.string(),
        number: z.string(),
        latitude: z.number(),
        longitude: z.number(),
      })
      .partial(),
  })
  .partial()

type BodySchema = z.infer<typeof bodySchema>

const paramSchema = z.string().min(11).max(11)
type ParamSchema = z.infer<typeof paramSchema>

@Controller('/receiver/:cpf')
@AdminOnly()
export class UpdateReceiverController {
  constructor(private updateReceiverUseCase: UpdateReceiverUseCase) {}

  @Put()
  @HttpCode(200)
  async handle(
    @Body(new ZodValidationPipe(bodySchema)) body: BodySchema,
    @Param('cpf') cpf: ParamSchema,
  ) {
    const { name, address } = body

    const result = await this.updateReceiverUseCase.execute({
      cpf,
      name,
      address: {
        zip_code: address?.zip_code,
        street: address?.street,
        neighborhood: address?.neighborhood,
        city: address?.city,
        state: address?.state,
        complement: address?.complement,
        number: address?.number,
        latitude: address?.latitude,
        longitude: address?.longitude,
      },
    })

    if (result.isLeft()) {
      throw new BadRequestException(result.value.message)
    }
  }
}
