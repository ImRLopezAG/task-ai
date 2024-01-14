'use client'
import type { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from '@tanstack/react-table'

import { flexRender, getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableIterableCell, TableIterableRow } from '@ui/table'
import { For } from '@ui/for'

import { useState } from 'react'
import { DataTablePagination } from './data-table-pagination'
import { DataTableToolbar } from './data-table-toolbar'

interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>
  data: TData[]
}

export function DataTable<TData, TValue> ({ columns, data }: DataTableProps<TData, TValue>): JSX.Element {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  })
  const hasRows = table.getRowModel().rows?.length
  return (
    <div className='space-y-4'>
      <DataTableToolbar table={table} />
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableIterableRow each={table.getHeaderGroups()}>
              {({ headers, id }) => (
                <For each={headers} key={id}>
                  {({ colSpan, isPlaceholder, column, getContext }) => (
                    <TableHead colSpan={colSpan}>
                      {!isPlaceholder && flexRender(column.columnDef.header, getContext())}
                    </TableHead>
                  )}
                </For>
              )}
            </TableIterableRow>
          </TableHeader>
          <TableBody>
            {
              hasRows
                ? (
                    <TableIterableRow each={table.getRowModel().rows}>
                      {({ getVisibleCells }) => (
                        <TableIterableCell each={getVisibleCells()} className='max-w-36'>
                          {({ column, getContext }) => (
                            <>
                              {flexRender(column.columnDef.cell, getContext())}
                            </>
                          )}
                        </TableIterableCell>
                      )}
                    </TableIterableRow>
                  )
                : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className='h-24     text-center'>
                        No tasks yet.
                      </TableCell>
                    </TableRow>
                  )
            }
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
