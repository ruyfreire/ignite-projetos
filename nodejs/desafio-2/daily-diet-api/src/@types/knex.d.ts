// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  interface Tables {
    users: {
      id: string
      name: string
      created_at: Date
      updated_at: Date
    }

    meals: {
      id: string
      user_id: string
      name: string
      description: string
      date: Date
      is_diet: boolean
      created_at: Date
      updated_at: Date
    }
  }
}
