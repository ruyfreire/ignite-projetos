import { randomUUID } from 'node:crypto'

import { buildUrlPath } from './utils/build-url-path.js'
import { Database } from './database.js'

const db = new Database()

export const routes = [
  {
    path: buildUrlPath('/tasks'),
    method: 'GET',
    handler: (req, res) => {
      // TODO - Receber busca via query params
      const tasks = db.select('tasks')
      res.end(JSON.stringify(tasks))
    }
  },
  {
    path: buildUrlPath('/tasks'),
    method: 'POST',
    handler: (req, res) => {
      if (!req.body.title || typeof req.body.title !== 'string') {
        return res.writeHead(400).end(
          JSON.stringify({
            error: '`title` is required and must be a string'
          })
        )
      }

      if (!req.body.description || typeof req.body.description !== 'string') {
        return res.writeHead(400).end(
          JSON.stringify({
            error: '`description` is required and must be a string'
          })
        )
      }

      const task = {
        id: randomUUID(),
        title: req.body.title,
        description: req.body.description,
        created_at: new Date(),
        updated_at: new Date(),
        completed_at: null
      }

      db.insert('tasks', task)

      res.writeHead(201).end(JSON.stringify(task))
    }
  },
  {
    path: buildUrlPath('/tasks/:id'),
    method: 'PUT',
    handler: (req, res) => {
      if (!req.body.title || typeof req.body.title !== 'string') {
        return res.writeHead(400).end(
          JSON.stringify({
            error: '`title` is required and must be a string'
          })
        )
      }

      if (!req.body.description || typeof req.body.description !== 'string') {
        return res.writeHead(400).end(
          JSON.stringify({
            error: '`description` is required and must be a string'
          })
        )
      }

      const task = {
        updated_at: new Date()
      }
      if (req.body.title) task.title = req.body.title
      if (req.body.description) task.description = req.body.description

      const updated = db.update('tasks', req.params.id, task)

      if (updated) {
        res.writeHead(200).end(JSON.stringify(updated))
      } else {
        res.writeHead(404).end(JSON.stringify({ error: 'Task not found' }))
      }
    }
  },
  {
    path: buildUrlPath('/tasks/:id'),
    method: 'DELETE',
    handler: (req, res) => {
      const deleted = db.delete('tasks', req.params.id)

      if (deleted) {
        res.writeHead(204).end()
      } else {
        res.writeHead(404).end(JSON.stringify({ error: 'Task not found' }))
      }
    }
  }
]
