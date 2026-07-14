import { pgTable, pgView, index, foreignKey, integer, bigint, uuid, varchar, timestamp, uniqueIndex, numeric, boolean, jsonb, serial, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const enumCategoriesStatus = pgEnum("enum_categories_status", ['active', 'inactive', 'draft'])
export const enumProductsBadge = pgEnum("enum_products_badge", ['', 'new', 'sale', 'bestseller', 'limited'])
export const enumProductsRefundPolicy = pgEnum("enum_products_refund_policy", ['30-day', '14-day', '7-day', '3-day', '1-day', 'no-refunds'])
export const enumProductsStatus = pgEnum("enum_products_status", ['active', 'draft', 'archived'])
export const enumSubscriptionPlansPeriod = pgEnum("enum_subscription_plans_period", ['monthly', 'yearly'])
export const enumSubscriptionsStatus = pgEnum("enum_subscriptions_status", ['created', 'pending', 'authenticated', 'active', 'paused', 'halted', 'cancelled', 'completed', 'expired'])
export const enumTagsStatus = pgEnum("enum_tags_status", ['active', 'inactive'])
export const enumTagsType = pgEnum("enum_tags_type", ['general', 'feature', 'collection', 'season', 'style', 'material', 'color', 'size', 'brand', 'occasion'])
export const enumTenantsBankDetailsAccountType = pgEnum("enum_tenants_bank_details_account_type", ['vendor', 'super-vendor'])
export const enumTenantsBankDetailsStatus = pgEnum("enum_tenants_bank_details_status", ['pending', 'verified', 'rejected', 'suspended', 'not_submitted'])
export const enumTenantsSubscriptionSubscriptionStatus = pgEnum("enum_tenants_subscription_subscription_status", ['active', 'paused', 'cancelled', 'expired', 'none', 'trial', 'suspended'])
export const enumUsersRoles = pgEnum("enum_users_roles", ['super-admin', 'user'])


export const usersSessions = pgTable("users_sessions", {
	order: integer("_order").notNull(),
	parentId: uuid("_parent_id").notNull(),
	id: varchar().primaryKey().notNull(),
	createdAt: timestamp("created_at", { precision: 3, withTimezone: true, mode: 'string' }),
	expiresAt: timestamp("expires_at", { precision: 3, withTimezone: true, mode: 'string' }).notNull(),
}, (table) => [
	index("users_sessions_order_idx").using("btree", table.order.asc().nullsLast().op("int4_ops")),
	index("users_sessions_parent_id_idx").using("btree", table.parentId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [users.id],
			name: "users_sessions_parent_id_fk"
		}).onDelete("cascade"),
]);

export const media = pgTable("media", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantId: uuid("tenant_id"),
	alt: varchar().notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	createdAt: timestamp("created_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	url: varchar(),
	thumbnailURL: varchar("thumbnail_u_r_l"),
	filename: varchar(),
	mimeType: varchar("mime_type"),
	filesize: numeric(),
	width: numeric(),
	height: numeric(),
	focalX: numeric("focal_x"),
	focalY: numeric("focal_y"),
}, (table) => [
	index("media_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	uniqueIndex("media_filename_idx").using("btree", table.filename.asc().nullsLast().op("text_ops")),
	index("media_tenant_idx").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops")),
	index("media_updated_at_idx").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "media_tenant_id_tenants_id_fk"
		}).onDelete("set null"),
]);

export const tenants = pgTable("tenants", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar().notNull(),
	slug: varchar().notNull(),
	phone: varchar().notNull(),
	store: varchar().notNull(),
	activeTemplate: varchar("active_template").default('default').notNull(),
	subscriptionSubscriptionId: varchar("subscription_subscription_id"),
	subscriptionSubscriptionDetailsSubmitted: boolean("subscription_subscription_details_submitted").default(false),
	subscriptionSubscriptionStatus: enumTenantsSubscriptionSubscriptionStatus("subscription_subscription_status").default('trial'),
	subscriptionSubscriptionStartDate: timestamp("subscription_subscription_start_date", { precision: 3, withTimezone: true, mode: 'string' }),
	subscriptionSubscriptionEndDate: timestamp("subscription_subscription_end_date", { precision: 3, withTimezone: true, mode: 'string' }),
	subscriptionTrialStartDate: timestamp("subscription_trial_start_date", { precision: 3, withTimezone: true, mode: 'string' }),
	subscriptionTrialEndDate: timestamp("subscription_trial_end_date", { precision: 3, withTimezone: true, mode: 'string' }),
	subscriptionTrialDaysRemaining: numeric("subscription_trial_days_remaining"),
	subscriptionIsTrialActive: boolean("subscription_is_trial_active"),
	bankDetailsAccountHolderName: varchar("bank_details_account_holder_name"),
	bankDetailsAccountNumber: varchar("bank_details_account_number"),
	bankDetailsIfscCode: varchar("bank_details_ifsc_code"),
	bankDetailsBankDetailsSubmitted: boolean("bank_details_bank_details_submitted").default(false),
	bankDetailsAccountType: enumTenantsBankDetailsAccountType("bank_details_account_type").default('vendor'),
	bankDetailsRazorpayLinkedAccountId: varchar("bank_details_razorpay_linked_account_id"),
	bankDetailsRazorpayLinkedProductId: varchar("bank_details_razorpay_linked_product_id"),
	bankDetailsStatus: enumTenantsBankDetailsStatus("bank_details_status").default('not_submitted'),
	bankDetailsCommissionFee: numeric("bank_details_commission_fee").default('0'),
	bankDetailsFlatFee: numeric("bank_details_flat_fee").default('0'),
	bankDetailsPanCardNumber: varchar("bank_details_pan_card_number"),
	maxProducts: numeric("max_products").default('100'),
	analyticsTotalProducts: numeric("analytics_total_products").default('0'),
	updatedAt: timestamp("updated_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	createdAt: timestamp("created_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("tenants_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	uniqueIndex("tenants_phone_idx").using("btree", table.phone.asc().nullsLast().op("text_ops")),
	uniqueIndex("tenants_slug_idx").using("btree", table.slug.asc().nullsLast().op("text_ops")),
	index("tenants_subscription_subscription_subscription_status_idx").using("btree", table.subscriptionSubscriptionStatus.asc().nullsLast().op("enum_ops")),
	index("tenants_updated_at_idx").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
]);

export const productsImages = pgTable("products_images", {
	order: integer("_order").notNull(),
	parentId: uuid("_parent_id").notNull(),
	id: varchar().primaryKey().notNull(),
	imageId: uuid("image_id").notNull(),
	isPrimary: boolean("is_primary").default(false),
}, (table) => [
	index("products_images_image_idx").using("btree", table.imageId.asc().nullsLast().op("uuid_ops")),
	index("products_images_order_idx").using("btree", table.order.asc().nullsLast().op("int4_ops")),
	index("products_images_parent_id_idx").using("btree", table.parentId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.imageId],
			foreignColumns: [media.id],
			name: "products_images_image_id_media_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [products.id],
			name: "products_images_parent_id_fk"
		}).onDelete("cascade"),
]);

export const products = pgTable("products", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantId: uuid("tenant_id"),
	tenantSlug: varchar("tenant_slug").notNull(),
	name: varchar().notNull(),
	slug: varchar().notNull(),
	description: varchar().notNull(),
	shortDescription: varchar("short_description"),
	pricingPrice: numeric("pricing_price").notNull(),
	pricingCompareAtPrice: numeric("pricing_compare_at_price").notNull(),
	pricingCostPrice: numeric("pricing_cost_price").notNull(),
	pricingTaxable: boolean("pricing_taxable").default(true),
	inventoryTrackQuantity: boolean("inventory_track_quantity").default(true),
	inventoryQuantity: numeric("inventory_quantity").default('0'),
	inventoryLowStockThreshold: numeric("inventory_low_stock_threshold").default('5'),
	inventoryAllowBackorders: boolean("inventory_allow_backorders").default(false),
	categoryId: uuid("category_id").notNull(),
	seoTitle: varchar("seo_title"),
	seoDescription: varchar("seo_description"),
	seoKeywords: varchar("seo_keywords"),
	featured: boolean().default(false),
	badge: enumProductsBadge(),
	content: jsonb(),
	shippingWeight: numeric("shipping_weight"),
	shippingDimensionsLength: numeric("shipping_dimensions_length"),
	shippingDimensionsWidth: numeric("shipping_dimensions_width"),
	shippingDimensionsHeight: numeric("shipping_dimensions_height"),
	shippingRequiresShipping: boolean("shipping_requires_shipping").default(true),
	shippingFreeShipping: boolean("shipping_free_shipping").default(false),
	shippingShippingCost: numeric("shipping_shipping_cost"),
	refundPolicy: enumProductsRefundPolicy("refund_policy").default('30-day').notNull(),
	status: enumProductsStatus().default('draft').notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	createdAt: timestamp("created_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("products_category_idx").using("btree", table.categoryId.asc().nullsLast().op("uuid_ops")),
	index("products_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	index("products_featured_idx").using("btree", table.featured.asc().nullsLast().op("bool_ops")),
	index("products_name_idx").using("btree", table.name.asc().nullsLast().op("text_ops")),
	uniqueIndex("products_slug_idx").using("btree", table.slug.asc().nullsLast().op("text_ops")),
	index("products_status_idx").using("btree", table.status.asc().nullsLast().op("enum_ops")),
	index("products_tenant_idx").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops")),
	index("products_tenant_slug_idx").using("btree", table.tenantSlug.asc().nullsLast().op("text_ops")),
	index("products_updated_at_idx").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("tenantSlug_name_idx").using("btree", table.tenantSlug.asc().nullsLast().op("text_ops"), table.name.asc().nullsLast().op("text_ops")),
	uniqueIndex("tenantSlug_slug_idx").using("btree", table.tenantSlug.asc().nullsLast().op("text_ops"), table.slug.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "products_tenant_id_tenants_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [categories.id],
			name: "products_category_id_categories_id_fk"
		}).onDelete("set null"),
]);

export const productsSpecifications = pgTable("products_specifications", {
	order: integer("_order").notNull(),
	parentId: uuid("_parent_id").notNull(),
	id: varchar().primaryKey().notNull(),
	name: varchar().notNull(),
	value: varchar().notNull(),
}, (table) => [
	index("products_specifications_order_idx").using("btree", table.order.asc().nullsLast().op("int4_ops")),
	index("products_specifications_parent_id_idx").using("btree", table.parentId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [products.id],
			name: "products_specifications_parent_id_fk"
		}).onDelete("cascade"),
]);

export const productsVariants = pgTable("products_variants", {
	order: integer("_order").notNull(),
	parentId: uuid("_parent_id").notNull(),
	id: varchar().primaryKey().notNull(),
	name: varchar().notNull(),
}, (table) => [
	index("products_variants_order_idx").using("btree", table.order.asc().nullsLast().op("int4_ops")),
	index("products_variants_parent_id_idx").using("btree", table.parentId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [products.id],
			name: "products_variants_parent_id_fk"
		}).onDelete("cascade"),
]);

export const productsVariantsOptions = pgTable("products_variants_options", {
	order: integer("_order").notNull(),
	parentId: varchar("_parent_id").notNull(),
	id: varchar().primaryKey().notNull(),
	label: varchar().notNull(),
	priceAdjustment: numeric("price_adjustment").default('0'),
}, (table) => [
	index("products_variants_options_order_idx").using("btree", table.order.asc().nullsLast().op("int4_ops")),
	index("products_variants_options_parent_id_idx").using("btree", table.parentId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [productsVariants.id],
			name: "products_variants_options_parent_id_fk"
		}).onDelete("cascade"),
]);

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	username: varchar().notNull(),
	phone: varchar().notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	createdAt: timestamp("created_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	email: varchar().notNull(),
	resetPasswordToken: varchar("reset_password_token"),
	resetPasswordExpiration: timestamp("reset_password_expiration", { precision: 3, withTimezone: true, mode: 'string' }),
	salt: varchar(),
	hash: varchar(),
	loginAttempts: numeric("login_attempts").default('0'),
	lockUntil: timestamp("lock_until", { precision: 3, withTimezone: true, mode: 'string' }),
}, (table) => [
	index("users_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	uniqueIndex("users_email_idx").using("btree", table.email.asc().nullsLast().op("text_ops")),
	uniqueIndex("users_phone_idx").using("btree", table.phone.asc().nullsLast().op("text_ops")),
	index("users_updated_at_idx").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	uniqueIndex("users_username_idx").using("btree", table.username.asc().nullsLast().op("text_ops")),
]);

export const usersTenants = pgTable("users_tenants", {
	order: integer("_order").notNull(),
	parentId: uuid("_parent_id").notNull(),
	id: varchar().primaryKey().notNull(),
	tenantId: uuid("tenant_id").notNull(),
}, (table) => [
	index("users_tenants_order_idx").using("btree", table.order.asc().nullsLast().op("int4_ops")),
	index("users_tenants_parent_id_idx").using("btree", table.parentId.asc().nullsLast().op("uuid_ops")),
	index("users_tenants_tenant_idx").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "users_tenants_tenant_id_tenants_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [users.id],
			name: "users_tenants_parent_id_fk"
		}).onDelete("cascade"),
]);

export const tags = pgTable("tags", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantId: uuid("tenant_id"),
	name: varchar().notNull(),
	slug: varchar().notNull(),
	description: varchar(),
	type: enumTagsType().default('general').notNull(),
	featured: boolean().default(false),
	status: enumTagsStatus().default('active').notNull(),
	seoTitle: varchar("seo_title"),
	seoDescription: varchar("seo_description"),
	updatedAt: timestamp("updated_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	createdAt: timestamp("created_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("tags_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	index("tags_name_idx").using("btree", table.name.asc().nullsLast().op("text_ops")),
	uniqueIndex("tags_slug_idx").using("btree", table.slug.asc().nullsLast().op("text_ops")),
	index("tags_status_idx").using("btree", table.status.asc().nullsLast().op("enum_ops")),
	index("tags_tenant_idx").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops")),
	index("tags_updated_at_idx").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "tags_tenant_id_tenants_id_fk"
		}).onDelete("set null"),
]);

export const productsRels = pgTable("products_rels", {
	id: serial().primaryKey().notNull(),
	order: integer(),
	parentId: uuid("parent_id").notNull(),
	path: varchar().notNull(),
	tagsId: uuid("tags_id"),
}, (table) => [
	index("products_rels_order_idx").using("btree", table.order.asc().nullsLast().op("int4_ops")),
	index("products_rels_parent_idx").using("btree", table.parentId.asc().nullsLast().op("uuid_ops")),
	index("products_rels_path_idx").using("btree", table.path.asc().nullsLast().op("text_ops")),
	index("products_rels_tags_id_idx").using("btree", table.tagsId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [products.id],
			name: "products_rels_parent_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.tagsId],
			foreignColumns: [tags.id],
			name: "products_rels_tags_fk"
		}).onDelete("cascade"),
]);

export const categories = pgTable("categories", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantId: uuid("tenant_id"),
	tenantSlug: varchar("tenant_slug").notNull(),
	name: varchar().notNull(),
	slug: varchar().notNull(),
	description: varchar(),
	status: enumCategoriesStatus().default('active').notNull(),
	featured: boolean().default(false),
	parentId: uuid("parent_id"),
	thumbnailId: uuid("thumbnail_id").notNull(),
	seoTitle: varchar("seo_title"),
	seoDescription: varchar("seo_description"),
	seoKeywords: varchar("seo_keywords"),
	seoOgImageId: uuid("seo_og_image_id"),
	updatedAt: timestamp("updated_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	createdAt: timestamp("created_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("categories_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	index("categories_parent_idx").using("btree", table.parentId.asc().nullsLast().op("uuid_ops")),
	index("categories_seo_seo_og_image_idx").using("btree", table.seoOgImageId.asc().nullsLast().op("uuid_ops")),
	index("categories_slug_idx").using("btree", table.slug.asc().nullsLast().op("text_ops")),
	index("categories_status_idx").using("btree", table.status.asc().nullsLast().op("enum_ops")),
	index("categories_tenant_idx").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops")),
	index("categories_tenant_slug_idx").using("btree", table.tenantSlug.asc().nullsLast().op("text_ops")),
	index("categories_thumbnail_idx").using("btree", table.thumbnailId.asc().nullsLast().op("uuid_ops")),
	index("categories_updated_at_idx").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	index("tenantSlug_featured_idx").using("btree", table.tenantSlug.asc().nullsLast().op("text_ops"), table.featured.asc().nullsLast().op("text_ops")),
	uniqueIndex("tenantSlug_slug_1_idx").using("btree", table.tenantSlug.asc().nullsLast().op("text_ops"), table.slug.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "categories_tenant_id_tenants_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [table.id],
			name: "categories_parent_id_categories_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.thumbnailId],
			foreignColumns: [media.id],
			name: "categories_thumbnail_id_media_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.seoOgImageId],
			foreignColumns: [media.id],
			name: "categories_seo_og_image_id_media_id_fk"
		}).onDelete("set null"),
]);

export const reviews = pgTable("reviews", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantId: uuid("tenant_id"),
	name: varchar().notNull(),
	rating: numeric().notNull(),
	title: varchar().notNull(),
	description: varchar().notNull(),
	email: varchar(),
	productId: uuid("product_id").notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	createdAt: timestamp("created_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("reviews_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	index("reviews_product_idx").using("btree", table.productId.asc().nullsLast().op("uuid_ops")),
	index("reviews_tenant_idx").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops")),
	index("reviews_updated_at_idx").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "reviews_tenant_id_tenants_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: "reviews_product_id_products_id_fk"
		}).onDelete("set null"),
]);

export const subscriptionPlansFeatures = pgTable("subscription_plans_features", {
	order: integer("_order").notNull(),
	parentId: uuid("_parent_id").notNull(),
	id: varchar().primaryKey().notNull(),
	feature: varchar().notNull(),
}, (table) => [
	index("subscription_plans_features_order_idx").using("btree", table.order.asc().nullsLast().op("int4_ops")),
	index("subscription_plans_features_parent_id_idx").using("btree", table.parentId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [subscriptionPlans.id],
			name: "subscription_plans_features_parent_id_fk"
		}).onDelete("cascade"),
]);

export const customers = pgTable("customers", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantId: uuid("tenant_id"),
	firstname: varchar().notNull(),
	lastname: varchar().notNull(),
	email: varchar().notNull(),
	newsLetter: boolean("news_letter").default(false),
	shippingAddressStreet: varchar("shipping_address_street").notNull(),
	shippingAddressApartment: varchar("shipping_address_apartment").notNull(),
	shippingAddressCity: varchar("shipping_address_city").notNull(),
	shippingAddressPostalCode: varchar("shipping_address_postal_code").notNull(),
	shippingAddressState: varchar("shipping_address_state").notNull(),
	shippingAddressCountry: varchar("shipping_address_country").notNull(),
	deliveryOption: varchar("delivery_option"),
	specialInstructions: varchar("special_instructions"),
	updatedAt: timestamp("updated_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	createdAt: timestamp("created_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("customers_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	index("customers_tenant_idx").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops")),
	index("customers_updated_at_idx").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "customers_tenant_id_tenants_id_fk"
		}).onDelete("set null"),
]);

export const orders = pgTable("orders", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantId: uuid("tenant_id"),
	name: varchar().notNull(),
	customerId: uuid("customer_id").notNull(),
	isPaid: boolean("is_paid").default(false).notNull(),
	orderDate: timestamp("order_date", { precision: 3, withTimezone: true, mode: 'string' }).notNull(),
	grossAmount: numeric("gross_amount").notNull(),
	discountAmount: numeric("discount_amount").default('0'),
	taxAmount: numeric("tax_amount").default('0').notNull(),
	shippingAmount: numeric("shipping_amount").default('0'),
	saleAmount: numeric("sale_amount").default('0').notNull(),
	razorpayCheckoutSessionId: varchar("razorpay_checkout_session_id"),
	razorpayOrderId: varchar("razorpay_order_id"),
	updatedAt: timestamp("updated_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	createdAt: timestamp("created_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("orders_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	index("orders_customer_idx").using("btree", table.customerId.asc().nullsLast().op("uuid_ops")),
	index("orders_tenant_idx").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops")),
	index("orders_updated_at_idx").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "orders_tenant_id_tenants_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.customerId],
			foreignColumns: [customers.id],
			name: "orders_customer_id_customers_id_fk"
		}).onDelete("set null"),
]);

export const categorySalesSummary = pgTable("category_sales_summary", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantId: uuid("tenant_id"),
	categoryName: varchar("category_name").notNull(),
	month: varchar().notNull(),
	year: varchar().notNull(),
	totalOrders: numeric("total_orders").notNull(),
	grossSales: numeric("gross_sales").notNull(),
	netSales: numeric("net_sales").notNull(),
	totalItemsSold: numeric("total_items_sold").notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	createdAt: timestamp("created_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("category_sales_summary_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	index("category_sales_summary_tenant_idx").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops")),
	index("category_sales_summary_updated_at_idx").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "category_sales_summary_tenant_id_tenants_id_fk"
		}).onDelete("set null"),
]);

export const productsSalesSummary = pgTable("products_sales_summary", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantId: uuid("tenant_id"),
	productName: varchar("product_name").notNull(),
	month: varchar().notNull(),
	year: varchar().notNull(),
	totalOrders: numeric("total_orders").notNull(),
	costPrice: numeric("cost_price").default('60'),
	grossSales: numeric("gross_sales").notNull(),
	netSales: numeric("net_sales").notNull(),
	totalItemsSold: numeric("total_items_sold").notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	createdAt: timestamp("created_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("products_sales_summary_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	index("products_sales_summary_tenant_idx").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops")),
	index("products_sales_summary_updated_at_idx").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "products_sales_summary_tenant_id_tenants_id_fk"
		}).onDelete("set null"),
]);

export const monthlySalesSummary = pgTable("monthly_sales_summary", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantId: uuid("tenant_id"),
	month: varchar().notNull(),
	year: varchar().notNull(),
	totalOrders: numeric("total_orders").notNull(),
	grossSales: numeric("gross_sales").notNull(),
	netSales: numeric("net_sales").notNull(),
	totalItemsSold: numeric("total_items_sold").notNull(),
	averageOrderValue: numeric("average_order_value").notNull(),
	updatedAt: timestamp("updated_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	createdAt: timestamp("created_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("monthly_sales_summary_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	index("monthly_sales_summary_tenant_idx").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops")),
	index("monthly_sales_summary_updated_at_idx").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "monthly_sales_summary_tenant_id_tenants_id_fk"
		}).onDelete("set null"),
]);

export const subscriptionPlans = pgTable("subscription_plans", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar().notNull(),
	description: varchar(),
	amount: numeric().notNull(),
	currency: varchar().default('INR'),
	period: enumSubscriptionPlansPeriod().notNull(),
	interval: numeric().default('1'),
	razorpayPlanId: varchar("razorpay_plan_id"),
	isActive: boolean("is_active").default(true),
	popular: boolean().default(false),
	updatedAt: timestamp("updated_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	createdAt: timestamp("created_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("subscription_plans_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	uniqueIndex("subscription_plans_name_idx").using("btree", table.name.asc().nullsLast().op("text_ops")),
	uniqueIndex("subscription_plans_razorpay_plan_id_idx").using("btree", table.razorpayPlanId.asc().nullsLast().op("text_ops")),
	index("subscription_plans_updated_at_idx").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
]);

export const subscriptions = pgTable("subscriptions", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	tenantId: uuid("tenant_id").notNull(),
	planId: uuid("plan_id").notNull(),
	razorpaySubscriptionId: varchar("razorpay_subscription_id").notNull(),
	status: enumSubscriptionsStatus().notNull(),
	startAt: timestamp("start_at", { precision: 3, withTimezone: true, mode: 'string' }),
	endAt: timestamp("end_at", { precision: 3, withTimezone: true, mode: 'string' }),
	currentStart: timestamp("current_start", { precision: 3, withTimezone: true, mode: 'string' }),
	currentEnd: timestamp("current_end", { precision: 3, withTimezone: true, mode: 'string' }),
	chargeAt: timestamp("charge_at", { precision: 3, withTimezone: true, mode: 'string' }),
	totalCount: numeric("total_count"),
	paidCount: numeric("paid_count").default('0'),
	remainingCount: numeric("remaining_count"),
	updatedAt: timestamp("updated_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	createdAt: timestamp("created_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("subscriptions_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	index("subscriptions_plan_idx").using("btree", table.planId.asc().nullsLast().op("uuid_ops")),
	uniqueIndex("subscriptions_razorpay_subscription_id_idx").using("btree", table.razorpaySubscriptionId.asc().nullsLast().op("text_ops")),
	index("subscriptions_status_idx").using("btree", table.status.asc().nullsLast().op("enum_ops")),
	index("subscriptions_tenant_idx").using("btree", table.tenantId.asc().nullsLast().op("uuid_ops")),
	index("subscriptions_updated_at_idx").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
	foreignKey({
			columns: [table.tenantId],
			foreignColumns: [tenants.id],
			name: "subscriptions_tenant_id_tenants_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.planId],
			foreignColumns: [subscriptionPlans.id],
			name: "subscriptions_plan_id_subscription_plans_id_fk"
		}).onDelete("set null"),
]);

export const payloadKv = pgTable("payload_kv", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	key: varchar().notNull(),
	data: jsonb().notNull(),
}, (table) => [
	uniqueIndex("payload_kv_key_idx").using("btree", table.key.asc().nullsLast().op("text_ops")),
]);

export const payloadMigrations = pgTable("payload_migrations", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar(),
	batch: numeric(),
	updatedAt: timestamp("updated_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	createdAt: timestamp("created_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("payload_migrations_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	index("payload_migrations_updated_at_idx").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
]);

export const usersRoles = pgTable("users_roles", {
	order: integer().notNull(),
	parentId: uuid("parent_id").notNull(),
	value: enumUsersRoles(),
	id: uuid().defaultRandom().primaryKey().notNull(),
}, (table) => [
	index("users_roles_order_idx").using("btree", table.order.asc().nullsLast().op("int4_ops")),
	index("users_roles_parent_idx").using("btree", table.parentId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [users.id],
			name: "users_roles_parent_fk"
		}).onDelete("cascade"),
]);

export const ordersOrderItems = pgTable("orders_order_items", {
	order: integer("_order").notNull(),
	parentId: uuid("_parent_id").notNull(),
	id: varchar().primaryKey().notNull(),
	product: varchar().notNull(),
	category: varchar(),
	quantity: numeric().notNull(),
	unitPrice: numeric("unit_price").notNull(),
	discountPerItem: numeric("discount_per_item").default('0'),
	grossItemAmount: numeric("gross_item_amount").notNull(),
}, (table) => [
	index("orders_order_items_order_idx").using("btree", table.order.asc().nullsLast().op("int4_ops")),
	index("orders_order_items_parent_id_idx").using("btree", table.parentId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [orders.id],
			name: "orders_order_items_parent_id_fk"
		}).onDelete("cascade"),
]);

export const payloadLockedDocuments = pgTable("payload_locked_documents", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	globalSlug: varchar("global_slug"),
	updatedAt: timestamp("updated_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	createdAt: timestamp("created_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("payload_locked_documents_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	index("payload_locked_documents_global_slug_idx").using("btree", table.globalSlug.asc().nullsLast().op("text_ops")),
	index("payload_locked_documents_updated_at_idx").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
]);

export const payloadLockedDocumentsRels = pgTable("payload_locked_documents_rels", {
	id: serial().primaryKey().notNull(),
	order: integer(),
	parentId: uuid("parent_id").notNull(),
	path: varchar().notNull(),
	usersId: uuid("users_id"),
	mediaId: uuid("media_id"),
	tenantsId: uuid("tenants_id"),
	productsId: uuid("products_id"),
	tagsId: uuid("tags_id"),
	categoriesId: uuid("categories_id"),
	reviewsId: uuid("reviews_id"),
	subscriptionPlansId: uuid("subscription_plans_id"),
	subscriptionsId: uuid("subscriptions_id"),
	customersId: uuid("customers_id"),
	ordersId: uuid("orders_id"),
	categorySalesSummaryId: uuid("category_sales_summary_id"),
	productsSalesSummaryId: uuid("products_sales_summary_id"),
	monthlySalesSummaryId: uuid("monthly_sales_summary_id"),
}, (table) => [
	index("payload_locked_documents_rels_categories_id_idx").using("btree", table.categoriesId.asc().nullsLast().op("uuid_ops")),
	index("payload_locked_documents_rels_category_sales_summary_id_idx").using("btree", table.categorySalesSummaryId.asc().nullsLast().op("uuid_ops")),
	index("payload_locked_documents_rels_customers_id_idx").using("btree", table.customersId.asc().nullsLast().op("uuid_ops")),
	index("payload_locked_documents_rels_media_id_idx").using("btree", table.mediaId.asc().nullsLast().op("uuid_ops")),
	index("payload_locked_documents_rels_monthly_sales_summary_id_idx").using("btree", table.monthlySalesSummaryId.asc().nullsLast().op("uuid_ops")),
	index("payload_locked_documents_rels_order_idx").using("btree", table.order.asc().nullsLast().op("int4_ops")),
	index("payload_locked_documents_rels_orders_id_idx").using("btree", table.ordersId.asc().nullsLast().op("uuid_ops")),
	index("payload_locked_documents_rels_parent_idx").using("btree", table.parentId.asc().nullsLast().op("uuid_ops")),
	index("payload_locked_documents_rels_path_idx").using("btree", table.path.asc().nullsLast().op("text_ops")),
	index("payload_locked_documents_rels_products_id_idx").using("btree", table.productsId.asc().nullsLast().op("uuid_ops")),
	index("payload_locked_documents_rels_products_sales_summary_id_idx").using("btree", table.productsSalesSummaryId.asc().nullsLast().op("uuid_ops")),
	index("payload_locked_documents_rels_reviews_id_idx").using("btree", table.reviewsId.asc().nullsLast().op("uuid_ops")),
	index("payload_locked_documents_rels_subscription_plans_id_idx").using("btree", table.subscriptionPlansId.asc().nullsLast().op("uuid_ops")),
	index("payload_locked_documents_rels_subscriptions_id_idx").using("btree", table.subscriptionsId.asc().nullsLast().op("uuid_ops")),
	index("payload_locked_documents_rels_tags_id_idx").using("btree", table.tagsId.asc().nullsLast().op("uuid_ops")),
	index("payload_locked_documents_rels_tenants_id_idx").using("btree", table.tenantsId.asc().nullsLast().op("uuid_ops")),
	index("payload_locked_documents_rels_users_id_idx").using("btree", table.usersId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [payloadLockedDocuments.id],
			name: "payload_locked_documents_rels_parent_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.usersId],
			foreignColumns: [users.id],
			name: "payload_locked_documents_rels_users_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.mediaId],
			foreignColumns: [media.id],
			name: "payload_locked_documents_rels_media_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.tenantsId],
			foreignColumns: [tenants.id],
			name: "payload_locked_documents_rels_tenants_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.productsId],
			foreignColumns: [products.id],
			name: "payload_locked_documents_rels_products_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.tagsId],
			foreignColumns: [tags.id],
			name: "payload_locked_documents_rels_tags_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.categoriesId],
			foreignColumns: [categories.id],
			name: "payload_locked_documents_rels_categories_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.reviewsId],
			foreignColumns: [reviews.id],
			name: "payload_locked_documents_rels_reviews_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.subscriptionPlansId],
			foreignColumns: [subscriptionPlans.id],
			name: "payload_locked_documents_rels_subscription_plans_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.subscriptionsId],
			foreignColumns: [subscriptions.id],
			name: "payload_locked_documents_rels_subscriptions_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.customersId],
			foreignColumns: [customers.id],
			name: "payload_locked_documents_rels_customers_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.ordersId],
			foreignColumns: [orders.id],
			name: "payload_locked_documents_rels_orders_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.categorySalesSummaryId],
			foreignColumns: [categorySalesSummary.id],
			name: "payload_locked_documents_rels_category_sales_summary_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.productsSalesSummaryId],
			foreignColumns: [productsSalesSummary.id],
			name: "payload_locked_documents_rels_products_sales_summary_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.monthlySalesSummaryId],
			foreignColumns: [monthlySalesSummary.id],
			name: "payload_locked_documents_rels_monthly_sales_summary_fk"
		}).onDelete("cascade"),
]);

export const payloadPreferences = pgTable("payload_preferences", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	key: varchar(),
	value: jsonb(),
	updatedAt: timestamp("updated_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	createdAt: timestamp("created_at", { precision: 3, withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("payload_preferences_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	index("payload_preferences_key_idx").using("btree", table.key.asc().nullsLast().op("text_ops")),
	index("payload_preferences_updated_at_idx").using("btree", table.updatedAt.asc().nullsLast().op("timestamptz_ops")),
]);

export const payloadPreferencesRels = pgTable("payload_preferences_rels", {
	id: serial().primaryKey().notNull(),
	order: integer(),
	parentId: uuid("parent_id").notNull(),
	path: varchar().notNull(),
	usersId: uuid("users_id"),
}, (table) => [
	index("payload_preferences_rels_order_idx").using("btree", table.order.asc().nullsLast().op("int4_ops")),
	index("payload_preferences_rels_parent_idx").using("btree", table.parentId.asc().nullsLast().op("uuid_ops")),
	index("payload_preferences_rels_path_idx").using("btree", table.path.asc().nullsLast().op("text_ops")),
	index("payload_preferences_rels_users_id_idx").using("btree", table.usersId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [payloadPreferences.id],
			name: "payload_preferences_rels_parent_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.usersId],
			foreignColumns: [users.id],
			name: "payload_preferences_rels_users_fk"
		}).onDelete("cascade"),
]);

export const vTenantMonthlySales = pgView("v_tenant_monthly_sales", {
	tenantId: uuid("tenant_id"),
	month: varchar(),
	totalGrossSales: numeric("total_gross_sales"),
	totalNetSales: numeric("total_net_sales"),
	totalOrders: numeric("total_orders"),
	averageOrderValue: numeric("average_order_value"),
}).existing();

export const vTopCategoriesByTenant = pgView("v_top_categories_by_tenant", {
	tenantId: uuid("tenant_id"),
	categoryName: varchar("category_name"),
	totalGrossSales: numeric("total_gross_sales"),
	totalNetSales: numeric("total_net_sales"),
	totalOrders: numeric("total_orders"),
	totalItemsSold: numeric("total_items_sold"),
	categoryRank: bigint("category_rank", { mode: "number" }),
}).existing();

export const vProductPerformanceByTenant = pgView("v_product_performance_by_tenant", {
	tenantId: uuid("tenant_id"),
	productName: varchar("product_name"),
	totalGrossSales: numeric("total_gross_sales"),
	totalNetSales: numeric("total_net_sales"),
	totalCostPrice: numeric("total_cost_price"),
	totalItemsSold: numeric("total_items_sold"),
	totalOrders: numeric("total_orders"),
	productRankHigh: bigint("product_rank_high", { mode: "number" }),
	productRankLow: bigint("product_rank_low", { mode: "number" }),
}).existing();
