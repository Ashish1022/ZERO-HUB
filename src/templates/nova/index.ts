import type { TemplateModule } from '../contract'
import { sharedBehaviorSlots } from '../shared'

import './theme.css'

import { Footer, FooterSkeleton } from './components/footer'
import { Header, HeaderSkeleton } from './components/header'
import { CategoriesView } from './views/categories-view'
import { CategoryView } from './views/category-view'
import { HomeView } from './views/home-view'
import {
  CategoriesSkeleton,
  CategorySkeleton,
  HomeSkeleton,
  ProductSkeleton,
  ProductsSkeleton,
  WishlistSkeleton,
} from './views/page-skeletons'
import { ProductView } from './views/product-view'
import { ProductsView } from './views/products-view'
import { WishlistView } from './views/wishlist-view'

import { novaTemplateManifest } from './template.config'

export default {
  manifest: novaTemplateManifest,
  slots: {
    ...sharedBehaviorSlots,

    Header,
    HeaderSkeleton,
    Footer,
    FooterSkeleton,

    HomeView,
    HomeSkeleton,

    ProductsView,
    ProductsSkeleton,

    ProductView,
    ProductSkeleton,

    CategoriesView,
    CategoriesSkeleton,

    CategoryView,
    CategorySkeleton,

    WishlistView,
    WishlistSkeleton,
  },
} satisfies TemplateModule
