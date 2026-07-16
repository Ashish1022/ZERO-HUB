# Storefront templates

How a tenant's storefront picks its look, and how to add a new one.

## Adding a template

Four steps. None of them touch route code, the resolver, or the service layer.

1. **Create the folder** — `src/templates/<slug>/`, with `index.ts`,
   `template.config.ts` and `theme.css`. Copy `nova/` as a starting point.
2. **Register the manifest** — one line in `registry/manifest.ts`.
3. **Register the loader** — one line in `registry/modules.ts`. The path must be a
   string literal.
4. **Sync the catalog** — `pnpm templates:sync`.

That's it. `assertRegistryIntegrity()` fails the build if you do 2 without 3 (or
vice versa), and `satisfies TemplateModule` in your `index.ts` fails it if you
miss a slot.

`nova` and `atelier` were both added this way. Neither required a line of change
in the loader, the resolver, the routes, the service, or the marketplace.

## The pieces

| File | Job |
| --- | --- |
| `contract.ts` | The socket. Slot names, prop types, manifest shape. Types only. |
| `registry/manifest.ts` | Metadata for every template. **Data only — no components.** |
| `registry/modules.ts` | `slug -> () => import(...)`. The only file that references template code. |
| `registry/index.ts` | Query API + integrity check. Client-safe. |
| `loader.ts` | `slug -> slots`, with fallback and preload. Server only. |
| `shared/` | Behavior every template adopts: cart, checkout, product hero, data hooks. |

## What a template owns

A template owns **identity**; `shared/` owns **behavior**. The line is drawn at
*"would a bug here be a bug in every template?"*

| Template owns | `shared/` owns |
| --- | --- |
| Header, Footer | Cart view, Checkout view (Razorpay) |
| Home, Products, Categories, Category views | Product hero (add to cart, wishlist, reviews) |
| Product card, Category card | Data fetching + normalisation (`shared/data`) |
| Theme tokens, radius, type | The token contract (`shared/tokens.css`) |

Cart and checkout arrive via `sharedBehaviorSlots`:

```ts
slots: {
  ...sharedBehaviorSlots,   // CartView, CartSkeleton, CheckoutView, CheckoutSkeleton
  Header, Footer, HomeView, /* ...the parts that make it yours */
}
```

Three templates, one Razorpay integration. Duplicating it would mean a payment
bug needs fixing in eleven places.

## Theming: how one checkout looks right everywhere

Shared views never name a colour. They style against semantic tokens —
`bg-tpl-surface`, `text-tpl-fg`, `bg-tpl-primary`, `border-tpl-line` — and each
template supplies the values in its `theme.css`:

```css
/* nova/theme.css */
:root {
  --tpl-surface: #0a0a0b;
  --tpl-accent: #22d3ee;
  --tpl-radius: 0.25rem;   /* sharp */
}
```

`:root` is safe precisely *because* of the code-splitting: each template's CSS
ships in its own chunk and only one template is ever on a page, so two templates
can define the same variable and never collide. No scoping selectors needed.

### ⚠️ The `tpl-` prefix is not decoration

Tailwind v4's `@theme` is **one global design system**, merged across every CSS
file in the build — chunking does not scope it. The app's `globals.css` already
maps shadcn's tokens there (`--color-primary: var(--primary)`), so an unprefixed
`--color-primary` for templates silently **overwrites shadcn's** and breaks
`bg-primary` on the landing page and in the admin panel.

For the same reason the template tokens are declared in **`app/(app)/globals.css`**,
not under `src/templates/` — `@theme` only generates utilities in the file that
imports Tailwind, and that is the only one that does. Add new tokens there, named
`--color-tpl-*`. Every one has a neutral default, so a template that forgets one
renders plain rather than invisible.

Only `globals.css` may `@import "tailwindcss"`. A second import re-emits the whole
preflight and fights the first.

### shadcn primitives inside a storefront

The root layout sets `defaultTheme="dark"` app-wide, so `.dark` lands on `<html>`
for storefronts too. `shared/storefront.css` rebinds shadcn's tokens
(`--background`, `--primary`, `--muted`, …) to the active template's `--tpl-*`,
so a `Skeleton` or `Input` inside a light template renders light regardless. It
ships in the shared chunk, so it applies **only** on storefronts — the dark theme
still owns the landing page, dashboard and admin.

It uses a doubled `:root:root` selector to out-specify `.dark` deterministically
rather than depending on stylesheet order.

## Data: templates don't parse prices

`shared/data` fetches and normalises; the template renders:

```tsx
const products = useProductsList(slug, { limit: 12 })
return <div className={MY_GRID}>{products.map(p => <MyCard key={p.slug} {...p} />)}</div>
```

`ProductCardData` is the handoff. A template author never touches a price string,
an image join, or the `compareAtPrice`-is-actually-the-sale-price quirk this
schema carries.

## The one rule

**`registry/manifest.ts` and every `template.config.ts` must never import a
component.**

The marketplace imports manifests to render cards. If a manifest reached a
component, the marketplace bundle would statically pull in every template's
entire tree — the exact cost this design exists to avoid. Manifests are data;
code lives behind the thunks in `modules.ts`.

## Why it scales

Three properties, each load-bearing:

**Templates are code-split.** `modules.ts` holds thunks, not imports. The bundler
emits one chunk per template and fetches none until a thunk is called — once per
request, for the one template that tenant runs. Verify it after a build:

```bash
ls .next/server/chunks/ssr/ | grep src_templates
# one chunk per template; none inlined into route chunks
```

**The storefront never reads the catalog.** Resolution is one indexed read of
`tenants.activeTemplate` — a denormalisation of "the entitlement whose status is
active", written in the same transaction as the entitlement it mirrors. No join,
no catalog scan. Adding the 500th template changes none of these queries. This is
a property of the schema, not of the cache on top of it.

**Metadata is separate from code.** Listing 500 templates costs 500 rows.

## Request path

```
storefront request
  → getTenantSlots(tenantSlug)              modules/templates/server/render.ts
      → getActiveTemplateSlug(tenantSlug)   resolver.ts
          React cache() → Redis → Postgres (one indexed column)
      → loadTemplateSlots(templateSlug)     loader.ts
          → TEMPLATE_MODULES[slug]()        ← the only chunk fetched
  → <HomeView slug={...} />
```

Native `await import()` rather than `next/dynamic` on purpose: these are Server
Components, and `next/dynamic` is a client primitive. Using it would mean pushing
the storefront across the client boundary or setting `ssr: false` — either one
costs the server-rendered HTML that a storefront's SEO and LCP depend on.

## Switching

`activateTemplate` writes the entitlement, the denormalised pointer, and the
install counters in one transaction, then primes the Redis key with the new slug.
The next request reads the new value directly — no TTL wait, no DB round trip.

Deactivating reverts to the default and **keeps the entitlement**: deactivating
is not disowning, and switching back is free.

## Who owns what

Code and the database own different halves of a template, and `sync.ts` enforces
the line:

- **Code owns** `version`, `changelog`, `isDefault` — always synced. They change
  only via deploy.
- **The DB owns** price, status, featured, name, copy — seeded from the manifest
  on first insert, never overwritten after. Marketing changes a price in the admin
  panel; a deploy must not silently revert it.

`pnpm templates:sync --force` overrides the second group when you genuinely want
code to win.

## Authorization

Two invariants, both enforced in `modules/templates/server/service.ts` and
nowhere else:

1. **Only entitled templates activate.** `activateTemplate` looks for a live
   entitlement row. Free templates are auto-claimed *first*, so activation always
   follows entitlement rather than substituting for it.
2. **At most one active template per tenant.** Enforced inside the activation
   transaction, atomically with the write it guards.

Both live in the service rather than in the tRPC procedures because webhooks, the
admin panel, and scripts call the service too. A rule enforced in a procedure is
a rule those callers skip.

Entitlements and purchases are `create: isSuperAdmin` — writes go through the
service via the Local API (which bypasses access control by default). If a client
could POST to `tenant-templates`, it could grant itself any paid template.

## Local development

```bash
TEMPLATE_PAYMENTS_MOCK=true      # purchase flow without Razorpay credentials
```

The mock signs with the same HMAC construction as Razorpay, so the verification
path under test is the real one. Its constructor throws in production.

## Extending

The seams that already exist for the roadmap:

- **Theme settings / customisation** — `tenant-templates.settings` (json). Schema
  belongs to the template, which is why it's untyped in the collection.
- **Versioning & updates** — `installedVersion` vs the catalog's `version`. The
  marketplace already surfaces `updateAvailable`; activating adopts the new version.
- **Rollback** — entitlements are kept on deactivate, so the previous template is
  one `activate` away. A history table would give multi-step rollback.
- **Ratings & reviews** — `templates.stats.rating*` is reserved and already read
  by the card.
- **Trials** — `source: 'trial'` and `expiresAt` are honoured by `activateTemplate`.
- **AI-generated templates** — a generated template is a folder plus two registry
  lines, same as a hand-written one. That's the point of the contract.
- **Live preview before purchase** — the loader already resolves any slug, not
  just the tenant's own; a preview route can load an unowned template without
  touching entitlements.
