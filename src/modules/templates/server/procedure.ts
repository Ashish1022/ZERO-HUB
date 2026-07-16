import { headers as getHeaders } from 'next/headers'

import { baseProcedure, createTRPCRouter, protectedProcedure } from '@/trpc/init'

import {
  activateTemplateSchema,
  claimTemplateSchema,
  completePurchaseSchema,
  createOrderSchema,
  listMarketplaceSchema,
  templateSlugSchema,
} from '../schema'
import {
  activateTemplate,
  claimFreeTemplate,
  completeTemplatePurchase,
  createTemplateOrder,
  deactivateTemplate,
  listMarketplace,
  listOwnedTemplates,
  resolveTenantIdForUser,
  type MarketplaceEntry,
} from './service'

const getOptionalTenantId = async (
  ctx: { db: Awaited<ReturnType<typeof import('payload').getPayload>> },
): Promise<string | null> => {
  try {
    const headers = await getHeaders()
    const session = await ctx.db.auth({ headers })
    if (!session.user) return null
    return await resolveTenantIdForUser(ctx.db, session.user.id)
  } catch {
    return null
  }
}

const applyFilters = (entries: MarketplaceEntry[], input: {
  category?: string
  search?: string
  pricing: 'all' | 'free' | 'paid'
  sort: 'popular' | 'newest' | 'price-low' | 'price-high' | 'name'
}): MarketplaceEntry[] => {
  const search = input.search?.trim().toLowerCase()

  const filtered = entries.filter((entry) => {
    if (input.category && input.category !== 'all' && entry.category !== input.category) {
      return false
    }
    if (input.pricing === 'free' && entry.pricing.model !== 'free') return false
    if (input.pricing === 'paid' && entry.pricing.model !== 'paid') return false

    if (search) {
      const haystack = [entry.name, entry.description, ...entry.tags].join(' ').toLowerCase()
      if (!haystack.includes(search)) return false
    }
    return true
  })

  const sorted = [...filtered]
  switch (input.sort) {
    case 'newest':
      sorted.sort((a, b) => b.version.localeCompare(a.version, undefined, { numeric: true }))
      break
    case 'price-low':
      sorted.sort((a, b) => a.pricing.amount - b.pricing.amount)
      break
    case 'price-high':
      sorted.sort((a, b) => b.pricing.amount - a.pricing.amount)
      break
    case 'name':
      sorted.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'popular':
    default:
      sorted.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) || b.stats.activeInstalls - a.stats.activeInstalls,
      )
  }
  return sorted
}

export const templatesRouter = createTRPCRouter({
  list: baseProcedure.input(listMarketplaceSchema).query(async ({ ctx, input }) => {
    const tenantId = await getOptionalTenantId(ctx)
    const entries = await listMarketplace(ctx.db, tenantId)
    return applyFilters(entries, input)
  }),

  getOne: baseProcedure.input(templateSlugSchema).query(async ({ ctx, input }) => {
    const tenantId = await getOptionalTenantId(ctx)
    const entries = await listMarketplace(ctx.db, tenantId)
    return entries.find((entry) => entry.slug === input.slug) ?? null
  }),

  listOwned: protectedProcedure.query(async ({ ctx }) => {
    const tenantId = await resolveTenantIdForUser(ctx.db, ctx.session.user.id)
    return listOwnedTemplates(ctx.db, tenantId)
  }),

  claim: protectedProcedure.input(claimTemplateSchema).mutation(async ({ ctx, input }) => {
    const tenantId = await resolveTenantIdForUser(ctx.db, ctx.session.user.id)
    return claimFreeTemplate(ctx.db, tenantId, input.slug)
  }),

  createOrder: protectedProcedure.input(createOrderSchema).mutation(async ({ ctx, input }) => {
    const tenantId = await resolveTenantIdForUser(ctx.db, ctx.session.user.id)
    return createTemplateOrder(ctx.db, tenantId, input.slug)
  }),

  completePurchase: protectedProcedure
    .input(completePurchaseSchema)
    .mutation(async ({ ctx, input }) => {
      const tenantId = await resolveTenantIdForUser(ctx.db, ctx.session.user.id)
      return completeTemplatePurchase(ctx.db, tenantId, input)
    }),

  activate: protectedProcedure.input(activateTemplateSchema).mutation(async ({ ctx, input }) => {
    const tenantId = await resolveTenantIdForUser(ctx.db, ctx.session.user.id)
    return activateTemplate(ctx.db, tenantId, input.slug)
  }),

  deactivate: protectedProcedure.mutation(async ({ ctx }) => {
    const tenantId = await resolveTenantIdForUser(ctx.db, ctx.session.user.id)
    return deactivateTemplate(ctx.db, tenantId)
  }),
})
