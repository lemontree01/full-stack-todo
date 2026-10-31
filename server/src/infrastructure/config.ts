import { z } from 'zod'

const Env = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  NODE_ENV: z.string().default('development'),
})

export type Config = z.infer<typeof Env>

export const loadConfig = (): Config => {
  try {
    process.loadEnvFile()
  } catch {
    // No .env file (e.g. on Vercel): variables come from the environment.
  }
  return Env.parse(process.env)
}
