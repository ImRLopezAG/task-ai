import * as z from 'zod'

export const PropertiesSchema = z.object({
})

export const ProjectCategorySchema = z.object({
  self: z.string(),
  id: z.string(),
  name: z.string(),
  description: z.string()
})

export const AvatarUrlsSchema = z.object({
  '48x48': z.string(),
  '24x24': z.string(),
  '16x16': z.string(),
  '32x32': z.string()
})

export const IssueSchema = z.object({
  self: z.string(),
  id: z.string(),
  key: z.string(),
  name: z.string(),
  avatarUrls: AvatarUrlsSchema,
  projectCategory: z.union([ProjectCategorySchema, z.null()]).optional(),
  projectTypeKey: z.string(),
  simplified: z.boolean(),
  style: z.string(),
  isPrivate: z.boolean(),
  properties: PropertiesSchema
})
