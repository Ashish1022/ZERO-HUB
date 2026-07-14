import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateTenantUrl(tenantSlug: string) {
  if (process.env.NODE_ENV === 'development') return `/tenant/${tenantSlug}`

  const protocol = 'https'
  const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN

  return `${protocol}://${tenantSlug}.${domain}`
}

export function formatPrice(price?: number | null) {
  if (!price) return null
  return new Intl.NumberFormat('en-IN', {
    currency: 'INR',
    style: 'currency',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price)
}
