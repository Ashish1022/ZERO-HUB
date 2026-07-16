import type { TemplateModuleLoader } from '../contract'

export const TEMPLATE_MODULES: Readonly<Record<string, TemplateModuleLoader>> = {
  default: () => import('../default').then((mod) => mod.default),
  nova: () => import('../nova').then((mod) => mod.default),
  atelier: () => import('../atelier').then((mod) => mod.default),
}

export const REGISTERED_SLUGS: readonly string[] = Object.keys(TEMPLATE_MODULES)

export const hasTemplateModule = (slug: string): boolean =>
  Object.prototype.hasOwnProperty.call(TEMPLATE_MODULES, slug)
