import cookie from '@fastify/cookie'
import fastify from 'fastify'

export const app = fastify()

app.register(cookie)

app.get('/', async () => {
  return {
    hello: 'world',
  }
})
