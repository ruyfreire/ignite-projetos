import { OrganizationSameEmailAlreadyExistsError } from '@/use-cases/errors/organization-same-email-already-exists-error'
import { makeCreateOrganizationUseCase } from '@/use-cases/factories/make-create-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    name: z.string().min(3).max(100),
    address: z.string().min(3).max(255),
    city: z.string().min(3).max(100),
    phone: z.string().min(10).max(11),
    email: z.string().email(),
    password: z.string().min(6).max(50),
  })

  const { name, email, address, city, phone, password } = bodySchema.parse(
    request.body,
  )

  const createOrganizationUseCase = makeCreateOrganizationUseCase()

  try {
    const { organization } = await createOrganizationUseCase.execute({
      name,
      email,
      address,
      city,
      phone,
      password,
    })

    return reply.status(201).send({
      organization: {
        ...organization,
        password_hash: undefined,
      },
    })
  } catch (error) {
    if (error instanceof OrganizationSameEmailAlreadyExistsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
