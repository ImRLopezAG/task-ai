import type { z } from 'zod'
import type { LabelSchema, PrioritySchema, StatusSchema, TaskTypeSchema } from './task.schema'
import type { IssueSchema } from './issues.schema'

export declare global {
  export type Label = z.infer<typeof LabelSchema>
  export type Priority = z.infer<typeof PrioritySchema>
  export type Status = z.infer<typeof StatusSchema>
  export type TaskType = z.infer<typeof TaskTypeSchema>
  export type IssueType = z.infer<typeof IssueSchema>
  export interface Props {
    children: React.ReactNode
  }
}
