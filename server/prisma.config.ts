import { defineConfig } from 'prisma/config'

try {
  process.loadEnvFile()
} catch {
  // No .env file (e.g. on Vercel): variables come from the environment.
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations' },
  // Migrations need a direct connection; Neon's pooled DATABASE_URL is for the app at runtime.
  datasource: { url: process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL },
})
