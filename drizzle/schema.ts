import {
  pgEnum,
  pgTable,
  uuid,
  serial,
  integer,
  varchar,
  numeric,
  timestamp,
  jsonb,
  boolean,
  index,
  uniqueIndex,
  foreignKey,
  primaryKey,
  pgView,
  bigint,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const enumUsersRoles = pgEnum('enum_users_roles', ['super-admin', 'user'])
export const enumTenantsSubscriptionSubscriptionStatus = pgEnum(
  'enum_tenants_subscription_subscription_status',
  ['active', 'paused', 'cancelled', 'expired', 'none', 'trial', 'suspended'],
)
export const enumTenantsBankDetailsAccountType = pgEnum('enum_tenants_bank_details_account_type', [
  'vendor',
  'super-vendor',
])
export const enumTenantsBankDetailsStatus = pgEnum('enum_tenants_bank_details_status', [
  'pending',
  'verified',
  'rejected',
  'suspended',
  'not_submitted',
])
export const enumProductsBadge = pgEnum('enum_products_badge', [
  '',
  'new',
  'sale',
  'bestseller',
  'limited',
])
export const enumProductsRefundPolicy = pgEnum('enum_products_refund_policy', [
  '30-day',
  '14-day',
  '7-day',
  '3-day',
  '1-day',
  'no-refunds',
])
export const enumProductsStatus = pgEnum('enum_products_status', ['active', 'draft', 'archived'])
export const enumTagsType = pgEnum('enum_tags_type', [
  'general',
  'feature',
  'collection',
  'season',
  'style',
  'material',
  'color',
  'size',
  'brand',
  'occasion',
])
export const enumTagsStatus = pgEnum('enum_tags_status', ['active', 'inactive'])
export const enumCategoriesStatus = pgEnum('enum_categories_status', [
  'active',
  'inactive',
  'draft',
])
export const enumSubscriptionPlansPeriod = pgEnum('enum_subscription_plans_period', [
  'monthly',
  'yearly',
])
export const enumSubscriptionsStatus = pgEnum('enum_subscriptions_status', [
  'created',
  'pending',
  'authenticated',
  'active',
  'paused',
  'halted',
  'cancelled',
  'completed',
  'expired',
])

export const categories = pgTable(
  'categories',
  {
    id: uuid().defaultRandom().primaryKey(),
    tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'set null' }),
    tenantSlug: varchar('tenant_slug').notNull(),
    name: varchar().notNull(),
    slug: varchar().notNull(),
    description: varchar(),
    status: enumCategoriesStatus().default('active').notNull(),
    featured: boolean().default(false),
    parentId: uuid('parent_id'),
    thumbnailId: uuid('thumbnail_id')
      .notNull()
      .references(() => media.id, { onDelete: 'set null' }),
    seoTitle: varchar('seo_title'),
    seoDescription: varchar('seo_description'),
    seoKeywords: varchar('seo_keywords'),
    seoOgImageId: uuid('seo_og_image_id').references(() => media.id, { onDelete: 'set null' }),
    updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    createdAt: timestamp('created_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.parentId],
      foreignColumns: [table.id],
      name: 'categories_parent_id_categories_id_fk',
    }).onDelete('set null'),
    index('categories_created_at_idx').using('btree', table.createdAt.asc().nullsLast()),
    index('categories_parent_idx').using('btree', table.parentId.asc().nullsLast()),
    index('categories_seo_seo_og_image_idx').using('btree', table.seoOgImageId.asc().nullsLast()),
    index('categories_slug_idx').using('btree', table.slug.asc().nullsLast()),
    index('categories_status_idx').using('btree', table.status.asc().nullsLast()),
    index('categories_tenant_idx').using('btree', table.tenantId.asc().nullsLast()),
    index('categories_tenant_slug_idx').using('btree', table.tenantSlug.asc().nullsLast()),
    index('categories_thumbnail_idx').using('btree', table.thumbnailId.asc().nullsLast()),
    index('categories_updated_at_idx').using('btree', table.updatedAt.asc().nullsLast()),
    index('tenantSlug_featured_idx').using(
      'btree',
      table.tenantSlug.asc().nullsLast(),
      table.featured.asc().nullsLast(),
    ),
    uniqueIndex('tenantSlug_slug_1_idx').using(
      'btree',
      table.tenantSlug.asc().nullsLast(),
      table.slug.asc().nullsLast(),
    ),
  ],
)

export const categorySalesSummary = pgTable(
  'category_sales_summary',
  {
    id: uuid().defaultRandom().primaryKey(),
    tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'set null' }),
    categoryName: varchar('category_name').notNull(),
    month: varchar().notNull(),
    year: varchar().notNull(),
    totalOrders: numeric('total_orders').notNull(),
    grossSales: numeric('gross_sales').notNull(),
    netSales: numeric('net_sales').notNull(),
    totalItemsSold: numeric('total_items_sold').notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    createdAt: timestamp('created_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (table) => [
    index('category_sales_summary_created_at_idx').using(
      'btree',
      table.createdAt.asc().nullsLast(),
    ),
    index('category_sales_summary_tenant_idx').using('btree', table.tenantId.asc().nullsLast()),
    index('category_sales_summary_updated_at_idx').using(
      'btree',
      table.updatedAt.asc().nullsLast(),
    ),
  ],
)

export const customers = pgTable(
  'customers',
  {
    id: uuid().defaultRandom().primaryKey(),
    tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'set null' }),
    firstname: varchar().notNull(),
    lastname: varchar().notNull(),
    email: varchar().notNull(),
    newsLetter: boolean('news_letter').default(false),
    shippingAddressStreet: varchar('shipping_address_street').notNull(),
    shippingAddressApartment: varchar('shipping_address_apartment').notNull(),
    shippingAddressCity: varchar('shipping_address_city').notNull(),
    shippingAddressPostalCode: varchar('shipping_address_postal_code').notNull(),
    shippingAddressState: varchar('shipping_address_state').notNull(),
    shippingAddressCountry: varchar('shipping_address_country').notNull(),
    deliveryOption: varchar('delivery_option'),
    specialInstructions: varchar('special_instructions'),
    updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    createdAt: timestamp('created_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (table) => [
    index('customers_created_at_idx').using('btree', table.createdAt.asc().nullsLast()),
    index('customers_tenant_idx').using('btree', table.tenantId.asc().nullsLast()),
    index('customers_updated_at_idx').using('btree', table.updatedAt.asc().nullsLast()),
  ],
)

export const media = pgTable(
  'media',
  {
    id: uuid().defaultRandom().primaryKey(),
    tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'set null' }),
    alt: varchar().notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    createdAt: timestamp('created_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    url: varchar(),
    thumbnailURL: varchar('thumbnail_u_r_l'),
    filename: varchar(),
    mimeType: varchar('mime_type'),
    filesize: numeric(),
    width: numeric(),
    height: numeric(),
    focalX: numeric('focal_x'),
    focalY: numeric('focal_y'),
  },
  (table) => [
    index('media_created_at_idx').using('btree', table.createdAt.asc().nullsLast()),
    uniqueIndex('media_filename_idx').using('btree', table.filename.asc().nullsLast()),
    index('media_tenant_idx').using('btree', table.tenantId.asc().nullsLast()),
    index('media_updated_at_idx').using('btree', table.updatedAt.asc().nullsLast()),
  ],
)

export const monthlySalesSummary = pgTable(
  'monthly_sales_summary',
  {
    id: uuid().defaultRandom().primaryKey(),
    tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'set null' }),
    month: varchar().notNull(),
    year: varchar().notNull(),
    totalOrders: numeric('total_orders').notNull(),
    grossSales: numeric('gross_sales').notNull(),
    netSales: numeric('net_sales').notNull(),
    totalItemsSold: numeric('total_items_sold').notNull(),
    averageOrderValue: numeric('average_order_value').notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    createdAt: timestamp('created_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (table) => [
    index('monthly_sales_summary_created_at_idx').using('btree', table.createdAt.asc().nullsLast()),
    index('monthly_sales_summary_tenant_idx').using('btree', table.tenantId.asc().nullsLast()),
    index('monthly_sales_summary_updated_at_idx').using('btree', table.updatedAt.asc().nullsLast()),
  ],
)

export const orders = pgTable(
  'orders',
  {
    id: uuid().defaultRandom().primaryKey(),
    tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'set null' }),
    name: varchar().notNull(),
    customerId: uuid('customer_id')
      .notNull()
      .references(() => customers.id, { onDelete: 'set null' }),
    isPaid: boolean('is_paid').default(false).notNull(),
    orderDate: timestamp('order_date', { precision: 3, withTimezone: true }).notNull(),
    grossAmount: numeric('gross_amount').notNull(),
    discountAmount: numeric('discount_amount', { mode: 'number' }).default(0),
    taxAmount: numeric('tax_amount', { mode: 'number' }).default(0).notNull(),
    shippingAmount: numeric('shipping_amount', { mode: 'number' }).default(0),
    saleAmount: numeric('sale_amount', { mode: 'number' }).default(0).notNull(),
    razorpayCheckoutSessionId: varchar('razorpay_checkout_session_id'),
    razorpayOrderId: varchar('razorpay_order_id'),
    updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    createdAt: timestamp('created_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (table) => [
    index('orders_created_at_idx').using('btree', table.createdAt.asc().nullsLast()),
    index('orders_customer_idx').using('btree', table.customerId.asc().nullsLast()),
    index('orders_tenant_idx').using('btree', table.tenantId.asc().nullsLast()),
    index('orders_updated_at_idx').using('btree', table.updatedAt.asc().nullsLast()),
  ],
)

export const ordersOrderItems = pgTable(
  'orders_order_items',
  {
    order: integer('_order').notNull(),
    parentId: uuid('_parent_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    id: varchar().primaryKey(),
    product: varchar().notNull(),
    category: varchar(),
    quantity: numeric().notNull(),
    unitPrice: numeric('unit_price').notNull(),
    discountPerItem: numeric('discount_per_item', { mode: 'number' }).default(0),
    grossItemAmount: numeric('gross_item_amount').notNull(),
  },
  (table) => [
    index('orders_order_items_order_idx').using('btree', table.order.asc().nullsLast()),
    index('orders_order_items_parent_id_idx').using('btree', table.parentId.asc().nullsLast()),
  ],
)

export const payloadKv = pgTable(
  'payload_kv',
  {
    id: uuid().defaultRandom().primaryKey(),
    key: varchar().notNull(),
    data: jsonb().notNull(),
  },
  (table) => [uniqueIndex('payload_kv_key_idx').using('btree', table.key.asc().nullsLast())],
)

export const payloadLockedDocuments = pgTable(
  'payload_locked_documents',
  {
    id: uuid().defaultRandom().primaryKey(),
    globalSlug: varchar('global_slug'),
    updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    createdAt: timestamp('created_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (table) => [
    index('payload_locked_documents_created_at_idx').using(
      'btree',
      table.createdAt.asc().nullsLast(),
    ),
    index('payload_locked_documents_global_slug_idx').using(
      'btree',
      table.globalSlug.asc().nullsLast(),
    ),
    index('payload_locked_documents_updated_at_idx').using(
      'btree',
      table.updatedAt.asc().nullsLast(),
    ),
  ],
)

export const payloadLockedDocumentsRels = pgTable(
  'payload_locked_documents_rels',
  {
    id: serial().primaryKey(),
    order: integer(),
    parentId: uuid('parent_id')
      .notNull()
      .references(() => payloadLockedDocuments.id, { onDelete: 'cascade' }),
    path: varchar().notNull(),
    usersId: uuid('users_id').references(() => users.id, { onDelete: 'cascade' }),
    mediaId: uuid('media_id').references(() => media.id, { onDelete: 'cascade' }),
    tenantsId: uuid('tenants_id').references(() => tenants.id, { onDelete: 'cascade' }),
    productsId: uuid('products_id').references(() => products.id, { onDelete: 'cascade' }),
    tagsId: uuid('tags_id').references(() => tags.id, { onDelete: 'cascade' }),
    categoriesId: uuid('categories_id').references(() => categories.id, { onDelete: 'cascade' }),
    reviewsId: uuid('reviews_id').references(() => reviews.id, { onDelete: 'cascade' }),
    subscriptionPlansId: uuid('subscription_plans_id').references(() => subscriptionPlans.id, {
      onDelete: 'cascade',
    }),
    subscriptionsId: uuid('subscriptions_id').references(() => subscriptions.id, {
      onDelete: 'cascade',
    }),
    customersId: uuid('customers_id').references(() => customers.id, { onDelete: 'cascade' }),
    ordersId: uuid('orders_id').references(() => orders.id, { onDelete: 'cascade' }),
    categorySalesSummaryId: uuid('category_sales_summary_id').references(
      () => categorySalesSummary.id,
      { onDelete: 'cascade' },
    ),
    productsSalesSummaryId: uuid('products_sales_summary_id').references(
      () => productsSalesSummary.id,
      { onDelete: 'cascade' },
    ),
    monthlySalesSummaryId: uuid('monthly_sales_summary_id').references(
      () => monthlySalesSummary.id,
      { onDelete: 'cascade' },
    ),
  },
  (table) => [
    index('payload_locked_documents_rels_categories_id_idx').using(
      'btree',
      table.categoriesId.asc().nullsLast(),
    ),
    index('payload_locked_documents_rels_category_sales_summary_id_idx').using(
      'btree',
      table.categorySalesSummaryId.asc().nullsLast(),
    ),
    index('payload_locked_documents_rels_customers_id_idx').using(
      'btree',
      table.customersId.asc().nullsLast(),
    ),
    index('payload_locked_documents_rels_media_id_idx').using(
      'btree',
      table.mediaId.asc().nullsLast(),
    ),
    index('payload_locked_documents_rels_monthly_sales_summary_id_idx').using(
      'btree',
      table.monthlySalesSummaryId.asc().nullsLast(),
    ),
    index('payload_locked_documents_rels_order_idx').using('btree', table.order.asc().nullsLast()),
    index('payload_locked_documents_rels_orders_id_idx').using(
      'btree',
      table.ordersId.asc().nullsLast(),
    ),
    index('payload_locked_documents_rels_parent_idx').using(
      'btree',
      table.parentId.asc().nullsLast(),
    ),
    index('payload_locked_documents_rels_path_idx').using('btree', table.path.asc().nullsLast()),
    index('payload_locked_documents_rels_products_id_idx').using(
      'btree',
      table.productsId.asc().nullsLast(),
    ),
    index('payload_locked_documents_rels_products_sales_summary_id_idx').using(
      'btree',
      table.productsSalesSummaryId.asc().nullsLast(),
    ),
    index('payload_locked_documents_rels_reviews_id_idx').using(
      'btree',
      table.reviewsId.asc().nullsLast(),
    ),
    index('payload_locked_documents_rels_subscription_plans_id_idx').using(
      'btree',
      table.subscriptionPlansId.asc().nullsLast(),
    ),
    index('payload_locked_documents_rels_subscriptions_id_idx').using(
      'btree',
      table.subscriptionsId.asc().nullsLast(),
    ),
    index('payload_locked_documents_rels_tags_id_idx').using(
      'btree',
      table.tagsId.asc().nullsLast(),
    ),
    index('payload_locked_documents_rels_tenants_id_idx').using(
      'btree',
      table.tenantsId.asc().nullsLast(),
    ),
    index('payload_locked_documents_rels_users_id_idx').using(
      'btree',
      table.usersId.asc().nullsLast(),
    ),
  ],
)

export const payloadMigrations = pgTable(
  'payload_migrations',
  {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar(),
    batch: numeric(),
    updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    createdAt: timestamp('created_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (table) => [
    index('payload_migrations_created_at_idx').using('btree', table.createdAt.asc().nullsLast()),
    index('payload_migrations_updated_at_idx').using('btree', table.updatedAt.asc().nullsLast()),
  ],
)

export const payloadPreferences = pgTable(
  'payload_preferences',
  {
    id: uuid().defaultRandom().primaryKey(),
    key: varchar(),
    value: jsonb(),
    updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    createdAt: timestamp('created_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (table) => [
    index('payload_preferences_created_at_idx').using('btree', table.createdAt.asc().nullsLast()),
    index('payload_preferences_key_idx').using('btree', table.key.asc().nullsLast()),
    index('payload_preferences_updated_at_idx').using('btree', table.updatedAt.asc().nullsLast()),
  ],
)

export const payloadPreferencesRels = pgTable(
  'payload_preferences_rels',
  {
    id: serial().primaryKey(),
    order: integer(),
    parentId: uuid('parent_id')
      .notNull()
      .references(() => payloadPreferences.id, { onDelete: 'cascade' }),
    path: varchar().notNull(),
    usersId: uuid('users_id').references(() => users.id, { onDelete: 'cascade' }),
  },
  (table) => [
    index('payload_preferences_rels_order_idx').using('btree', table.order.asc().nullsLast()),
    index('payload_preferences_rels_parent_idx').using('btree', table.parentId.asc().nullsLast()),
    index('payload_preferences_rels_path_idx').using('btree', table.path.asc().nullsLast()),
    index('payload_preferences_rels_users_id_idx').using('btree', table.usersId.asc().nullsLast()),
  ],
)

export const products = pgTable(
  'products',
  {
    id: uuid().defaultRandom().primaryKey(),
    tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'set null' }),
    tenantSlug: varchar('tenant_slug').notNull(),
    name: varchar().notNull(),
    slug: varchar().notNull(),
    description: varchar().notNull(),
    shortDescription: varchar('short_description'),
    pricingPrice: numeric('pricing_price').notNull(),
    pricingCompareAtPrice: numeric('pricing_compare_at_price').notNull(),
    pricingCostPrice: numeric('pricing_cost_price').notNull(),
    pricingTaxable: boolean('pricing_taxable').default(true),
    inventoryTrackQuantity: boolean('inventory_track_quantity').default(true),
    inventoryQuantity: numeric('inventory_quantity', { mode: 'number' }).default(0),
    inventoryLowStockThreshold: numeric('inventory_low_stock_threshold', {
      mode: 'number',
    }).default(5),
    inventoryAllowBackorders: boolean('inventory_allow_backorders').default(false),
    categoryId: uuid('category_id')
      .notNull()
      .references(() => categories.id, { onDelete: 'set null' }),
    seoTitle: varchar('seo_title'),
    seoDescription: varchar('seo_description'),
    seoKeywords: varchar('seo_keywords'),
    featured: boolean().default(false),
    badge: enumProductsBadge(),
    content: jsonb(),
    shippingWeight: numeric('shipping_weight'),
    shippingDimensionsLength: numeric('shipping_dimensions_length'),
    shippingDimensionsWidth: numeric('shipping_dimensions_width'),
    shippingDimensionsHeight: numeric('shipping_dimensions_height'),
    shippingRequiresShipping: boolean('shipping_requires_shipping').default(true),
    shippingFreeShipping: boolean('shipping_free_shipping').default(false),
    shippingShippingCost: numeric('shipping_shipping_cost'),
    refundPolicy: enumProductsRefundPolicy('refund_policy').default('30-day').notNull(),
    status: enumProductsStatus().default('draft').notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    createdAt: timestamp('created_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (table) => [
    index('products_category_idx').using('btree', table.categoryId.asc().nullsLast()),
    index('products_created_at_idx').using('btree', table.createdAt.asc().nullsLast()),
    index('products_featured_idx').using('btree', table.featured.asc().nullsLast()),
    index('products_name_idx').using('btree', table.name.asc().nullsLast()),
    uniqueIndex('products_slug_idx').using('btree', table.slug.asc().nullsLast()),
    index('products_status_idx').using('btree', table.status.asc().nullsLast()),
    index('products_tenant_idx').using('btree', table.tenantId.asc().nullsLast()),
    index('products_tenant_slug_idx').using('btree', table.tenantSlug.asc().nullsLast()),
    index('products_updated_at_idx').using('btree', table.updatedAt.asc().nullsLast()),
    index('tenantSlug_name_idx').using(
      'btree',
      table.tenantSlug.asc().nullsLast(),
      table.name.asc().nullsLast(),
    ),
    uniqueIndex('tenantSlug_slug_idx').using(
      'btree',
      table.tenantSlug.asc().nullsLast(),
      table.slug.asc().nullsLast(),
    ),
  ],
)

export const productsImages = pgTable(
  'products_images',
  {
    order: integer('_order').notNull(),
    parentId: uuid('_parent_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    id: varchar().primaryKey(),
    imageId: uuid('image_id')
      .notNull()
      .references(() => media.id, { onDelete: 'set null' }),
    isPrimary: boolean('is_primary').default(false),
  },
  (table) => [
    index('products_images_image_idx').using('btree', table.imageId.asc().nullsLast()),
    index('products_images_order_idx').using('btree', table.order.asc().nullsLast()),
    index('products_images_parent_id_idx').using('btree', table.parentId.asc().nullsLast()),
  ],
)

export const productsRels = pgTable(
  'products_rels',
  {
    id: serial().primaryKey(),
    order: integer(),
    parentId: uuid('parent_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    path: varchar().notNull(),
    tagsId: uuid('tags_id').references(() => tags.id, { onDelete: 'cascade' }),
  },
  (table) => [
    index('products_rels_order_idx').using('btree', table.order.asc().nullsLast()),
    index('products_rels_parent_idx').using('btree', table.parentId.asc().nullsLast()),
    index('products_rels_path_idx').using('btree', table.path.asc().nullsLast()),
    index('products_rels_tags_id_idx').using('btree', table.tagsId.asc().nullsLast()),
  ],
)

export const productsSalesSummary = pgTable(
  'products_sales_summary',
  {
    id: uuid().defaultRandom().primaryKey(),
    tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'set null' }),
    productName: varchar('product_name').notNull(),
    month: varchar().notNull(),
    year: varchar().notNull(),
    totalOrders: numeric('total_orders').notNull(),
    costPrice: numeric('cost_price', { mode: 'number' }).default(60),
    grossSales: numeric('gross_sales').notNull(),
    netSales: numeric('net_sales').notNull(),
    totalItemsSold: numeric('total_items_sold').notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    createdAt: timestamp('created_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (table) => [
    index('products_sales_summary_created_at_idx').using(
      'btree',
      table.createdAt.asc().nullsLast(),
    ),
    index('products_sales_summary_tenant_idx').using('btree', table.tenantId.asc().nullsLast()),
    index('products_sales_summary_updated_at_idx').using(
      'btree',
      table.updatedAt.asc().nullsLast(),
    ),
  ],
)

export const productsSpecifications = pgTable(
  'products_specifications',
  {
    order: integer('_order').notNull(),
    parentId: uuid('_parent_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    id: varchar().primaryKey(),
    name: varchar().notNull(),
    value: varchar().notNull(),
  },
  (table) => [
    index('products_specifications_order_idx').using('btree', table.order.asc().nullsLast()),
    index('products_specifications_parent_id_idx').using('btree', table.parentId.asc().nullsLast()),
  ],
)

export const productsVariants = pgTable(
  'products_variants',
  {
    order: integer('_order').notNull(),
    parentId: uuid('_parent_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    id: varchar().primaryKey(),
    name: varchar().notNull(),
  },
  (table) => [
    index('products_variants_order_idx').using('btree', table.order.asc().nullsLast()),
    index('products_variants_parent_id_idx').using('btree', table.parentId.asc().nullsLast()),
  ],
)

export const productsVariantsOptions = pgTable(
  'products_variants_options',
  {
    order: integer('_order').notNull(),
    parentId: varchar('_parent_id')
      .notNull()
      .references(() => productsVariants.id, { onDelete: 'cascade' }),
    id: varchar().primaryKey(),
    label: varchar().notNull(),
    priceAdjustment: numeric('price_adjustment', { mode: 'number' }).default(0),
  },
  (table) => [
    index('products_variants_options_order_idx').using('btree', table.order.asc().nullsLast()),
    index('products_variants_options_parent_id_idx').using(
      'btree',
      table.parentId.asc().nullsLast(),
    ),
  ],
)

export const reviews = pgTable(
  'reviews',
  {
    id: uuid().defaultRandom().primaryKey(),
    tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'set null' }),
    name: varchar().notNull(),
    rating: numeric().notNull(),
    title: varchar().notNull(),
    description: varchar().notNull(),
    email: varchar(),
    productId: uuid('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'set null' }),
    updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    createdAt: timestamp('created_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (table) => [
    index('reviews_created_at_idx').using('btree', table.createdAt.asc().nullsLast()),
    index('reviews_product_idx').using('btree', table.productId.asc().nullsLast()),
    index('reviews_tenant_idx').using('btree', table.tenantId.asc().nullsLast()),
    index('reviews_updated_at_idx').using('btree', table.updatedAt.asc().nullsLast()),
  ],
)

export const subscriptionPlans = pgTable(
  'subscription_plans',
  {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar().notNull(),
    description: varchar(),
    amount: numeric().notNull(),
    currency: varchar().default('INR'),
    period: enumSubscriptionPlansPeriod().notNull(),
    interval: numeric({ mode: 'number' }).default(1),
    razorpayPlanId: varchar('razorpay_plan_id'),
    isActive: boolean('is_active').default(true),
    popular: boolean().default(false),
    updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    createdAt: timestamp('created_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (table) => [
    index('subscription_plans_created_at_idx').using('btree', table.createdAt.asc().nullsLast()),
    uniqueIndex('subscription_plans_name_idx').using('btree', table.name.asc().nullsLast()),
    uniqueIndex('subscription_plans_razorpay_plan_id_idx').using(
      'btree',
      table.razorpayPlanId.asc().nullsLast(),
    ),
    index('subscription_plans_updated_at_idx').using('btree', table.updatedAt.asc().nullsLast()),
  ],
)

export const subscriptionPlansFeatures = pgTable(
  'subscription_plans_features',
  {
    order: integer('_order').notNull(),
    parentId: uuid('_parent_id')
      .notNull()
      .references(() => subscriptionPlans.id, { onDelete: 'cascade' }),
    id: varchar().primaryKey(),
    feature: varchar().notNull(),
  },
  (table) => [
    index('subscription_plans_features_order_idx').using('btree', table.order.asc().nullsLast()),
    index('subscription_plans_features_parent_id_idx').using(
      'btree',
      table.parentId.asc().nullsLast(),
    ),
  ],
)

export const subscriptions = pgTable(
  'subscriptions',
  {
    id: uuid().defaultRandom().primaryKey(),
    tenantId: uuid('tenant_id')
      .notNull()
      .references(() => tenants.id, { onDelete: 'set null' }),
    planId: uuid('plan_id')
      .notNull()
      .references(() => subscriptionPlans.id, { onDelete: 'set null' }),
    razorpaySubscriptionId: varchar('razorpay_subscription_id').notNull(),
    status: enumSubscriptionsStatus().notNull(),
    startAt: timestamp('start_at', { precision: 3, withTimezone: true }),
    endAt: timestamp('end_at', { precision: 3, withTimezone: true }),
    currentStart: timestamp('current_start', { precision: 3, withTimezone: true }),
    currentEnd: timestamp('current_end', { precision: 3, withTimezone: true }),
    chargeAt: timestamp('charge_at', { precision: 3, withTimezone: true }),
    totalCount: numeric('total_count'),
    paidCount: numeric('paid_count', { mode: 'number' }).default(0),
    remainingCount: numeric('remaining_count'),
    updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    createdAt: timestamp('created_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (table) => [
    index('subscriptions_created_at_idx').using('btree', table.createdAt.asc().nullsLast()),
    index('subscriptions_plan_idx').using('btree', table.planId.asc().nullsLast()),
    uniqueIndex('subscriptions_razorpay_subscription_id_idx').using(
      'btree',
      table.razorpaySubscriptionId.asc().nullsLast(),
    ),
    index('subscriptions_status_idx').using('btree', table.status.asc().nullsLast()),
    index('subscriptions_tenant_idx').using('btree', table.tenantId.asc().nullsLast()),
    index('subscriptions_updated_at_idx').using('btree', table.updatedAt.asc().nullsLast()),
  ],
)

export const tags = pgTable(
  'tags',
  {
    id: uuid().defaultRandom().primaryKey(),
    tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'set null' }),
    name: varchar().notNull(),
    slug: varchar().notNull(),
    description: varchar(),
    type: enumTagsType().default('general').notNull(),
    featured: boolean().default(false),
    status: enumTagsStatus().default('active').notNull(),
    seoTitle: varchar('seo_title'),
    seoDescription: varchar('seo_description'),
    updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    createdAt: timestamp('created_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (table) => [
    index('tags_created_at_idx').using('btree', table.createdAt.asc().nullsLast()),
    index('tags_name_idx').using('btree', table.name.asc().nullsLast()),
    uniqueIndex('tags_slug_idx').using('btree', table.slug.asc().nullsLast()),
    index('tags_status_idx').using('btree', table.status.asc().nullsLast()),
    index('tags_tenant_idx').using('btree', table.tenantId.asc().nullsLast()),
    index('tags_updated_at_idx').using('btree', table.updatedAt.asc().nullsLast()),
  ],
)

export const tenants = pgTable(
  'tenants',
  {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar().notNull(),
    slug: varchar().notNull(),
    phone: varchar().notNull(),
    store: varchar().notNull(),
    activeTemplate: varchar('active_template').default('default').notNull(),
    subscriptionSubscriptionId: varchar('subscription_subscription_id'),
    subscriptionSubscriptionDetailsSubmitted: boolean(
      'subscription_subscription_details_submitted',
    ).default(false),
    subscriptionSubscriptionStatus: enumTenantsSubscriptionSubscriptionStatus(
      'subscription_subscription_status',
    ).default('trial'),
    subscriptionSubscriptionStartDate: timestamp('subscription_subscription_start_date', {
      precision: 3,
      withTimezone: true,
    }),
    subscriptionSubscriptionEndDate: timestamp('subscription_subscription_end_date', {
      precision: 3,
      withTimezone: true,
    }),
    subscriptionTrialStartDate: timestamp('subscription_trial_start_date', {
      precision: 3,
      withTimezone: true,
    }),
    subscriptionTrialEndDate: timestamp('subscription_trial_end_date', {
      precision: 3,
      withTimezone: true,
    }),
    subscriptionTrialDaysRemaining: numeric('subscription_trial_days_remaining'),
    subscriptionIsTrialActive: boolean('subscription_is_trial_active'),
    bankDetailsAccountHolderName: varchar('bank_details_account_holder_name'),
    bankDetailsAccountNumber: varchar('bank_details_account_number'),
    bankDetailsIfscCode: varchar('bank_details_ifsc_code'),
    bankDetailsBankDetailsSubmitted: boolean('bank_details_bank_details_submitted').default(false),
    bankDetailsAccountType: enumTenantsBankDetailsAccountType('bank_details_account_type').default(
      'vendor',
    ),
    bankDetailsRazorpayLinkedAccountId: varchar('bank_details_razorpay_linked_account_id'),
    bankDetailsRazorpayLinkedProductId: varchar('bank_details_razorpay_linked_product_id'),
    bankDetailsStatus: enumTenantsBankDetailsStatus('bank_details_status').default('not_submitted'),
    bankDetailsCommissionFee: numeric('bank_details_commission_fee', { mode: 'number' }).default(0),
    bankDetailsFlatFee: numeric('bank_details_flat_fee', { mode: 'number' }).default(0),
    bankDetailsPanCardNumber: varchar('bank_details_pan_card_number'),
    maxProducts: numeric('max_products', { mode: 'number' }).default(100),
    analyticsTotalProducts: numeric('analytics_total_products', { mode: 'number' }).default(0),
    updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    createdAt: timestamp('created_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (table) => [
    index('tenants_created_at_idx').using('btree', table.createdAt.asc().nullsLast()),
    uniqueIndex('tenants_phone_idx').using('btree', table.phone.asc().nullsLast()),
    uniqueIndex('tenants_slug_idx').using('btree', table.slug.asc().nullsLast()),
    index('tenants_subscription_subscription_subscription_status_idx').using(
      'btree',
      table.subscriptionSubscriptionStatus.asc().nullsLast(),
    ),
    index('tenants_updated_at_idx').using('btree', table.updatedAt.asc().nullsLast()),
  ],
)

export const users = pgTable(
  'users',
  {
    id: uuid().defaultRandom().primaryKey(),
    username: varchar().notNull(),
    phone: varchar().notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    createdAt: timestamp('created_at', { precision: 3, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    email: varchar().notNull(),
    resetPasswordToken: varchar('reset_password_token'),
    resetPasswordExpiration: timestamp('reset_password_expiration', {
      precision: 3,
      withTimezone: true,
    }),
    salt: varchar(),
    hash: varchar(),
    loginAttempts: numeric('login_attempts', { mode: 'number' }).default(0),
    lockUntil: timestamp('lock_until', { precision: 3, withTimezone: true }),
  },
  (table) => [
    index('users_created_at_idx').using('btree', table.createdAt.asc().nullsLast()),
    uniqueIndex('users_email_idx').using('btree', table.email.asc().nullsLast()),
    uniqueIndex('users_phone_idx').using('btree', table.phone.asc().nullsLast()),
    index('users_updated_at_idx').using('btree', table.updatedAt.asc().nullsLast()),
    uniqueIndex('users_username_idx').using('btree', table.username.asc().nullsLast()),
  ],
)

export const usersRoles = pgTable(
  'users_roles',
  {
    order: integer().notNull(),
    parentId: uuid('parent_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    value: enumUsersRoles(),
    id: uuid().defaultRandom().primaryKey(),
  },
  (table) => [
    index('users_roles_order_idx').using('btree', table.order.asc().nullsLast()),
    index('users_roles_parent_idx').using('btree', table.parentId.asc().nullsLast()),
  ],
)

export const usersSessions = pgTable(
  'users_sessions',
  {
    order: integer('_order').notNull(),
    parentId: uuid('_parent_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    id: varchar().primaryKey(),
    createdAt: timestamp('created_at', { precision: 3, withTimezone: true }),
    expiresAt: timestamp('expires_at', { precision: 3, withTimezone: true }).notNull(),
  },
  (table) => [
    index('users_sessions_order_idx').using('btree', table.order.asc().nullsLast()),
    index('users_sessions_parent_id_idx').using('btree', table.parentId.asc().nullsLast()),
  ],
)

export const usersTenants = pgTable(
  'users_tenants',
  {
    order: integer('_order').notNull(),
    parentId: uuid('_parent_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    id: varchar().primaryKey(),
    tenantId: uuid('tenant_id')
      .notNull()
      .references(() => tenants.id, { onDelete: 'set null' }),
  },
  (table) => [
    index('users_tenants_order_idx').using('btree', table.order.asc().nullsLast()),
    index('users_tenants_parent_id_idx').using('btree', table.parentId.asc().nullsLast()),
    index('users_tenants_tenant_idx').using('btree', table.tenantId.asc().nullsLast()),
  ],
)

export const vProductPerformanceByTenant = pgView('v_product_performance_by_tenant', {
  tenantId: integer('tenant_id'),
  productName: varchar('product_name'),
  totalGrossSales: numeric('total_gross_sales'),
  totalNetSales: numeric('total_net_sales'),
  totalCostPrice: numeric('total_cost_price'),
  totalItemsSold: numeric('total_items_sold'),
  totalOrders: numeric('total_orders'),
  productRankHigh: bigint('product_rank_high', { mode: 'number' }),
  productRankLow: bigint('product_rank_low', { mode: 'number' }),
}).as(
  sql`SELECT tenant_id, product_name, sum(gross_sales) AS total_gross_sales, sum(net_sales) AS total_net_sales, sum(cost_price) AS total_cost_price, sum(total_items_sold) AS total_items_sold, sum(total_orders) AS total_orders, row_number() OVER (PARTITION BY tenant_id ORDER BY (sum(gross_sales)) DESC) AS product_rank_high, row_number() OVER (PARTITION BY tenant_id ORDER BY (sum(gross_sales))) AS product_rank_low FROM products_sales_summary GROUP BY tenant_id, product_name`,
)

export const vTenantMonthlySales = pgView('v_tenant_monthly_sales', {
  tenantId: integer('tenant_id'),
  month: varchar(),
  totalGrossSales: numeric('total_gross_sales'),
  totalNetSales: numeric('total_net_sales'),
  totalOrders: numeric('total_orders'),
  averageOrderValue: numeric('average_order_value'),
}).as(
  sql`SELECT tenant_id, month, sum(gross_sales) AS total_gross_sales, sum(net_sales) AS total_net_sales, sum(total_orders) AS total_orders, sum(gross_sales) / NULLIF(sum(total_orders), 0::numeric) AS average_order_value FROM monthly_sales_summary GROUP BY tenant_id, month`,
)

export const vTopCategoriesByTenant = pgView('v_top_categories_by_tenant', {
  tenantId: integer('tenant_id'),
  categoryName: varchar('category_name'),
  totalGrossSales: numeric('total_gross_sales'),
  totalNetSales: numeric('total_net_sales'),
  totalOrders: numeric('total_orders'),
  totalItemsSold: numeric('total_items_sold'),
  categoryRank: bigint('category_rank', { mode: 'number' }),
}).as(
  sql`SELECT tenant_id, category_name, sum(gross_sales) AS total_gross_sales, sum(net_sales) AS total_net_sales, sum(total_orders) AS total_orders, sum(total_items_sold) AS total_items_sold, row_number() OVER (PARTITION BY tenant_id ORDER BY (sum(gross_sales)) DESC) AS category_rank FROM category_sales_summary GROUP BY tenant_id, category_name`,
)
