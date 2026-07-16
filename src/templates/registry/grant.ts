import { payload } from '@/lib/payload'

import {
  activateTemplate,
  grantTemplateToTenant,
  listOwnedTemplates,
  resolveTenantIdBySlug,
} from '@/modules/templates/server/service'

import { TEMPLATE_MANIFESTS } from './manifest'

/**
 * Assign a template to a tenant by hand — for testing, demos and support comps.
 *
 *     pnpm templates:grant <tenant-slug> <template-slug>     # own it, and go live
 *     pnpm templates:grant <tenant-slug> <template-slug> --no-activate
 *     pnpm templates:grant <tenant-slug>                     # show what they own
 *
 * ── Why a script and not SQL or the admin panel ─────────────────────────────
 * Activation is four writes in one transaction: the entitlement row, the
 * denormalised `tenants.activeTemplate` the storefront actually reads, the
 * install counters, and the Redis cache prime. Setting `activeTemplate` by hand
 * gets the storefront rendering the new look while the dashboard still says the
 * tenant doesn't own it, and leaves the counters wrong — the two halves drift
 * with nothing to notice.
 *
 * This calls the same `activateTemplate` the purchase flow calls, so a granted
 * template is indistinguishable from a bought one everywhere except
 * `source: 'grant'`. Testing the real path is the whole point.
 *
 * Payment is bypassed; entitlement is not. "Only owned templates can be
 * activated" still holds — the grant creates the ownership first.
 */

/**
 * A positional keyword rather than a `--no-activate` flag: pnpm parses
 * `--`-prefixed args as its own and never forwards them, so the flag form
 * silently did the opposite of what it said — it granted *and* activated.
 * A positional can't be intercepted.
 */
const args = process.argv.slice(2).filter((a) => !a.startsWith('-'))
const [tenantSlug, templateSlug, mode] = args
const noActivate = mode === 'own'

const usage = () => {
  console.log('\nUsage: pnpm templates:grant <tenant-slug> [template-slug] [own]\n')
  console.log('  <no template>   list what the tenant owns')
  console.log('  <template>      grant it and make it live')
  console.log('  <template> own  grant it without activating\n')
  console.log('Registered templates:')
  for (const m of TEMPLATE_MANIFESTS) {
    const price = m.pricing.model === 'free' ? 'free' : `Rs ${m.pricing.amount / 100}`
    console.log(`  ${m.slug.padEnd(10)} ${m.name.padEnd(10)} ${price}${m.isDefault ? '  (default)' : ''}`)
  }
  console.log('')
}

const run = async () => {
  if (!tenantSlug) {
    usage()
    process.exit(1)
  }

  const tenantId = await resolveTenantIdBySlug(payload, tenantSlug)

  // No template named: report rather than guess at a mutation.
  if (!templateSlug) {
    const owned = await listOwnedTemplates(payload, tenantId)
    console.log(`\n"${tenantSlug}" owns ${owned.length} template(s):\n`)
    for (const t of owned) {
      const live = t.status === 'active' ? '  <- LIVE' : ''
      console.log(`  ${t.slug.padEnd(10)} ${String(t.name).padEnd(10)} ${t.source.padEnd(9)} v${t.installedVersion}${live}`)
    }
    console.log('')
    usage()
    return
  }

  const { slug } = await grantTemplateToTenant(payload, tenantId, templateSlug)
  console.log(`\n  granted   "${slug}" to "${tenantSlug}"  (source: grant, no payment)`)

  if (noActivate) {
    console.log(`  not activated ("own" mode). It's owned but not live.\n`)
    return
  }

  await activateTemplate(payload, tenantId, slug)
  console.log(`  activated "${slug}" — cache primed, live on the next request.\n`)
}

await run()
process.exit(0)
