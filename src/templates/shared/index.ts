import './storefront.css'

import { CartLoading, CartView } from './views/cart-view'
import { CheckoutSkeleton } from './views/checkout-skeleton'
import { CheckoutView } from './views/checkout-view'

export { CartView, CartLoading, CheckoutView, CheckoutSkeleton }
export { ProductHero } from './components/products/product-hero'

export type { ProductCardData, CategoryCardData } from './data/types'
export { useProductsList, useFeaturedProducts, useWishlistProducts } from './data/use-products'
export { useCategoriesList, useFeaturedCategories } from './data/use-categories'

export const sharedBehaviorSlots = {
  CartView,
  CartSkeleton: CartLoading,
  CheckoutView,
  CheckoutSkeleton,
} as const
