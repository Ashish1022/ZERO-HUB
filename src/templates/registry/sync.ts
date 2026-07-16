import { payload } from '@/lib/payload'

import type { TemplateManifest } from '../contract'

import { TEMPLATE_MANIFESTS } from './manifest'
import { assertRegistryIntegrity } from './integrity'

const force = process.argv.includes('--force')

const toDescriptiveFields = (manifest: TemplateManifest) => ({
  name: manifest.name,
  description: manifest.description,
  category: manifest.category,
  tags: manifest.tags.map((tag) => ({ tag })),
  author: manifest.author,
  thumbnail: manifest.thumbnail,
  screenshots: manifest.screenshots.map((url) => ({ url })),
  features: manifest.features.map((feature) => ({ feature })),
  pricing: {
    model: manifest.pricing.model,
    amount: manifest.pricing.amount,
    compareAtAmount: manifest.pricing.compareAtAmount,
    currency: manifest.pricing.currency,
  },
  status: manifest.status,
})

const toCodeOwnedFields = (manifest: TemplateManifest) => ({
  version: manifest.version,
  isDefault: Boolean(manifest.isDefault),
  changelog: (manifest.changelog ?? []).map((entry) => ({
    version: entry.version,
    date: new Date(entry.date).toISOString(),
    notes: entry.notes,
  })),
})

const sync = async () => {
  // Refuse to write a half-registered catalog: a row whose loader is missing
  // would be purchasable but would silently render as the default.
  assertRegistryIntegrity()

  let created = 0
  let updated = 0

  for (const manifest of TEMPLATE_MANIFESTS) {
    const { docs } = await payload.find({
      collection: 'templates',
      where: { slug: { equals: manifest.slug } },
      limit: 1,
      depth: 0,
      pagination: false,
    })

    const existing = docs[0]

    if (!existing) {
      await payload.create({
        collection: 'templates',
        data: {
          slug: manifest.slug,
          releasedAt: new Date(manifest.releasedAt).toISOString(),
          ...toDescriptiveFields(manifest),
          ...toCodeOwnedFields(manifest),
        },
      })
      created += 1
      console.log(`  + created  ${manifest.slug}  (v${manifest.version})`)
      continue
    }

    await payload.update({
      collection: 'templates',
      id: existing.id,
      data: {
        ...toCodeOwnedFields(manifest),
        ...(force ? toDescriptiveFields(manifest) : {}),
      },
    })
    updated += 1

    const versionNote =
      existing.version === manifest.version
        ? `v${manifest.version}`
        : `v${existing.version} -> v${manifest.version}`
    console.log(`  ~ updated  ${manifest.slug}  (${versionNote})${force ? '  [forced]' : ''}`)
  }

  // Rows whose code was removed from the build. Left alone deliberately: tenants
  // may still be pointed at them, and the resolver already degrades those to the
  // default. Deleting the row would orphan their entitlements and lose the
  // purchase history behind them — that's a decision for a human.
  const { docs: allRows } = await payload.find({
    collection: 'templates',
    limit: 500,
    depth: 0,
    pagination: false,
    select: { slug: true, status: true },
  })

  const registered = new Set(TEMPLATE_MANIFESTS.map((manifest) => manifest.slug))
  const orphaned = allRows.filter((row) => !registered.has(row.slug))

  if (orphaned.length > 0) {
    console.warn(
      `\n  ! ${orphaned.length} catalog row(s) have no code in this build: ${orphaned
        .map((row) => row.slug)
        .join(', ')}`,
    )
    console.warn(
      `    Tenants on them fall back to the default template. Mark them deprecated in the admin\n` +
        `    panel to hide them from the marketplace; they are not deleted automatically.`,
    )
  }

  console.log(`\nTemplate sync complete: ${created} created, ${updated} updated.`)
  if (!force && updated > 0) {
    console.log(
      'Descriptive fields (name, pricing, status, ...) were left as-is. Re-run with --force to overwrite them from code.',
    )
  }
}

await sync()
process.exit(0)
