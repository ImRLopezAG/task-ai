import { type Config } from 'drizzle-kit'

import { env } from '@utils/env'

export default {
  schema: './src/server/db/schema.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.DATABASE_URL,
    ssl: true
  },
  tablesFilter: ['task-dextra_*']
} satisfies Config
