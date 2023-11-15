import { OrganizationSameEmailAlreadyExistsError } from '@/use-cases/errors/organization-same-email-already-exists-error'
import { makeCreateOrganizationUseCase } from '@/use-cases/factories/make-create-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrganizationBodySchema = z.object({
    name: z.string(),
    address: z.string(),
    city: z.string(),
    phone: z.string(),
    email: z.string(),
    password: z.string(),
  })

  const { name, email, address, city, phone, password } =
    createOrganizationBodySchema.parse(request.body)

  const createOrganization = makeCreateOrganizationUseCase()

  try {
    const { organization } = await createOrganization.execute({
      name,
      email,
      address,
      city,
      phone,
      password,
    })

    reply.status(201).send({
      organization: {
        ...organization,
        password_hash: undefined,
      },
    })
  } catch (error) {
    if (error instanceof OrganizationSameEmailAlreadyExistsError) {
      reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
