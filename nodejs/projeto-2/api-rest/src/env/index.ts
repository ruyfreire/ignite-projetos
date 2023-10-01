import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  PORT: z.number().default(3333),
  DATABASE_URL: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('⚠️ Invalid environment variables:\n', _env.error.format())
  process.exit(1)
}

export const env = _env.data
