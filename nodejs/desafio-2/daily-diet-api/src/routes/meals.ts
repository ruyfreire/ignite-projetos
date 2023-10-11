import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { knex } from '../database'
import dayjs from 'dayjs'

export async function mealRoutes(app: FastifyInstance) {
  app.post('/', async (request, replay) => {
    try {
      const createMealBodySchema = z.object({
        name: z
          .string()
          .regex(/[a-zA-Z]/, {
            message: 'Nome deve ter apenas letras de A à Z, e sem acentos',
          })
          .min(3, { message: 'Nome deve ter no mínimo 3 letras' })
          .max(20, { message: 'Nome deve ter no máximo 20 letras' }),
        description: z
          .string()
          .min(3, { message: 'Descrição deve ter no mínimo 3 letras' })
          .max(50, { message: 'Descrição deve ter no máximo 50 letras' }),
        date: z.coerce.date().max(dayjs().endOf('D').toDate(), {
          message: 'A data não pode ser maior de hoje',
        }),
        is_diet: z.boolean(),
      })

      const headerSchema = z.object({
        user_id: z.string().uuid(),
      })

      const result = createMealBodySchema.safeParse(request.body)

      if (!result.success) {
        return replay.status(400).send({
          message: 'Invalid request body',
          error: result.error.format(),
        })
      }

      const { user_id } = headerSchema.parse(request.cookies)

      const user = await knex('users').where('id', user_id).select('id').first()

      if (!user) {
        return replay.status(400).send({
          message: 'User cookie not found',
        })
      }

      const { name, description, date, is_diet } = result.data

      const [meal] = await knex('meals')
        .insert({
          id: randomUUID(),
          user_id: user.id,
          name,
          description,
          date: dayjs(date).toDate(),
          is_diet,
        })
        .returning('*')

      return replay.status(201).send({
        id: meal.id,
        name: meal.name,
        description: meal.description,
        date: dayjs(meal.date).format('YYYY-MM-DD'),
        is_diet: !!meal.is_diet,
      })
    } catch (error) {
      console.error(error)
      return replay.status(500).send({
        message: 'Internal server error',
      })
    }
  })
}
