import { DEFAULT_TEMPLATE_SLUG, MANIFESTS_BY_SLUG, TEMPLATE_MANIFESTS } from './manifest'
import { hasTemplateModule, REGISTERED_SLUGS } from './modules'

/**
 * The registry is two files that must agree. This catches the one mistake the
 * type system can't: adding a manifest and forgetting the loader, or vice versa.
 *
 * ── Why this is not in ./index.ts ───────────────────────────────────────────
 * It needs `./modules`, and importing that has a cost that is easy to miss:
 * Next collects a route's CSS from its entire module graph, and a lazy
 * `import('../nova')` counts — merely *referencing* the thunk is enough, calling
 * it is not required. When `./index.ts` imported `./modules`, every page whose
 * server graph reached the registry (`/login` via
 * caller.auth.session -> appRouter -> templatesRouter -> service -> registry)
 * linked every template's stylesheet.
 *
 * So the split is: `./index.ts` and `./manifest.ts` are pure data and safe to
 * import anywhere; anything touching `./modules` lives here or in the loader,
 * and only the storefront and build-time scripts import those.
 * ────────────────────────────────────────────────────────────────────────────
 */
export const assertRegistryIntegrity = (): void => {
  const problems: string[] = []

  for (const manifest of TEMPLATE_MANIFESTS) {
    if (!hasTemplateModule(manifest.slug)) {
      problems.push(
        `"${manifest.slug}" has a manifest but no loader — add \`${manifest.slug}: () => import('../${manifest.slug}').then((mod) => mod.default)\` to registry/modules.ts`,
      )
    }
  }

  for (const slug of REGISTERED_SLUGS) {
    if (!MANIFESTS_BY_SLUG.has(slug)) {
      problems.push(
        `"${slug}" has a loader but no manifest — add its manifest to registry/manifest.ts`,
      )
    }
  }

  const seen = new Set<string>()
  for (const manifest of TEMPLATE_MANIFESTS) {
    if (seen.has(manifest.slug)) {
      problems.push(`"${manifest.slug}" is registered twice — slugs are identity and must be unique`)
    }
    seen.add(manifest.slug)
  }

  const fallback = MANIFESTS_BY_SLUG.get(DEFAULT_TEMPLATE_SLUG)
  if (fallback && fallback.pricing.model !== 'free') {
    problems.push(
      `Default template "${DEFAULT_TEMPLATE_SLUG}" must be free — it is the fallback for tenants who own nothing`,
    )
  }
  if (fallback && fallback.status !== 'published') {
    problems.push(
      `Default template "${DEFAULT_TEMPLATE_SLUG}" must be published — it is the fallback for every failed load`,
    )
  }

  if (problems.length > 0) {
    throw new Error(`Template registry is inconsistent:\n  - ${problems.join('\n  - ')}`)
  }
}
