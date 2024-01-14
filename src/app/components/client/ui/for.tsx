import { Fragment } from 'react'
import { Slot } from '@radix-ui/react-slot'

interface Iterable<T = any> {
  each: T[]
  children: (item: T, key: string) => JSX.Element
}

export const For = <T = any>({ each, children }: Iterable<T>): JSX.Element => (
  <Fragment>
    {each.map((item) => {
      const key = crypto.randomUUID()
      return (
        <Slot key={key}>
          {children(item, key)}
        </Slot>
      )
    })}
  </Fragment>
)
