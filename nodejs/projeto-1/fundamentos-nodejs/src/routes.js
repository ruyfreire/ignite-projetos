import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildUrlPath } from './utils/build-url-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildUrlPath('/users'),
    handler: (req, res) => {
      const { search } = req.query

      let filter = undefined

      if (search) {
        filter = {
          name: search,
          email: search
        }
      }

      const users = database.select('users', filter)

      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: buildUrlPath('/users'),
    handler: (req, res) => {
      const { name, email } = req.body

      const user = {
        id: randomUUID(),
        name,
        email
      }

      database.insert('users', user)

      return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildUrlPath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { name, email } = req.body

      database.update('users', id, { name, email })

      return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildUrlPath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params

      database.delete('users', id)

      return res.writeHead(204).end()
    }
  }
]
