import './globals.css'
import { Wrapper } from '@app/wrapper'
import { cookies } from 'next/headers'
import { cn } from '@libs/utils'

export default function RootLayout ({ children }: Props): React.ReactElement {
  const isAuth = cookies().has('x-auth-token')
  return (
    <html lang='en' className='dark' suppressHydrationWarning>
      <body className={cn('bg-background antialiased relative',
        !isAuth && 'overflow-hidden'
      )}>
        <Wrapper>
          {children}
        </Wrapper>
      </body>
    </html>
  )
}
