import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { createOrganization } from './create-organization'
import { createPet } from './create-pet'
import { getContact } from './get-contact'
import { refresh } from './refresh'

export async function organizationRoutes(app: FastifyInstance) {
  app.post('/auth', authenticate)
  app.post('/refresh-token', refresh)

  app.post('/', createOrganization)
  app.get('/:organization_id', getContact)

  app.post('/:organization_id/pets', { onRequest: [verifyJWT] }, createPet)
}
