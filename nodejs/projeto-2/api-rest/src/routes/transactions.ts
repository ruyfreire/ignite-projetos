import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { knex } from '../database'
import { checkSessionIdExists } from '../midlewares/check-session-id-exists'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get(
    '/',
    { preHandler: [checkSessionIdExists] },
    async (request, replay) => {
      const { sessionId } = request.cookies

      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select('*')

      return replay.code(200).send({ transactions })
    },
  )

  app.get(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (request, replay) => {
      const getTransactionsParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const result = getTransactionsParamsSchema.safeParse(request.params)
      if (!result.success) {
        return replay.code(400).send({
          message: 'Request params, invalid uuid',
        })
      }

      const { sessionId } = request.cookies
      const { id } = result.data

      const transaction = await knex('transactions')
        .where({
          id,
          session_id: sessionId,
        })
        .first()

      if (!transaction) {
        return replay.code(404).send({
          message: 'Transaction not found',
        })
      }

      return replay.code(200).send({ transaction })
    },
  )

  app.get(
    '/summary',
    { preHandler: [checkSessionIdExists] },
    async (request, replay) => {
      const { sessionId } = request.cookies

      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first()

      return replay.code(200).send({ summary })
    },
  )

  app.post('/', async (request, replay) => {
    try {
      const createTransactionBodySchema = z.object({
        title: z.string(),
        amount: z.number(),
        type: z.enum(['credit', 'debit']),
      })

      const result = createTransactionBodySchema.safeParse(request.body)
      if (!result.success) {
        return replay.code(400).send({
          message: 'Invalid request body',
          error: result.error.format(),
        })
      }

      let sessionId = request.cookies.sessionId

      if (!sessionId) {
        sessionId = randomUUID()

        replay.cookie('sessionId', sessionId, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 7 days
        })
      }

      const { title, amount, type } = result.data

      const [transaction] = await knex('transactions')
        .insert({
          id: randomUUID(),
          title,
          amount: type === 'credit' ? amount : amount * -1,
          session_id: sessionId,
        })
        .returning('id')

      return replay.code(201).send(transaction)
    } catch (error) {
      console.error('POST Transactions error: ', error)
      return replay.code(500).send()
    }
  })
}
