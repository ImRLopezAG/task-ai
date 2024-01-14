'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink, loggerLink, unstable_httpBatchStreamLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import { useState } from 'react'
import { type AppRouter } from '@server/api/root'
import { getUrl, transformer } from '@libs/trpc/shared'

export const clientApi = createTRPCReact<AppRouter>()

type TRPCReactProviderProps = Props & {
  cookies: string
}

function TRPCReactProvider (props: TRPCReactProviderProps): JSX.Element {
  const [queryClient] = useState(() => new QueryClient())

  const [trpcClient] = useState(() =>
    clientApi.createClient({
      transformer,
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === 'development' ||
            (op.direction === 'down' && op.result instanceof Error)
        }),
        unstable_httpBatchStreamLink({
          url: getUrl(),
          headers () {
            return {
              cookie: props.cookies,
              'x-trpc-source': 'react'
            }
          }
        }),
        httpBatchLink({
          url: getUrl(),
          headers () {
            return {
              cookie: props.cookies,
              'x-trpc-source': 'react'
            }
          }
        })
      ]
    })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <clientApi.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </clientApi.Provider>
    </QueryClientProvider>
  )
}

export default TRPCReactProvider
