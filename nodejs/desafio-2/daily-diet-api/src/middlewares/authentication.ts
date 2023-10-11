import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const publicPaths = ['POST:/users']

export async function authentication(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const fullPath = `${request.method}:${request.url}`

  if (!publicPaths.includes(fullPath)) {
    const headerSchema = z.object({
      user_id: z.string().uuid(),
    })

    const result = headerSchema.safeParse(request.cookies)

    if (!result.success) {
      return replay.status(401).send({
        message: 'Invalid user_id cookie',
      })
    }
  }
}
