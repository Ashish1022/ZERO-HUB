import 'server-only'

import type { BasePayload, PayloadRequest } from 'payload'
import { TRPCError } from '@trpc/server'

import type { Template, TenantTemplate, User } from '@/payload-types'
import { DEFAULT_TEMPLATE_SLUG, getManifest } from '@/templates/registry'

import { getPaymentProvider } from './payments'
import { primeTemplateCache } from './resolver'

export const resolveTenantIdForUser = async (
  payload: BasePayload,
  userId: string,
): Promise<string> => {
  const user = (await payload.findByID({
    collection: 'users',
    id: userId,
    depth: 0,
  })) as User | null

  if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found.' })

  const tenantId = user.tenants?.[0]?.tenant
  if (!tenantId) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Your account is not linked to a store.',
    })
  }

  return typeof tenantId === 'string' ? tenantId : tenantId.id
}

const getTemplateBySlugOrThrow = async (payload: BasePayload, slug: string): Promise<Template> => {
  const { docs } = await payload.find({
    collection: 'templates',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    pagination: false,
  })

  const template = docs[0]
  if (!template) {
    throw new TRPCError({ code: 'NOT_FOUND', message: `Template "${slug}" does not exist.` })
  }
  return template
}

const findEntitlement = async (
  payload: BasePayload,
  tenantId: string,
  templateId: string,
  req?: Partial<PayloadRequest>,
): Promise<TenantTemplate | undefined> => {
  const { docs } = await payload.find({
    collection: 'tenant-templates',
    where: {
      and: [{ tenant: { equals: tenantId } }, { template: { equals: templateId } }],
    },
    limit: 1,
    depth: 0,
    pagination: false,
    req,
  })
  return docs[0]
}

export interface MarketplaceEntry {
  slug: string
  name: string
  description: string
  version: string
  category: string
  tags: string[]
  author: string
  thumbnail: string
  screenshots: string[]
  features: string[]
  pricing: {
    model: 'free' | 'paid'
    amount: number
    compareAtAmount?: number | null
    currency: string
    discountPercent: number | null
  }
  featured: boolean
  stats: {
    purchaseCount: number
    activeInstalls: number
    ratingAverage: number
    ratingCount: number
  }
  owned: boolean
  active: boolean
  updateAvailable: boolean
  installedVersion: string | null
}

const computeDiscountPercent = (amount: number, compareAt?: number | null): number | null => {
  if (!compareAt || compareAt <= amount) return null
  return Math.round(((compareAt - amount) / compareAt) * 100)
}

export const listMarketplace = async (
  payload: BasePayload,
  tenantId: string | null,
): Promise<MarketplaceEntry[]> => {
  const [{ docs: templates }, entitlements] = await Promise.all([
    payload.find({
      collection: 'templates',
      where: { status: { equals: 'published' } },
      sort: ['-featured', '-stats.activeInstalls', 'name'],
      limit: 200,
      depth: 0,
      pagination: false,
    }),
    tenantId
      ? payload
          .find({
            collection: 'tenant-templates',
            where: {
              and: [{ tenant: { equals: tenantId } }, { status: { not_equals: 'revoked' } }],
            },
            limit: 200,
            depth: 0,
            pagination: false,
          })
          .then((result) => result.docs)
      : Promise.resolve([]),
  ])

  const byTemplateId = new Map<string, TenantTemplate>(
    entitlements.map((entitlement) => [
      typeof entitlement.template === 'string' ? entitlement.template : entitlement.template.id,
      entitlement,
    ]),
  )

  return templates.map((template) => {
    const entitlement = byTemplateId.get(template.id)
    const installedVersion = entitlement?.installedVersion ?? null

    return {
      slug: template.slug,
      name: template.name,
      description: template.description,
      version: template.version,
      category: template.category,
      tags: (template.tags ?? []).map((row) => row.tag),
      author: template.author,
      thumbnail: template.thumbnail,
      screenshots: (template.screenshots ?? []).map((row) => row.url),
      features: (template.features ?? []).map((row) => row.feature),
      pricing: {
        model: template.pricing.model,
        amount: template.pricing.amount,
        compareAtAmount: template.pricing.compareAtAmount,
        currency: template.pricing.currency,
        discountPercent: computeDiscountPercent(
          template.pricing.amount,
          template.pricing.compareAtAmount,
        ),
      },
      featured: Boolean(template.featured),
      stats: {
        purchaseCount: template.stats?.purchaseCount ?? 0,
        activeInstalls: template.stats?.activeInstalls ?? 0,
        ratingAverage: template.stats?.ratingAverage ?? 0,
        ratingCount: template.stats?.ratingCount ?? 0,
      },
      owned: Boolean(entitlement),
      active: entitlement?.status === 'active',
      updateAvailable: Boolean(installedVersion && installedVersion !== template.version),
      installedVersion,
    }
  })
}

interface GrantEntitlementArgs {
  payload: BasePayload
  tenantId: string
  template: Template
  source: TenantTemplate['source']
  purchaseId?: string
  req?: Partial<PayloadRequest>
}

const grantEntitlement = async ({
  payload,
  tenantId,
  template,
  source,
  purchaseId,
  req,
}: GrantEntitlementArgs): Promise<TenantTemplate> => {
  const existing = await findEntitlement(payload, tenantId, template.id, req)

  if (existing) {
    if (existing.status !== 'revoked' && existing.source === source) return existing

    return (await payload.update({
      collection: 'tenant-templates',
      id: existing.id,
      data: {
        status: existing.status === 'revoked' ? 'inactive' : existing.status,
        source,
        purchase: purchaseId ?? existing.purchase,
        installedVersion: template.version,
      },
      req,
    })) as TenantTemplate
  }

  return (await payload.create({
    collection: 'tenant-templates',
    data: {
      tenant: tenantId,
      template: template.id,
      status: 'inactive',
      source,
      purchase: purchaseId,
      installedVersion: template.version,
    },
    req,
  })) as TenantTemplate
}

export const listOwnedTemplates = async (payload: BasePayload, tenantId: string) => {
  const { docs } = await payload.find({
    collection: 'tenant-templates',
    where: {
      and: [{ tenant: { equals: tenantId } }, { status: { not_equals: 'revoked' } }],
    },
    depth: 1,
    limit: 100,
    sort: '-createdAt',
    pagination: false,
  })

  return docs.map((entitlement) => {
    const template = entitlement.template as Template
    return {
      slug: template.slug,
      name: template.name,
      thumbnail: template.thumbnail,
      status: entitlement.status,
      source: entitlement.source,
      installedVersion: entitlement.installedVersion,
      latestVersion: template.version,
      updateAvailable: Boolean(
        entitlement.installedVersion && entitlement.installedVersion !== template.version,
      ),
      activatedAt: entitlement.activatedAt,
    }
  })
}

export const resolveTenantIdBySlug = async (
  payload: BasePayload,
  tenantSlug: string,
): Promise<string> => {
  const { docs } = await payload.find({
    collection: 'tenants',
    where: { slug: { equals: tenantSlug } },
    limit: 1,
    depth: 0,
    pagination: false,
  })

  const tenant = docs[0]
  if (!tenant) throw new TRPCError({ code: 'NOT_FOUND', message: `No store with slug "${tenantSlug}".` })
  return tenant.id
}

export const grantTemplateToTenant = async (
  payload: BasePayload,
  tenantId: string,
  templateSlug: string,
): Promise<{ slug: string; owned: true }> => {
  const template = await getTemplateBySlugOrThrow(payload, templateSlug)

  if (template.status === 'draft') {
    throw new TRPCError({ code: 'BAD_REQUEST', message: `"${template.name}" is still a draft.` })
  }

  await grantEntitlement({ payload, tenantId, template, source: 'grant' })
  return { slug: template.slug, owned: true }
}

export const claimFreeTemplate = async (
  payload: BasePayload,
  tenantId: string,
  templateSlug: string,
): Promise<{ slug: string; owned: true }> => {
  const template = await getTemplateBySlugOrThrow(payload, templateSlug)

  if (template.pricing.model !== 'free') {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `"${template.name}" is a paid template. Purchase it instead.`,
    })
  }
  if (template.status !== 'published') {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `"${template.name}" is not available.`,
    })
  }

  await grantEntitlement({ payload, tenantId, template, source: 'free' })
  return { slug: template.slug, owned: true }
}

export interface TemplateOrder {
  orderId: string
  amount: number
  currency: string
  templateSlug: string
  templateName: string
  keyId: string
}

export const createTemplateOrder = async (
  payload: BasePayload,
  tenantId: string,
  templateSlug: string,
): Promise<TemplateOrder> => {
  const template = await getTemplateBySlugOrThrow(payload, templateSlug)

  if (template.status !== 'published') {
    throw new TRPCError({ code: 'BAD_REQUEST', message: `"${template.name}" is not available.` })
  }
  if (template.pricing.model === 'free') {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `"${template.name}" is free — claim it instead of purchasing.`,
    })
  }

  const existing = await findEntitlement(payload, tenantId, template.id)
  if (existing && existing.status !== 'revoked') {
    throw new TRPCError({
      code: 'CONFLICT',
      message: `You already own "${template.name}".`,
    })
  }

  const provider = getPaymentProvider()

  const order = await provider.createOrder({
    amount: template.pricing.amount,
    currency: template.pricing.currency,
    receipt: `tpl_${template.slug}_${tenantId}`.slice(0, 40),
    notes: {
      tenantId,
      templateId: template.id,
      templateSlug: template.slug,
    },
  })

  await payload.create({
    collection: 'template-purchases',
    data: {
      tenant: tenantId,
      template: template.id,
      status: 'pending',
      razorpayOrderId: order.orderId,
      amount: order.amount,
      currency: order.currency,
      versionAtPurchase: template.version,
    },
  })

  return {
    orderId: order.orderId,
    amount: order.amount,
    currency: order.currency,
    templateSlug: template.slug,
    templateName: template.name,
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? '',
  }
}

export interface CompletePurchaseInput {
  orderId: string
  paymentId: string
  signature: string
}

export const completeTemplatePurchase = async (
  payload: BasePayload,
  tenantId: string,
  input: CompletePurchaseInput,
): Promise<{ slug: string; owned: true }> => {
  const { docs } = await payload.find({
    collection: 'template-purchases',
    where: { razorpayOrderId: { equals: input.orderId } },
    limit: 1,
    depth: 0,
    pagination: false,
  })

  const purchase = docs[0]
  if (!purchase) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'Unknown order.' })
  }

  const purchaseTenantId =
    typeof purchase.tenant === 'string' ? purchase.tenant : purchase.tenant?.id
  if (purchaseTenantId !== tenantId) {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'This order belongs to another store.' })
  }

  const templateId =
    typeof purchase.template === 'string' ? purchase.template : purchase.template.id
  const template = (await payload.findByID({
    collection: 'templates',
    id: templateId,
    depth: 0,
  })) as Template

  if (purchase.status === 'completed') {
    return { slug: template.slug, owned: true }
  }
  if (purchase.status === 'refunded') {
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'This order was refunded.' })
  }

  const provider = getPaymentProvider()
  const valid = provider.verifyPayment({
    orderId: input.orderId,
    paymentId: input.paymentId,
    signature: input.signature,
  })

  if (!valid) {
    await payload.update({
      collection: 'template-purchases',
      id: purchase.id,
      data: { status: 'failed', failureReason: 'Signature verification failed' },
    })
    throw new TRPCError({ code: 'BAD_REQUEST', message: 'Payment could not be verified.' })
  }

  const transactionID = await payload.db.beginTransaction()
  const req: Partial<PayloadRequest> | undefined = transactionID ? { transactionID } : undefined

  try {
    await payload.update({
      collection: 'template-purchases',
      id: purchase.id,
      data: {
        status: 'completed',
        razorpayPaymentId: input.paymentId,
        purchasedAt: new Date().toISOString(),
      },
      req,
    })

    await grantEntitlement({
      payload,
      tenantId,
      template,
      source: 'purchase',
      purchaseId: purchase.id,
      req,
    })

    await payload.update({
      collection: 'templates',
      id: template.id,
      data: { stats: { ...template.stats, purchaseCount: (template.stats?.purchaseCount ?? 0) + 1 } },
      req,
    })

    if (transactionID) await payload.db.commitTransaction(transactionID)
  } catch (error) {
    if (transactionID) await payload.db.rollbackTransaction(transactionID)
    throw error
  }

  return { slug: template.slug, owned: true }
}

interface TenantRow {
  id: string
  slug: string
}

const getTenantOrThrow = async (payload: BasePayload, tenantId: string): Promise<TenantRow> => {
  const tenant = await payload.findByID({ collection: 'tenants', id: tenantId, depth: 0 })
  if (!tenant) throw new TRPCError({ code: 'NOT_FOUND', message: 'Store not found.' })
  return { id: tenant.id, slug: tenant.slug }
}

const findActiveEntitlement = async (
  payload: BasePayload,
  tenantId: string,
  req?: Partial<PayloadRequest>,
): Promise<TenantTemplate | undefined> => {
  const { docs } = await payload.find({
    collection: 'tenant-templates',
    where: { and: [{ tenant: { equals: tenantId } }, { status: { equals: 'active' } }] },
    limit: 1,
    depth: 0,
    pagination: false,
    req,
  })
  return docs[0]
}

const syncActiveInstalls = async (
  payload: BasePayload,
  templateId: string,
  req?: Partial<PayloadRequest>,
): Promise<void> => {
  const { totalDocs } = await payload.count({
    collection: 'tenant-templates',
    where: { and: [{ template: { equals: templateId } }, { status: { equals: 'active' } }] },
    req,
  })

  await payload.update({
    collection: 'templates',
    id: templateId,
    data: { stats: { activeInstalls: totalDocs } },
    req,
  })
}

export const activateTemplate = async (
  payload: BasePayload,
  tenantId: string,
  templateSlug: string,
): Promise<{ slug: string; active: true }> => {
  const [template, tenant] = await Promise.all([
    getTemplateBySlugOrThrow(payload, templateSlug),
    getTenantOrThrow(payload, tenantId),
  ])

  if (!getManifest(template.slug)) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `"${template.name}" is not available in this deployment.`,
    })
  }
  if (template.status === 'draft') {
    throw new TRPCError({ code: 'BAD_REQUEST', message: `"${template.name}" is not available.` })
  }

  let entitlement = await findEntitlement(payload, tenantId, template.id)

  if (!entitlement || entitlement.status === 'revoked') {
    if (template.pricing.model !== 'free') {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: `You don't own "${template.name}". Purchase it before activating.`,
      })
    }
    entitlement = await grantEntitlement({ payload, tenantId, template, source: 'free' })
  }

  if (entitlement.expiresAt && new Date(entitlement.expiresAt) < new Date()) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: `Your trial of "${template.name}" has expired.`,
    })
  }

  if (entitlement.status === 'active') {
    return { slug: template.slug, active: true }
  }

  const outgoing = await findActiveEntitlement(payload, tenantId)
  const outgoingTemplateId = outgoing
    ? typeof outgoing.template === 'string'
      ? outgoing.template
      : outgoing.template.id
    : null

  const now = new Date().toISOString()
  const transactionID = await payload.db.beginTransaction()
  const req: Partial<PayloadRequest> | undefined = transactionID ? { transactionID } : undefined

  try {
    await payload.update({
      collection: 'tenant-templates',
      where: {
        and: [
          { tenant: { equals: tenantId } },
          { status: { equals: 'active' } },
          { id: { not_equals: entitlement.id } },
        ],
      },
      data: { status: 'inactive', deactivatedAt: now },
      req,
    })

    await payload.update({
      collection: 'tenant-templates',
      id: entitlement.id,
      data: {
        status: 'active',
        activatedAt: now,
        installedVersion: template.version,
      },
      req,
    })

    await payload.update({
      collection: 'tenants',
      id: tenantId,
      data: { activeTemplate: template.slug },
      req,
    })

    await syncActiveInstalls(payload, template.id, req)
    if (outgoingTemplateId && outgoingTemplateId !== template.id) {
      await syncActiveInstalls(payload, outgoingTemplateId, req)
    }

    if (transactionID) await payload.db.commitTransaction(transactionID)
  } catch (error) {
    if (transactionID) await payload.db.rollbackTransaction(transactionID)
    throw error
  }

  await primeTemplateCache(tenant.slug, template.slug)

  return { slug: template.slug, active: true }
}

export const deactivateTemplate = async (
  payload: BasePayload,
  tenantId: string,
): Promise<{ slug: string; active: false }> => {
  const tenant = await getTenantOrThrow(payload, tenantId)
  const outgoing = await findActiveEntitlement(payload, tenantId)

  if (!outgoing) {
    return { slug: DEFAULT_TEMPLATE_SLUG, active: false }
  }

  const outgoingTemplateId =
    typeof outgoing.template === 'string' ? outgoing.template : outgoing.template.id

  const now = new Date().toISOString()
  const transactionID = await payload.db.beginTransaction()
  const req: Partial<PayloadRequest> | undefined = transactionID ? { transactionID } : undefined

  try {
    await payload.update({
      collection: 'tenant-templates',
      id: outgoing.id,
      data: { status: 'inactive', deactivatedAt: now },
      req,
    })

    await payload.update({
      collection: 'tenants',
      id: tenantId,
      data: { activeTemplate: DEFAULT_TEMPLATE_SLUG },
      req,
    })

    await syncActiveInstalls(payload, outgoingTemplateId, req)

    if (transactionID) await payload.db.commitTransaction(transactionID)
  } catch (error) {
    if (transactionID) await payload.db.rollbackTransaction(transactionID)
    throw error
  }

  await primeTemplateCache(tenant.slug, DEFAULT_TEMPLATE_SLUG)
  return { slug: DEFAULT_TEMPLATE_SLUG, active: false }
}
