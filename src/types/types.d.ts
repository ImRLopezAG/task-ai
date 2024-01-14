import type { z } from 'zod'
import type { LabelSchema, PrioritySchema, StatusSchema, TaskTypeSchema } from './schema'

export declare global {
  export type Label = z.infer<typeof LabelSchema>
  export type Priority = z.infer<typeof PrioritySchema>
  export type Status = z.infer<typeof StatusSchema>
  export type TaskType = z.infer<typeof TaskTypeSchema>
  export interface Props {
    children: React.ReactNode
  }
}
