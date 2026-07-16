import type { TemplateManifest } from '../contract'

import { atelierTemplateManifest } from '../atelier/template.config'
import { defaultTemplateManifest } from '../default/template.config'
import { novaTemplateManifest } from '../nova/template.config'

export const TEMPLATE_MANIFESTS: readonly TemplateManifest[] = [
  defaultTemplateManifest,
  novaTemplateManifest,
  atelierTemplateManifest,
]

export const MANIFESTS_BY_SLUG: ReadonlyMap<string, TemplateManifest> = new Map(
  TEMPLATE_MANIFESTS.map((manifest) => [manifest.slug, manifest]),
)

export const DEFAULT_TEMPLATE_SLUG: string = (() => {
  const defaults = TEMPLATE_MANIFESTS.filter((manifest) => manifest.isDefault)

  if (defaults.length !== 1) {
    throw new Error(
      `Template registry must declare exactly one manifest with isDefault: true, found ${defaults.length}. ` +
        `The default is the fallback for unknown, unpublished, and failed-to-load templates, so it cannot be ambiguous.`,
    )
  }

  return defaults[0].slug
})()
