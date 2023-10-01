import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'
import { z } from 'zod'

export async function transactionsRoutes(app: FastifyInstance) {
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

  app.get('/', async () => {
    const transactions = await knex('transactions').select('*')

    return transactions
  })
}
