'use client'

import { Button } from '@ui/button'
import { signIn } from 'next-auth/react'
import { AtlassianIcon } from '@components/icons'

interface UserAuthFormProps {
  token: string
}

export function UserAuthForm ({ token }: UserAuthFormProps): JSX.Element {
  return (
    <Button className='flex flex-row gap-x-3' variant='outline' onClick={async () => {
      await signIn('atlassian', {
        callbackUrl: '/',
        csrfToken: token,
        redirect: false
      })
    }}>
    <AtlassianIcon />
    Sign In with Jira
  </Button>
  )
}
