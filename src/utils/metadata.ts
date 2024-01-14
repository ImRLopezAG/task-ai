import type { Metadata } from 'next'

type Tab = 'Home' | 'Login' | undefined

interface ITab {
  tab?: Tab
}

export const getMetadata = ({ tab = 'Home' }: ITab): Metadata => {
  return {
    title: `Tasks | ${tab}`,
    description:
      'This is an app to save your tasks and manage them in a better way in the office',
    authors: [
      {
        name: 'Angel Gabriel Lopez',
        url: 'https://imrlopez.vercel.app'
      }
    ],
    creator: 'Angel Gabriel Lopez',
    applicationName: 'Tech Path'
  }
}
