// prisma.config.ts
import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    // This replaces the old datasource url in schema.prisma
    url: env('DATABASE_URL'),
    // Optionally:
    // directUrl: env('DIRECT_DATABASE_URL'),
    // shadowDatabaseUrl: env('SHADOW_DATABASE_URL'),
  },
})
