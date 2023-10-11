import cookie from '@fastify/cookie'
import fastify from 'fastify'
import { authentication } from './middlewares/authentication'
import { userRoutes } from './routes/users'
import { mealRoutes } from './routes/meals'

export const app = fastify()

app.register(cookie)
app.addHook('preHandler', authentication)

app.register(userRoutes, {
  prefix: 'users',
})

app.register(mealRoutes, {
  prefix: 'meals',
})
