import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { knex } from '../database'
import dayjs from 'dayjs'

export async function mealRoutes(app: FastifyInstance) {
  const mealBodySchema = z.object({
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

  const mealParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const headerSchema = z.object({
    user_id: z.string().uuid(),
  })

  app.post('/', async (request, replay) => {
    try {
      const result = mealBodySchema.safeParse(request.body)

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
        .returning('id')

      return replay.status(201).send({ meal })
    } catch (error) {
      console.error(error)
      return replay.status(500).send({
        message: 'Internal server error',
      })
    }
  })

  app.get('/', async (request, replay) => {
    try {
      const { user_id } = headerSchema.parse(request.cookies)

      const meals = await knex('meals')
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

      return replay.status(200).send({ meals })
    } catch (error) {
      console.error(error)
      return replay.status(500).send({
        message: 'Internal server error',
      })
    }
  })

  app.get('/:id', async (request, replay) => {
    try {
      const resultParam = mealParamsSchema.safeParse(request.params)

      if (!resultParam.success) {
        return replay.status(400).send({
          message: 'Invalid uuid Param',
        })
      }

      const mealId = resultParam.data.id
      const { user_id } = headerSchema.parse(request.cookies)

      const meal = await knex('meals')
        .where({ id: mealId, user_id })
        .select(
          'id',
          'name',
          'description',
          'date',
          'is_diet',
          'created_at',
          'updated_at',
        )
        .first()

      if (!meal) {
        return replay.status(404).send({
          message: 'Meal not found',
        })
      }

      return replay.status(200).send({ meal })
    } catch (error) {
      console.error(error)
      return replay.status(500).send({
        message: 'Internal server error',
      })
    }
  })

  app.put('/:id', async (request, replay) => {
    try {
      const resultParam = mealParamsSchema.safeParse(request.params)

      if (!resultParam.success) {
        return replay.status(400).send({
          message: 'Invalid uuid Param',
        })
      }

      const schemaOptional = mealBodySchema.partial()
      const resultBody = schemaOptional.safeParse(request.body)

      if (!resultBody.success) {
        return replay.status(400).send({
          message: 'Invalid request body',
          error: resultBody.error.format(),
        })
      }

      const mealId = resultParam.data.id
      const { user_id } = headerSchema.parse(request.cookies)

      const meal = await knex('meals')
        .where({ id: mealId, user_id })
        .select('*')
        .first()

      if (!meal) {
        return replay.status(404).send({
          message: 'Meal not found',
        })
      }

      const body = resultBody.data

      const updateMeal = {
        ...meal,
        ...body,
      }

      const [mealUpdated] = await knex('meals')
        .where({ id: meal.id, user_id })
        .update({
          name: updateMeal.name,
          description: updateMeal.description,
          date: dayjs(updateMeal.date).toDate(),
          is_diet: updateMeal.is_diet,
          updated_at: new Date(),
        })
        .returning('id')

      return replay.status(200).send({ meal: mealUpdated })
    } catch (error) {
      console.error(error)
      return replay.status(500).send({
        message: 'Internal server error',
      })
    }
  })

  app.delete('/:id', async (request, replay) => {
    try {
      const resultParam = mealParamsSchema.safeParse(request.params)

      if (!resultParam.success) {
        return replay.status(400).send({
          message: 'Invalid uuid Param',
        })
      }

      const mealId = resultParam.data.id
      const { user_id } = headerSchema.parse(request.cookies)

      const meal = await knex('meals')
        .where({ id: mealId, user_id })
        .select('id')
        .first()

      if (!meal) {
        return replay.status(404).send({
          message: 'Meal not found',
        })
      }

      await knex('meals').where({ id: meal.id, user_id }).delete()

      return replay.status(204).send()
    } catch (error) {
      console.error(error)
      return replay.status(500).send({
        message: 'Internal server error',
      })
    }
  })
}
