import { FastifyInstance } from 'fastify'
import { createHash, randomUUID } from 'node:crypto'
import { z } from 'zod'
import { knex } from '../database'

export async function userRoutes(app: FastifyInstance) {
  app.post('/', async (request, replay) => {
    try {
      const createUserBodySchema = z.object({
        name: z
          .string()
          .min(3, { message: 'Name must be at least 3 characters long' })
          .max(50, { message: 'Name must be at most 50 characters long' }),
        login: z
          .string()
          .min(3, { message: 'Login must be at least 3 characters long' })
          .max(50, { message: 'Login must be at most 50 characters long' })
          .regex(/^[a-zA-Z0-9]+$/, {
            message: 'Login must only contain letters and numbers',
          }),
        password: z
          .string()
          .min(6, { message: 'Password must be at least 6 characters long' }),
      })

      const result = createUserBodySchema.safeParse(request.body)

      if (!result.success) {
        return replay.status(400).send({
          message: 'Invalid request body',
          error: result.error.format(),
        })
      }

      const { name, login, password } = result.data

      const [user] = await knex('users')
        .insert({
          id: randomUUID(),
          name,
          login,
          password: createHash('sha256').update(password).digest('hex'),
        })
        .returning('id')

      return replay.status(201).send(user)
    } catch (error) {
      console.error(error)
      return replay.status(500).send({
        message: 'Internal server error',
      })
    }
  })
}
