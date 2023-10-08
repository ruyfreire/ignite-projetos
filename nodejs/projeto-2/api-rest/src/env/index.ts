import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
  DATABASE_CLIENT: z.enum(['sqlite3', 'pg']),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('⚠️ Invalid environment variables:\n', _env.error.format())
  process.exit(1)
}

export const env = _env.data
