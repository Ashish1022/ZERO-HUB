import 'server-only'

import { cache } from 'react'
import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { redis } from '@/lib/redis'
import { DEFAULT_TEMPLATE_SLUG, resolveRenderableSlug } from '@/templates/registry'

import { tenants } from '../../../../drizzle/schema'


const CACHE_TTL_SECONDS = 60 * 60

export const templateCacheKey = (tenantSlug: string) => `tenant:template:${tenantSlug}`

const NOT_FOUND = '__none__'

const readThrough = async (tenantSlug: string): Promise<string> => {
  const key = templateCacheKey(tenantSlug)

  try {
    const cached = await redis.get(key)
    if (cached === NOT_FOUND) return DEFAULT_TEMPLATE_SLUG
    if (cached) return cached
  } catch (error) {
    console.error(`[templates] Redis read failed for "${tenantSlug}"; falling through to DB.`, error)
  }

  const [row] = await db
    .select({ activeTemplate: tenants.activeTemplate })
    .from(tenants)
    .where(eq(tenants.slug, tenantSlug))
    .limit(1)

  const value = row?.activeTemplate ?? null

  try {
    await redis.set(key, value ?? NOT_FOUND, 'EX', CACHE_TTL_SECONDS)
  } catch (error) {
    console.error(`[templates] Redis write failed for "${tenantSlug}".`, error)
  }

  return value ?? DEFAULT_TEMPLATE_SLUG
}

export const getActiveTemplateSlug = cache(async (tenantSlug: string): Promise<string> => {
  const slug = await readThrough(tenantSlug)
  return resolveRenderableSlug(slug)
})

export const invalidateTemplateCache = async (tenantSlug: string): Promise<void> => {
  try {
    await redis.del(templateCacheKey(tenantSlug))
  } catch (error) {
    console.error(
      `[templates] Failed to invalidate template cache for "${tenantSlug}". ` +
        `The switch is committed; the storefront may lag by up to ${CACHE_TTL_SECONDS}s.`,
      error,
    )
  }
}

export const primeTemplateCache = async (tenantSlug: string, templateSlug: string): Promise<void> => {
  try {
    await redis.set(templateCacheKey(tenantSlug), templateSlug, 'EX', CACHE_TTL_SECONDS)
  } catch (error) {
    console.error(`[templates] Failed to prime template cache for "${tenantSlug}".`, error)
  }
}

export const storefrontCacheTag = (tenantSlug: string) => `storefront:${tenantSlug}`
