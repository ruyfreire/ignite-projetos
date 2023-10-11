import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { knex } from '../database'
import { dateToTimestamp } from '../utils/formatDate'

export async function userRoutes(app: FastifyInstance) {
  const headerSchema = z.object({
    user_id: z.string().uuid(),
  })

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
        .send({ user })
    } catch (error) {
      console.error(error)
      return replay.status(500).send({
        message: 'Internal server error',
      })
    }
  })

  app.get('/metrics', async (request, replay) => {
    try {
      const { user_id } = headerSchema.parse(request.cookies)

      const result = await knex('meals')
        .where('user_id', user_id)
        .select(
          'id',
          'name',
          'description',
          'date',
          'is_diet',
          'created_at',
          'updated_at',
        )
        .orderBy('created_at', 'desc')

      const meals = result.map((item) => {
        return {
          ...item,
          date: dateToTimestamp(item.date),
          created_at: dateToTimestamp(item.created_at),
          updated_at: dateToTimestamp(item.updated_at),
        }
      })

      const metrics = meals.reduce(
        (acc, curr) => {
          const amount = { ...acc }

          amount.total_meals++

          if (curr.is_diet) {
            amount.total_meals_is_diet++
            amount.sequence_diet++

            if (amount.best_sequence_diet === 0) {
              amount.best_sequence_diet++
            }
          } else {
            amount.total_meals_is_not_diet++

            if (amount.sequence_diet > amount.best_sequence_diet) {
              amount.best_sequence_diet = amount.sequence_diet
            }

            amount.sequence_diet = 0
          }

          return amount
        },
        {
          total_meals: 0,
          total_meals_is_diet: 0,
          total_meals_is_not_diet: 0,
          sequence_diet: 0,
          best_sequence_diet: 0,
        },
      )

      return replay.status(200).send({
        metrics: { ...metrics, sequence_diet: undefined },
      })
    } catch (error) {
      console.error(error)
      return replay.status(500).send({
        message: 'Internal server error',
      })
    }
  })
}
