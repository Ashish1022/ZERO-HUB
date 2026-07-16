import 'server-only'

import { cache } from 'react'

import type { TemplateModule, TemplateSlots } from './contract'

import { DEFAULT_TEMPLATE_SLUG, resolveRenderableSlug } from './registry'
import { assertRegistryIntegrity } from './registry/integrity'
import { TEMPLATE_MODULES } from './registry/modules'

assertRegistryIntegrity()

const loadModule = cache(async (slug: string): Promise<TemplateModule> => {
  const importer = TEMPLATE_MODULES[slug]

  if (!importer) {
    return loadDefaultModule()
  }

  try {
    return await importer()
  } catch (error) {
    console.error(`[templates] Failed to load template "${slug}", falling back to default.`, error)

    if (slug === DEFAULT_TEMPLATE_SLUG) throw error
    return loadDefaultModule()
  }
})

const loadDefaultModule = (): Promise<TemplateModule> => {
  const importer = TEMPLATE_MODULES[DEFAULT_TEMPLATE_SLUG]
  if (!importer) {
    throw new Error(
      `Default template "${DEFAULT_TEMPLATE_SLUG}" has no registered loader. The storefront cannot render.`,
    )
  }
  return importer()
}

export const loadTemplate = (slug: string | null | undefined): Promise<TemplateModule> =>
  loadModule(resolveRenderableSlug(slug))

export const loadTemplateSlots = async (slug: string | null | undefined): Promise<TemplateSlots> =>
  (await loadTemplate(slug)).slots

export const preloadTemplate = (slug: string): void => {
  const importer = TEMPLATE_MODULES[slug]
  if (!importer) return

  void importer().catch(() => {})
}
