import { relations, sql } from 'drizzle-orm'
import type { AdapterAccount } from 'next-auth/adapters'
import {
  text,
  varchar,
  timestamp,
  index,
  primaryKey,
  integer,
  uuid,
  pgTableCreator,
  decimal
} from 'drizzle-orm/pg-core'

export const myPgTable = pgTableCreator((name) => `task-dextra_${name}`)
/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const tasks = myPgTable(
  'task',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 50 }).notNull(),
    description: text('description').notNull().default(''),
    status: varchar('status', { length: 20 }).$type<Status>().notNull(),
    label: varchar('label', { length: 20 }).$type<Label>().notNull(),
    priority: varchar('priority', { length: 20 }).$type<Priority>().notNull(),
    estimatedTime: decimal('estimatedTime', { precision: 2, scale: 2 })
      .notNull()
      .default('0.00'),
    case: varchar('case', { length: 10 }).notNull(),
    company: varchar('company', { length: 50 }).notNull(),
    userId: varchar('userId', { length: 255 }).notNull(),
    createdAt: timestamp('createdAt', { mode: 'date' }).default(
      sql`CURRENT_TIMESTAMP`
    ),
    updatedAt: timestamp('updatedAt', { mode: 'date' }).default(
      sql`CURRENT_TIMESTAMP`
    )
  },
  (task) => ({
    userIdIdx: index('tasks_userId_idx').on(task.userId)
  })
)

export const taskRelations = relations(tasks, ({ one }) => ({
  user: one(users, { fields: [tasks.userId], references: [users.id] })
}))

export const users = myPgTable('user', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  emailVerified: timestamp('emailVerified', {
    mode: 'date',
    precision: 3
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar('image', { length: 255 })
})

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  tasks: many(tasks)
}))

export const accounts = myPgTable(
  'account',
  {
    userId: varchar('userId', { length: 255 }).notNull(),
    type: varchar('type', { length: 255 })
      .$type<AdapterAccount['type']>()
      .notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: text('id_token'),
    session_state: varchar('session_state', { length: 255 })
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index('acc_userId_idx').on(account.userId)
  })
)

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] })
}))

export const sessions = myPgTable(
  'session',
  {
    sessionToken: varchar('sessionToken', { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar('userId', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull()
  },
  (session) => ({
    userIdIdx: index('session_userId_idx').on(session.userId)
  })
)

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] })
}))

export const verificationTokens = myPgTable(
  'verificationToken',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull()
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token)
  })
)
