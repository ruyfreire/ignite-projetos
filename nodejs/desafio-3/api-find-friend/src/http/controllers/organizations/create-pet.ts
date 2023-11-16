import { OrganizationNotExistsError } from '@/use-cases/errors/organization-not-exists-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const routeParamsSchema = z.object({
    organization_id: z.string().uuid(),
  })

  const createPetBodySchema = z.object({
    name: z.string().min(3).max(100),
    age: z.number().int().min(1).max(100),
    description: z.string().nullable(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
  })

  const { organization_id } = routeParamsSchema.parse(request.params)

  const { name, age, size, description } = createPetBodySchema.parse(
    request.body,
  )

  const createPetUseCase = makeCreatePetUseCase()

  try {
    const { pet } = await createPetUseCase.execute({
      name,
      age,
      description,
      size,
      organization_id,
    })

    return reply.status(201).send({ pet })
  } catch (error) {
    if (error instanceof OrganizationNotExistsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
