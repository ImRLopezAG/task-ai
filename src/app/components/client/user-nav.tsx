'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar'
import { Button } from '@ui/button'
import * as DM from '@ui/dropdown-menu'
import { useTheme } from 'next-themes'
import { useSession, signOut } from 'next-auth/react'

export function UserNav (): JSX.Element {
  const { setTheme } = useTheme()
  const session = useSession()
  const { name, email, image } = session?.data?.user ?? { name: null, email: null, image: null }
  return (
    <DM.DropdownMenu>
      <DM.DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative size-8 rounded-full'>
          <Avatar className='size-8'>
            {image
              ? (
              <AvatarImage src={image} alt={name ?? 'Dextra image'} />
                )
              : (
              <AvatarFallback>{name}</AvatarFallback>
                )}
            <AvatarFallback>DX</AvatarFallback>
          </Avatar>
        </Button>
      </DM.DropdownMenuTrigger>
      <DM.DropdownMenuContent className='w-56' align='end' forceMount>
        <DM.DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{name}</p>
            <p className='text-xs leading-none text-muted-foreground'>
              {email}
            </p>
          </div>
        </DM.DropdownMenuLabel>
        <DM.DropdownMenuSeparator />
        <DM.DropdownMenuGroup>
          <DM.DropdownMenuSub>
            <DM.DropdownMenuSubTrigger>Theme</DM.DropdownMenuSubTrigger>
            <DM.DropdownMenuPortal>
              <DM.DropdownMenuSubContent>
                <DM.DropdownMenuItem
                  onClick={() => {
                    setTheme('light')
                  }}
                >
                  Light
                </DM.DropdownMenuItem>
                <DM.DropdownMenuItem
                  onClick={() => {
                    setTheme('dark')
                  }}
                >
                  Dark
                </DM.DropdownMenuItem>
                <DM.DropdownMenuSeparator />
                <DM.DropdownMenuItem
                  onClick={() => {
                    setTheme('system')
                  }}
                >
                  System
                </DM.DropdownMenuItem>
              </DM.DropdownMenuSubContent>
            </DM.DropdownMenuPortal>
          </DM.DropdownMenuSub>
        </DM.DropdownMenuGroup>
        <DM.DropdownMenuSeparator />
        <DM.DropdownMenuItem
          onClick={async () => {
            await signOut()
          }}
        >
          Log out
        </DM.DropdownMenuItem>
      </DM.DropdownMenuContent>
    </DM.DropdownMenu>
  )
}
