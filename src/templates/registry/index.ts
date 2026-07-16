import type { TemplateManifest } from '../contract'

import { DEFAULT_TEMPLATE_SLUG, MANIFESTS_BY_SLUG, TEMPLATE_MANIFESTS } from './manifest'

export { DEFAULT_TEMPLATE_SLUG, TEMPLATE_MANIFESTS, MANIFESTS_BY_SLUG }

/**
 * Registry query API — manifests only.
 *
 * ── Do not import ./modules here ────────────────────────────────────────────
 * This file is imported by the marketplace, the tRPC service, the resolver and
 * Payload collections — i.e. by pages that have nothing to do with rendering a
 * storefront. `./modules` holds `() => import('../nova')` thunks, and Next
 * collects a route's CSS from its whole module graph: *referencing* a thunk is
 * enough, calling it is not required. This file previously imported it, and the
 * result was every template's stylesheet linked onto /login, /sign-up and the
 * dashboard.
 *
 * Module-aware checks live in ./integrity.ts and ../loader.ts, which only the
 * storefront and build scripts pull in.
 * ────────────────────────────────────────────────────────────────────────────
 */

export const isRegistered = (slug: string): boolean => MANIFESTS_BY_SLUG.has(slug)

export const getManifest = (slug: string): TemplateManifest | undefined =>
  MANIFESTS_BY_SLUG.get(slug)

export const getManifestOrDefault = (slug: string): TemplateManifest => {
  const manifest = MANIFESTS_BY_SLUG.get(slug)
  if (manifest) return manifest

  const fallback = MANIFESTS_BY_SLUG.get(DEFAULT_TEMPLATE_SLUG)
  if (!fallback) {
    throw new Error(`Default template "${DEFAULT_TEMPLATE_SLUG}" is missing from the registry.`)
  }
  return fallback
}

export interface ListManifestsOptions {
  status?: TemplateManifest['status']
  category?: TemplateManifest['category']
  pricingModel?: TemplateManifest['pricing']['model']
}

export const listManifests = (options: ListManifestsOptions = {}): TemplateManifest[] =>
  TEMPLATE_MANIFESTS.filter((manifest) => {
    if (options.status && manifest.status !== options.status) return false
    if (options.category && manifest.category !== options.category) return false
    if (options.pricingModel && manifest.pricing.model !== options.pricingModel) return false
    return true
  })

/**
 * Whether a template is safe to render for shoppers.
 *
 * Judged from the manifest alone — deliberately not checking that the module
 * exists, which would require ./modules. `assertRegistryIntegrity()` already
 * guarantees manifest/module parity at boot, and the loader falls back anyway if
 * a chunk is missing or throws. So the module check here would buy nothing and
 * cost every page a stylesheet.
 *
 * `deprecated` stays renderable on purpose: tenants already running it must not
 * have their storefront yanked out from under them. Deprecation hides a template
 * from the marketplace; it does not evict occupants.
 */
export const isRenderable = (slug: string): boolean => {
  const manifest = MANIFESTS_BY_SLUG.get(slug)
  return Boolean(manifest && manifest.status !== 'draft')
}

/**
 * Narrow an arbitrary slug (from the DB, a URL, anywhere) to one we can render,
 * falling back to the default. The storefront must never 500 because a template
 * row went stale or a template was pulled from the build.
 */
export const resolveRenderableSlug = (slug: string | null | undefined): string =>
  slug && isRenderable(slug) ? slug : DEFAULT_TEMPLATE_SLUG
