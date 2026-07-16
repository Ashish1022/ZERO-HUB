export interface ProductCardData {
  id: string
  slug: string
  name: string
  tenantSlug: string
  displayPrice: number
  strikePrice: number | null
  image: string | null
  category: string | null
  badge: string | null
  rating: number | null
  reviews: number | null
}

export interface CategoryCardData {
  slug: string
  name: string
  description: string | null
  image: string | null
  productCount: number
  href: string
}
