import { NoOrganizationFoundInCityError } from '@/use-cases/errors/no-organization-found-in-city-error'
import { makeGetPetsByCityUseCase } from '@/use-cases/factories/make-get-pets-by-city-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function listByCity(request: FastifyRequest, reply: FastifyReply) {
  const queryParamsSchema = z.object({
    city: z.string().max(100),
    name: z.string().min(3).max(100).optional(),
    age: z.coerce.number().int().min(1).max(100).optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
  })

  const { city, name, age, size } = queryParamsSchema.parse(request.query)

  const getPetByCityUseCase = makeGetPetsByCityUseCase()

  try {
    const { pets } = await getPetByCityUseCase.execute({
      city,
      filter: {
        name,
        age,
        size,
      },
    })

    return reply.status(200).send({ pets })
  } catch (error) {
    if (error instanceof NoOrganizationFoundInCityError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
