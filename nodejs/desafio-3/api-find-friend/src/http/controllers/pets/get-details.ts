import { PetNotExistsError } from '@/use-cases/errors/pet-not-exists-error'
import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getDetails(request: FastifyRequest, reply: FastifyReply) {
  const routeParamsSchema = z.object({
    pet_id: z.string().uuid(),
  })

  const { pet_id } = routeParamsSchema.parse(request.params)

  const getPetDetailsUseCase = makeGetPetDetailsUseCase()

  try {
    const { pet } = await getPetDetailsUseCase.execute({
      petId: pet_id,
    })

    return reply.status(200).send({ pet })
  } catch (error) {
    if (error instanceof PetNotExistsError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
