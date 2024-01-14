import { ThemeProvider, TRPCProvider, SessionProvider } from '@app/providers'
import { cookies } from 'next/headers'
import { getServerAuthSession } from '@server/auth'
import { Toaster } from '@ui/toaster'

export const Wrapper: React.FC<Props> = async ({ children }) => {
  const session = await getServerAuthSession()
  return (
    <SessionProvider session={session}>
      <TRPCProvider cookies={cookies().toString()}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </TRPCProvider>
    </SessionProvider>
  )
}
