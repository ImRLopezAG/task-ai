import { z } from 'zod'

export const LabelSchema = z.enum([
  'bug',
  'documentation',
  'feature',
  'development',
  'lifting',
  'internal',
  'personal'
])
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

export const TaskTypeSchema = z
  .object({
    id: z.string(),
    title: z.string().min(3).max(50),
    description: z.string(),
    status: StatusSchema,
    label: LabelSchema,
    priority: PrioritySchema,
    estimatedTime: z.coerce.string(),
    case: z.coerce
      .string()
      .trim()
      .toUpperCase()
      .transform((val) => {
        if (val === '') return 'NONE'
        else return val
      }),
    company: z.coerce
      .string()
      .trim()
      .toUpperCase()
      .transform((val) => {
        if (val === '') return 'NONE'
        else return val
      }),
    userId: z.string(),
    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional()
  })
  .strict()
