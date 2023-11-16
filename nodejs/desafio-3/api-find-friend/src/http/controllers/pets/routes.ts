import { FastifyInstance } from 'fastify'
import { getDetails } from './get-details'
import { listByCity } from './list-by-city'

export async function petRoutes(app: FastifyInstance) {
  app.get('/:pet_id', getDetails)
  app.get('/search', listByCity)
}
