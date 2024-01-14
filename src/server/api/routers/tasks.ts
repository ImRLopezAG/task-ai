import { z } from 'zod'
import { eq } from 'drizzle-orm'
import {
  createTRPCRouter,
  protectedProcedure
} from '@server/api/trpc'
import { tasks } from '@server/db/schema'
import { TaskTypeSchema } from '@/types/schema'

export const tasksRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ task: TaskTypeSchema }))
    .mutation(async ({ ctx, input }) => {
      const { task } = input
      const result = await ctx.db.insert(tasks).values({
        title: task.title,
        description: task.description,
        status: task.status,
        label: task.label,
        priority: task.priority,
        company: task.company,
        case: task.case,
        estimatedTime: String(task.estimatedTime),
        createdAt: new Date(),
        userId: ctx.session.user.id
      }).returning()

      return result[0]
    }),

  getAll: protectedProcedure
    .query(async ({ ctx }) => {
      const result = await ctx.db
        .select()
        .from(tasks)
        .where(eq(tasks.userId, ctx.session.user.id))

      return result
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), task: TaskTypeSchema }))
    .mutation(async ({ ctx, input }) => {
      const { id, task } = input
      const {
        title,
        description,
        status,
        label,
        priority,
        company,
        case: caseValue
      } = task
      const result = await ctx.db
        .update(tasks)
        .set({
          title,
          description,
          status,
          label,
          priority,
          company,
          case: caseValue
        })
        .where(eq(tasks.id, id))

      return result[0]
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input
      const result = await ctx.db.delete(tasks).where(eq(tasks.id, id))

      return result[0]
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id: entity } = input
      const result = await ctx.db.query.tasks.findFirst({
        where ({ id }, { eq }) {
          return eq(id, entity)
        }
      })
      return result
    })
})
