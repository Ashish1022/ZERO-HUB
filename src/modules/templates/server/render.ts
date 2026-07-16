import 'server-only'

import type { TemplateSlots } from '@/templates/contract'
import { loadTemplateSlots } from '@/templates/loader'

import { getActiveTemplateSlug } from './resolver'

export const getTenantSlots = async (tenantSlug: string): Promise<TemplateSlots> => {
  const templateSlug = await getActiveTemplateSlug(tenantSlug)
  return loadTemplateSlots(templateSlug)
}
