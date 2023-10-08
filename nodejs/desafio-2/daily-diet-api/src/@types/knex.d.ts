import { Knex } from 'knex'

declare module 'knex/types/tables' {
  interface Tables {
    users: {
      id: string
      name: string
      login: string
      password: string
      created_at: Date
      updated_at: Date
    }
  }
}
