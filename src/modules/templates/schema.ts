import { z } from 'zod'

const templateSlug = z
  .string()
  .min(1, 'Template slug is required')
  .max(50)
  .regex(/^[a-z0-9-]+$/, 'Invalid template slug')

export const templateSlugSchema = z.object({
  slug: templateSlug,
})

export const claimTemplateSchema = z.object({
  slug: templateSlug,
})

export const createOrderSchema = z.object({
  slug: templateSlug,
})

export const completePurchaseSchema = z.object({
  orderId: z.string().min(1),
  paymentId: z.string().min(1),
  signature: z.string().min(1),
})

export const activateTemplateSchema = z.object({
  slug: templateSlug,
})

export const listMarketplaceSchema = z
  .object({
    category: z.string().optional(),
    search: z.string().max(100).optional(),
    pricing: z.enum(['all', 'free', 'paid']).default('all'),
    sort: z.enum(['popular', 'newest', 'price-low', 'price-high', 'name']).default('popular'),
  })
  .default({ pricing: 'all', sort: 'popular' })

export type ListMarketplaceInput = z.infer<typeof listMarketplaceSchema>
