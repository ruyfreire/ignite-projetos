import { OrganizationNotExistsError } from '@/use-cases/errors/organization-not-exists-error'
import { makeGetOrganizationDetailsUseCase } from '@/use-cases/factories/make-get-organization-details-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getContact(request: FastifyRequest, reply: FastifyReply) {
  const routeParamsSchema = z.object({
    organization_id: z.string().uuid(),
  })

  const { organization_id } = routeParamsSchema.parse(request.params)

  const getOrganizationDetailUseCase = makeGetOrganizationDetailsUseCase()

  try {
    const { organization } = await getOrganizationDetailUseCase.execute({
      organizationId: organization_id,
    })

    return reply.status(200).send({
      organization: {
        name: organization.name,
        phone: organization.phone,
        email: organization.email,
        address: organization.address,
        city: organization.city,
      },
    })
  } catch (error) {
    if (error instanceof OrganizationNotExistsError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
