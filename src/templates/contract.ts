import type { ComponentType } from 'react'

export interface TenantProps {
  slug: string
}

export interface ProductProps extends TenantProps {
  product: string
}

export interface CategoryProps extends TenantProps {
  category: string
}

export interface TemplateSlots {
  Header: ComponentType<TenantProps>
  HeaderSkeleton: ComponentType
  Footer: ComponentType<TenantProps>
  FooterSkeleton: ComponentType

  HomeView: ComponentType<TenantProps>
  HomeSkeleton: ComponentType

  ProductsView: ComponentType<TenantProps>
  ProductsSkeleton: ComponentType

  ProductView: ComponentType<ProductProps>
  ProductSkeleton: ComponentType

  CategoriesView: ComponentType<TenantProps>
  CategoriesSkeleton: ComponentType

  CategoryView: ComponentType<CategoryProps>
  CategorySkeleton: ComponentType

  CartView: ComponentType<TenantProps>
  CartSkeleton: ComponentType

  CheckoutView: ComponentType<TenantProps>
  CheckoutSkeleton: ComponentType

  WishlistView: ComponentType<TenantProps>
  WishlistSkeleton: ComponentType
}

export const SLOT_NAMES = [
  'Header',
  'HeaderSkeleton',
  'Footer',
  'FooterSkeleton',
  'HomeView',
  'HomeSkeleton',
  'ProductsView',
  'ProductsSkeleton',
  'ProductView',
  'ProductSkeleton',
  'CategoriesView',
  'CategoriesSkeleton',
  'CategoryView',
  'CategorySkeleton',
  'CartView',
  'CartSkeleton',
  'CheckoutView',
  'CheckoutSkeleton',
  'WishlistView',
  'WishlistSkeleton',
] as const satisfies readonly (keyof TemplateSlots)[]

export type SlotName = (typeof SLOT_NAMES)[number]

export type TemplateCategory =
  | 'general'
  | 'fashion'
  | 'electronics'
  | 'grocery'
  | 'furniture'
  | 'beauty'
  | 'digital'
  | 'minimal'

export type TemplateStatus = 'draft' | 'published' | 'deprecated'

export type PricingModel = 'free' | 'paid'

export interface TemplatePricing {
  model: PricingModel
  amount: number
  currency: 'INR'
  compareAtAmount?: number
}

export interface ChangelogEntry {
  version: string
  date: string
  notes: string
}

export interface TemplateManifest {
  slug: string
  name: string
  description: string
  version: string
  category: TemplateCategory
  tags: string[]
  author: string
  thumbnail: string
  screenshots: string[]
  pricing: TemplatePricing
  features: string[]
  status: TemplateStatus
  isDefault?: boolean
  releasedAt: string
  changelog?: ChangelogEntry[]
}

export interface TemplateModule {
  manifest: TemplateManifest
  slots: TemplateSlots
}

export type TemplateModuleLoader = () => Promise<TemplateModule>
