import type { Metadata } from 'next'

type Tab = 'Home' | 'Login' | 'Features' | 'Subjects' | undefined

interface ITab {
  tab?: Tab
}

export const getMetadata = ({ tab = 'Home' }: ITab): Metadata => {
  return {
    title: `Tech Path | ${tab}`,
    manifest: '/manifest.json',
    description:
      'Tech Path is a platform for ITLA students for the management of their academic life, this platform is made by students for students and does not have any commercial purpose or any other type of purpose other than to help students. the purpose of this platform is upgrade the performance of Sigei platform and make it more friendly for students.',
    authors: [
      {
        name: 'Angel Gabriel Lopez',
        url: 'https://imrlopez.dev'
      }
    ],
    creator: 'Angel Gabriel Lopez',
    abstract:
      'Tech Path, created by students for students, aims to enhance the academic life management for ITLA students. It seeks to improve the performance of the Sigei platform, making it more user-friendly, with no commercial intentions.',
    applicationName: 'Tech Path'
  }
}
