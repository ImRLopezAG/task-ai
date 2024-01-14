import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    ATLASSIAN_CLIENT_ID: z.string(),
    ATLASSIAN_CLIENT_SECRET: z.string(),
    DATABASE_URL: z.string(),
    NEXTAUTH_SECRET: z.string(),
    AI_KEY: z.string()
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    ATLASSIAN_CLIENT_ID: process.env.ATLASSIAN_CLIENT_ID,
    ATLASSIAN_CLIENT_SECRET: process.env.ATLASSIAN_CLIENT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    AI_KEY: process.env.AI_KEY
  },
  emptyStringAsUndefined: true
})
