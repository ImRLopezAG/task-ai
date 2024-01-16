import { DrizzleAdapter } from '@auth/drizzle-adapter'
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  type Session
} from 'next-auth'
import AtlassianProvider from 'next-auth/providers/atlassian'
import { eq } from 'drizzle-orm'
import { env } from '@utils/env'
import { db } from '@server/db'
import { myPgTable } from '@server/db/schema'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      account: string
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user']
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, user }) => {
      const account = await db.query.accounts.findFirst({
        where: (a) => eq(a.userId, user.id)
      })
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          account: account?.providerAccountId
        }
      }
    }
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  adapter: DrizzleAdapter(db, myPgTable),
  providers: [
    AtlassianProvider({
      clientId: env.ATLASSIAN_CLIENT_ID,
      clientSecret: env.ATLASSIAN_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:jira-work read:jira-user offline_access read:me'
        }
      }
    })
  ],
  secret: env.NEXTAUTH_SECRET,
  session: {
    maxAge: 30 * 24 * 60 * 60 // 30 days,
  },
  useSecureCookies: env.NODE_ENV === 'production'
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = async (): Promise<Session | null> =>
  await getServerSession(authOptions)
