'use client'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

type SessionProviderProps = Props & {
  session: Session | null
}

function SessionProviders ({ children, session }: SessionProviderProps): JSX.Element {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

export default SessionProviders
