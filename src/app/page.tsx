import { App } from '@components/server/dashboard'
import { getServerAuthSession } from '@server/auth'
import { UserAuthForm } from '@client/login'
import { getCsrfToken } from 'next-auth/react'

export default async function Home (): Promise<JSX.Element> {
  const session = await getServerAuthSession()
  const csrfToken = await getCsrfToken()
  return (
    <>
      {
        session
          ? (
            <App />

            )
          : (
          <div className='flex min-h-screen flex-col items-center justify-center py-2'>
            <h1>Please log in</h1>
            <UserAuthForm token={csrfToken ?? ''} />
          </div>
            )
      }
    </>
  )
}
