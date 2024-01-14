import { z } from 'zod'

export const LabelSchema = z.enum(['bug', 'documentation', 'feature', 'development', 'lifting', 'internal', 'personal'])
export const PrioritySchema = z.enum(['high', 'low', 'medium'])

export const StatusSchema = z.enum([
  'backlog',
  'canceled',
  'done',
  'in progress',
  'task',
  'archived',
  'personal'
])

export const TaskTypeSchema = z.object({
  id: z.string(),
  title: z.string().min(3).max(50),
  description: z.string(),
  status: StatusSchema,
  label: LabelSchema,
  priority: PrioritySchema,
  estimatedTime: z.string().transform((val) => val.replace(/[^0-9]/g, '')),
  case: z.string().trim().toUpperCase(),
  company: z.string().trim().toUpperCase(),
  userId: z.string(),
  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional()
}).strict()
