import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { CreateReceiverUseCase } from '@/domain/delivery/application/use-cases/create-receiver'
import { AdminOnly } from '@/infra/auth/admin-only'

const bodySchema = z.object({
  name: z.string(),
  cpf: z.string().min(11).max(11),
  address: z.object({
    zip_code: z.string(),
    street: z.string(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    complement: z.string().optional(),
    number: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }),
})

type BodySchema = z.infer<typeof bodySchema>

@Controller('/receiver')
@AdminOnly()
export class CreateReceiverController {
  constructor(private createReceiverUseCase: CreateReceiverUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(bodySchema))
  async handle(@Body() body: BodySchema) {
    const { name, cpf, address } = body

    const result = await this.createReceiverUseCase.execute({
      name,
      cpf,
      address: {
        zip_code: address.zip_code,
        street: address.street,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        complement: address.complement,
        number: address.number,
        latitude: address.latitude,
        longitude: address.longitude,
      },
    })

    if (result.isLeft()) {
      throw new ConflictException(result.value.message)
    }
  }
}
