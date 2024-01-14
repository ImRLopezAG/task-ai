import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import type { NextRequest } from 'next/server'

import { appRouter } from '@server/api/root'
import { createTRPCContext } from '@server/api/trpc'
import { env } from '@utils/env'
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import type { Session } from 'next-auth'
import type * as schema from '@server/db/schema'

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */

interface Returns {
  headers: Headers
  db: PostgresJsDatabase<typeof schema>
  session: Session | null
}
const createContext = async (
  req: NextRequest
): Promise<Returns> => {
  const context = await createTRPCContext({
    headers: req.headers
  })
  return context
}

const handler = async (req: NextRequest): Promise<Response> =>
  await fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: async () => await createContext(req),
    onError:
      env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
            )
          }
        : undefined
  })

export { handler as GET, handler as POST }
