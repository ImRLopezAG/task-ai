'use client'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import type { Row } from '@tanstack/react-table'

import { Button } from '@ui/button'
import * as DM from '@ui/dropdown-menu'

import { TaskTypeSchema, LabelSchema, PrioritySchema, StatusSchema } from '@type/schema'

import { TaskForm } from '@client/task-form'

import { deleteTask, updateTask } from '@actions/task'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData> ({
  row
}: DataTableRowActionsProps<TData>): JSX.Element {
  const task = TaskTypeSchema.parse(row.original)

  return (
    <section className='flex items-center justify-evenly gap-x-2'>
      <TaskForm id={task.id} />
      <DM.DropdownMenu>
        <DM.DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          >
            <DotsHorizontalIcon className='h-4 w-4' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DM.DropdownMenuTrigger>
        <DM.DropdownMenuContent align='end' className='w-[160px]'>
          <DM.DropdownMenuSub>
            <DM.DropdownMenuSubTrigger>Labels</DM.DropdownMenuSubTrigger>
            <DM.DropdownMenuSubContent>
              <DM.DropdownMenuRadioGroup
                value={task.label}
                onValueChange={ async (value: any) => {
                  const { label, ...rest } = task
                  await updateTask({ id: task.id, task: { label: value as Label, ...rest } })
                }}
              >
                {LabelSchema.options.map((label) => (
                  <DM.DropdownMenuRadioItem key={label} value={label}>
                    {label}
                  </DM.DropdownMenuRadioItem>
                ))}
              </DM.DropdownMenuRadioGroup>
            </DM.DropdownMenuSubContent>
          </DM.DropdownMenuSub>
          <DM.DropdownMenuSub>
            <DM.DropdownMenuSubTrigger>Priority</DM.DropdownMenuSubTrigger>
            <DM.DropdownMenuSubContent>
              <DM.DropdownMenuRadioGroup
                value={task.priority}
                onValueChange={async (value: any) => {
                  const { priority, ...rest } = task
                  await updateTask({
                    id: task.id,
                    task: { priority: value as Priority, ...rest }
                  })
                }}
              >
                {PrioritySchema.options.map((priority) => (
                  <DM.DropdownMenuRadioItem key={priority} value={priority}>
                    {priority}
                  </DM.DropdownMenuRadioItem>
                ))}
              </DM.DropdownMenuRadioGroup>
            </DM.DropdownMenuSubContent>
          </DM.DropdownMenuSub>
          <DM.DropdownMenuSub>
            <DM.DropdownMenuSubTrigger>Status</DM.DropdownMenuSubTrigger>
            <DM.DropdownMenuSubContent>
              <DM.DropdownMenuRadioGroup
                value={task.status}
                onValueChange={async (value: any) => {
                  const { status, ...rest } = task
                  await updateTask({ id: task.id, task: { status: value as Status, ...rest } })
                }}
              >
                {StatusSchema.options.map((status) => (
                  <DM.DropdownMenuRadioItem key={status} value={status}>
                    {status}
                  </DM.DropdownMenuRadioItem>
                ))}
              </DM.DropdownMenuRadioGroup>
            </DM.DropdownMenuSubContent>
          </DM.DropdownMenuSub>
          <DM.DropdownMenuSeparator />
          <DM.DropdownMenuItem
            onClick={async () => {
              await deleteTask({ id: task.id })
            }}
          >
            Delete
            <DM.DropdownMenuShortcut>⌘⌫</DM.DropdownMenuShortcut>
          </DM.DropdownMenuItem>
        </DM.DropdownMenuContent>
      </DM.DropdownMenu>
    </section>
  )
}
