import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Tenants } from './collections/Tenants'
import { isSuperAdmin } from './lib/access'

import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import { Products } from './collections/Products'
import { Categories } from './collections/Categories'
import { Reviews } from './collections/Reviews'
import { SubscriptionPlans } from './collections/SubscriptionPlans'
import { Subscriptions } from './collections/Subscriptions'
import { Customers } from './collections/Customers'
import { Orders } from './collections/Orders'
import { CategorySalesSummary } from './collections/CategorySalesSummary'
import { ProductsSalesSummary } from './collections/ProductsSalesSummary'
import { MonthlySalesSummary } from './collections/MonthlySalesSummary'
import { Tags } from './collections/Tags'
import { Templates } from './collections/Templates'
import { TemplatePurchases } from './collections/TemplatePurchases'
import { TenantTemplates } from './collections/TenantTemplates'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' - ZERO | HUB',
    },
    components: {
      graphics: {
        Logo: '@/components/payload/login',
      },
      beforeNavLinks: ['@/components/payload/dashboard-button#DashboardLink'],
      beforeDashboard: ['@/components/payload/dashboard'],
    },
  },
  collections: [
    Users,
    Media,
    Tenants,
    Products,
    Tags,
    Categories,
    Reviews,
    SubscriptionPlans,
    Subscriptions,
    Customers,
    Orders,
    CategorySalesSummary,
    ProductsSalesSummary,
    MonthlySalesSummary,
    Templates,
    TemplatePurchases,
    TenantTemplates,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    idType: 'uuid',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    multiTenantPlugin({
      collections: {
        categories: {},
        products: {},
        tags: {},
        media: {},
        reviews: {},
        orders: {},
        customers: {},
        'monthly-sales-summary': {},
        'products-sales-summary': {},
        'category-sales-summary': {},
        'template-purchases': {},
        'tenant-templates': {},
      },
      tenantsArrayField: {
        includeDefaultField: false,
      },
      userHasAccessToAllTenants: (user) => isSuperAdmin(user),
    }),
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
