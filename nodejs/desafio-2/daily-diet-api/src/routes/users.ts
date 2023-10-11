import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { knex } from '../database'

export async function userRoutes(app: FastifyInstance) {
  app.post('/', async (request, replay) => {
    try {
      const createUserBodySchema = z.object({
        name: z
          .string()
          .regex(/[a-zA-Z]/, {
            message: 'Nome deve ter apenas letras de A à Z, e sem acentos',
          })
          .min(3, { message: 'Nome deve ter no mínimo 3 letras' })
          .max(20, { message: 'Nome deve ter no máximo 20 letras' }),
      })

      const result = createUserBodySchema.safeParse(request.body)

      if (!result.success) {
        return replay.status(400).send({
          message: 'Invalid request body',
          error: result.error.format(),
        })
      }

      const { name } = result.data

      let user = await knex('users').where('name', name).select('id').first()

      if (!user) {
        const [createdUser] = await knex('users')
          .insert({
            id: randomUUID(),
            name,
          })
          .returning('id')

        user = createdUser
      }

      return replay
        .cookie('user_id', user.id, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 7 days
        })
        .status(201)
        .send(user)
    } catch (error) {
      console.error(error)
      return replay.status(500).send({
        message: 'Internal server error',
      })
    }
  })
}
