'use server'
import { api } from '@libs/trpc'
import { revalidatePath } from 'next/cache'

interface TaskMGN {
  task: TaskType
  id: string
}

export const addTask = async ({ task }: Omit<TaskMGN, 'id'>): Promise<TaskType> => {
  const newTask = await api.tasks.create.mutate({ task })
  revalidatePath('/')
  return newTask
}

export const getTasks = async (): Promise<TaskType[]> => await api.tasks.getAll.query()

export const updateTask = async ({ task, id }: TaskMGN): Promise<TaskType> => {
  const updatedTask = await api.tasks.update.mutate({ task, id })
  revalidatePath('/')
  return updatedTask
}

export const deleteTask = async ({ id }: Omit<TaskMGN, 'task'>): Promise<TaskType> => {
  const deletedTask = await api.tasks.delete.mutate({ id })
  revalidatePath('/')
  return deletedTask
}

export const getTask = async ({ id }: Omit<TaskMGN, 'task'>): Promise<TaskType | undefined > => await api.tasks.getOne.query({ id })
