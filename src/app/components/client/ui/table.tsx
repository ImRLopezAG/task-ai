import * as React from 'react'

import { cn } from '@/lib/utils'

interface Iterable<T = any> {
  each: T[]
  children: (item: T, key: string) => JSX.Element
  className?: string
}

const Table = React.forwardRef< HTMLTableElement, React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className='relative w-full overflow-auto'>
    <table
      ref={ref}
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  </div>
))
Table.displayName = 'Table'

const TableHeader = React.forwardRef< HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
))
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef< HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
))
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef< HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0',
      className
    )}
    {...props}
  />
))
TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef< HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
      className
    )}
    {...props}
  />
))

TableRow.displayName = 'TableRow'
const TableIterableRow = <T = any>({ each, children, className }: Iterable<T>): JSX.Element => (
  <>
    {each.map((item) => {
      const key = crypto.randomUUID()
      return (
        <TableRow key={key} className={className}>
          {children(item, key)}
        </TableRow>
      )
    })}
  </>
)

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className
    )}
    {...props}
  />
))
TableHead.displayName = 'TableHead'
const TableIterableHead = React.forwardRef<HTMLTableCellElement, Iterable<React.ThHTMLAttributes<HTMLTableCellElement>>>((
  { each, children, className, ...props },
  ref
) => (
  <>
    {each.map((item) => {
      const key = crypto.randomUUID()
      return (
        <TableHead key={key} className={className} ref={ref} {...props}>
          {children(item, key)}
        </TableHead>
      )
    })}
  </>
))
TableIterableHead.displayName = 'TableIterableHead'

const TableCell = React.forwardRef< HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className
    )}
    {...props}
  />
))
TableCell.displayName = 'TableCell'
const TableIterableCell = <T = any>({ each, children, className }: Iterable<T>): JSX.Element => (
  <>
    {each.map((item) => {
      const key = crypto.randomUUID()
      return (
        <TableCell key={key} className={className}>
          {children(item, key)}
        </TableCell>
      )
    })}
  </>
)

const TableCaption = React.forwardRef< HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-muted-foreground', className)}
    {...props}
  />
))
TableCaption.displayName = 'TableCaption'

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader, TableIterableCell, TableIterableHead, TableIterableRow, TableRow
}
