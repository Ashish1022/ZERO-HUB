import type { TemplateModule } from '../contract'
import { sharedBehaviorSlots } from '../shared'

import './theme.css'
import './style.css'

import { Footer, FooterSkeleton } from './components/footer'
import { Header, HeaderSkeleton } from './components/header'
import { CategoriesView } from './views/categories-view'
import { CategoryView } from './views/category-view'
import { HeroSectionSkeleton, HomeView } from './views/home-view'
import { CategoriesSkeleton, CategorySkeleton, ProductSkeleton } from './views/page-skeletons'
import { ProductView } from './views/product-view'
import { ProductsLoading, ProductsView } from './views/products-view'
import WishlistLoading, { WishlistView } from './views/wishlist-views'

import { defaultTemplateManifest } from './template.config'

export default {
  manifest: defaultTemplateManifest,
  slots: {
    ...sharedBehaviorSlots,

    Header,
    HeaderSkeleton,
    Footer,
    FooterSkeleton,

    HomeView,
    HomeSkeleton: HeroSectionSkeleton,

    ProductsView,
    ProductsSkeleton: ProductsLoading,

    ProductView,
    ProductSkeleton,

    CategoriesView,
    CategoriesSkeleton,

    CategoryView,
    CategorySkeleton,

    WishlistView,
    WishlistSkeleton: WishlistLoading,
  },
} satisfies TemplateModule
