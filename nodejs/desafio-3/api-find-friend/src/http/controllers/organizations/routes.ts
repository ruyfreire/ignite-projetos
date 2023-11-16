import { FastifyInstance } from 'fastify'
import { createOrganization } from './create-organization'
import { createPet } from './create-pet'
import { getContact } from './get-contact'

export async function organizationRoutes(app: FastifyInstance) {
  app.post('/', createOrganization)

  app.get('/:organization_id', getContact)

  app.post('/:organization_id/pets', createPet)
}
