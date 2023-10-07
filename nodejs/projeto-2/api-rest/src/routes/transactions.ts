import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'
import { z } from 'zod'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async (request, replay) => {
    const transactions = await knex('transactions').select('*')

    return replay.code(200).send({ transactions })
  })

  app.get('/:id', async (request, replay) => {
    const getTransactionsParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const result = getTransactionsParamsSchema.safeParse(request.params)
    if (!result.success) {
      return replay.code(400).send({
        message: 'Request params, invalid uuid',
      })
    }

    const { id } = result.data

    const transaction = await knex('transactions').where('id', id).first()

    if (!transaction) {
      return replay.code(404).send({
        message: 'Transaction not found',
      })
    }

    return replay.code(200).send({ transaction })
  })

  app.get('/summary', async (request, replay) => {
    const summary = await knex('transactions')
      .sum('amount', { as: 'amount' })
      .first()

    return replay.code(200).send({ summary })
  })

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

      const { title, amount, type } = result.data

      const [transaction] = await knex('transactions')
        .insert({
          id: randomUUID(),
          title,
          amount: type === 'credit' ? amount : amount * -1,
        })
        .returning('id')

      return replay.code(201).send(transaction)
    } catch (error) {
      console.error('POST Transactions error: ', error)
      return replay.code(500).send()
    }
  })
}
