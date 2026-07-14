import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	categories: {
		category: r.one.categories({
			from: r.categories.parentId,
			to: r.categories.id,
			alias: "categories_parentId_categories_id"
		}),
		categories: r.many.categories({
			alias: "categories_parentId_categories_id"
		}),
		mediaSeoOgImageId: r.one.media({
			from: r.categories.seoOgImageId,
			to: r.media.id,
			alias: "categories_seoOgImageId_media_id"
		}),
		tenant: r.one.tenants({
			from: r.categories.tenantId,
			to: r.tenants.id,
			alias: "categories_tenantId_tenants_id"
		}),
		mediaThumbnailId: r.one.media({
			from: r.categories.thumbnailId,
			to: r.media.id,
			alias: "categories_thumbnailId_media_id"
		}),
		payloadLockedDocumentsRels: r.many.payloadLockedDocumentsRels(),
		tenants: r.many.tenants({
			from: r.categories.id.through(r.products.categoryId),
			to: r.tenants.id.through(r.products.tenantId),
			alias: "categories_id_tenants_id_via_products"
		}),
	},
	media: {
		categoriesSeoOgImageId: r.many.categories({
			alias: "categories_seoOgImageId_media_id"
		}),
		categoriesThumbnailId: r.many.categories({
			alias: "categories_thumbnailId_media_id"
		}),
		tenant: r.one.tenants({
			from: r.media.tenantId,
			to: r.tenants.id
		}),
		payloadLockedDocumentsRels: r.many.payloadLockedDocumentsRels(),
		products: r.many.products({
			from: r.media.id.through(r.productsImages.imageId),
			to: r.products.id.through(r.productsImages.parentId)
		}),
	},
	tenants: {
		categoriesTenantId: r.many.categories({
			alias: "categories_tenantId_tenants_id"
		}),
		categorySalesSummaries: r.many.categorySalesSummary(),
		customersTenantId: r.many.customers({
			alias: "customers_tenantId_tenants_id"
		}),
		media: r.many.media(),
		monthlySalesSummaries: r.many.monthlySalesSummary(),
		customersViaOrders: r.many.customers({
			alias: "customers_id_tenants_id_via_orders"
		}),
		payloadLockedDocumentsRels: r.many.payloadLockedDocumentsRels(),
		categoriesViaProducts: r.many.categories({
			alias: "categories_id_tenants_id_via_products"
		}),
		productsSalesSummaries: r.many.productsSalesSummary(),
		products: r.many.products(),
		subscriptionPlans: r.many.subscriptionPlans(),
		tags: r.many.tags(),
		users: r.many.users(),
	},
	categorySalesSummary: {
		tenant: r.one.tenants({
			from: r.categorySalesSummary.tenantId,
			to: r.tenants.id
		}),
		payloadLockedDocumentsRels: r.many.payloadLockedDocumentsRels(),
	},
	customers: {
		tenant: r.one.tenants({
			from: r.customers.tenantId,
			to: r.tenants.id,
			alias: "customers_tenantId_tenants_id"
		}),
		tenants: r.many.tenants({
			from: r.customers.id.through(r.orders.customerId),
			to: r.tenants.id.through(r.orders.tenantId),
			alias: "customers_id_tenants_id_via_orders"
		}),
		payloadLockedDocumentsRels: r.many.payloadLockedDocumentsRels(),
	},
	monthlySalesSummary: {
		tenant: r.one.tenants({
			from: r.monthlySalesSummary.tenantId,
			to: r.tenants.id
		}),
		payloadLockedDocumentsRels: r.many.payloadLockedDocumentsRels(),
	},
	ordersOrderItems: {
		orderRelation: r.one.orders({
			from: r.ordersOrderItems.parentId,
			to: r.orders.id
		}),
	},
	orders: {
		ordersOrderItems: r.many.ordersOrderItems(),
		payloadLockedDocumentsRels: r.many.payloadLockedDocumentsRels(),
	},
	payloadLockedDocumentsRels: {
		category: r.one.categories({
			from: r.payloadLockedDocumentsRels.categoriesId,
			to: r.categories.id
		}),
		categorySalesSummary: r.one.categorySalesSummary({
			from: r.payloadLockedDocumentsRels.categorySalesSummaryId,
			to: r.categorySalesSummary.id
		}),
		customer: r.one.customers({
			from: r.payloadLockedDocumentsRels.customersId,
			to: r.customers.id
		}),
		media: r.one.media({
			from: r.payloadLockedDocumentsRels.mediaId,
			to: r.media.id
		}),
		monthlySalesSummary: r.one.monthlySalesSummary({
			from: r.payloadLockedDocumentsRels.monthlySalesSummaryId,
			to: r.monthlySalesSummary.id
		}),
		orderRelation: r.one.orders({
			from: r.payloadLockedDocumentsRels.ordersId,
			to: r.orders.id
		}),
		payloadLockedDocument: r.one.payloadLockedDocuments({
			from: r.payloadLockedDocumentsRels.parentId,
			to: r.payloadLockedDocuments.id
		}),
		product: r.one.products({
			from: r.payloadLockedDocumentsRels.productsId,
			to: r.products.id
		}),
		productsSalesSummary: r.one.productsSalesSummary({
			from: r.payloadLockedDocumentsRels.productsSalesSummaryId,
			to: r.productsSalesSummary.id
		}),
		review: r.one.reviews({
			from: r.payloadLockedDocumentsRels.reviewsId,
			to: r.reviews.id
		}),
		subscriptionPlan: r.one.subscriptionPlans({
			from: r.payloadLockedDocumentsRels.subscriptionPlansId,
			to: r.subscriptionPlans.id
		}),
		subscription: r.one.subscriptions({
			from: r.payloadLockedDocumentsRels.subscriptionsId,
			to: r.subscriptions.id
		}),
		tag: r.one.tags({
			from: r.payloadLockedDocumentsRels.tagsId,
			to: r.tags.id
		}),
		tenant: r.one.tenants({
			from: r.payloadLockedDocumentsRels.tenantsId,
			to: r.tenants.id
		}),
		user: r.one.users({
			from: r.payloadLockedDocumentsRels.usersId,
			to: r.users.id
		}),
	},
	payloadLockedDocuments: {
		payloadLockedDocumentsRels: r.many.payloadLockedDocumentsRels(),
	},
	products: {
		payloadLockedDocumentsRels: r.many.payloadLockedDocumentsRels(),
		media: r.many.media(),
		tags: r.many.tags({
			from: r.products.id.through(r.productsRels.parentId),
			to: r.tags.id.through(r.productsRels.tagsId)
		}),
		productsSpecifications: r.many.productsSpecifications(),
		productsVariants: r.many.productsVariants(),
		tenants: r.many.tenants({
			from: r.products.id.through(r.reviews.productId),
			to: r.tenants.id.through(r.reviews.tenantId)
		}),
	},
	productsSalesSummary: {
		payloadLockedDocumentsRels: r.many.payloadLockedDocumentsRels(),
		tenant: r.one.tenants({
			from: r.productsSalesSummary.tenantId,
			to: r.tenants.id
		}),
	},
	reviews: {
		payloadLockedDocumentsRels: r.many.payloadLockedDocumentsRels(),
	},
	subscriptionPlans: {
		payloadLockedDocumentsRels: r.many.payloadLockedDocumentsRels(),
		subscriptionPlansFeatures: r.many.subscriptionPlansFeatures(),
		tenants: r.many.tenants({
			from: r.subscriptionPlans.id.through(r.subscriptions.planId),
			to: r.tenants.id.through(r.subscriptions.tenantId)
		}),
	},
	subscriptions: {
		payloadLockedDocumentsRels: r.many.payloadLockedDocumentsRels(),
	},
	tags: {
		payloadLockedDocumentsRels: r.many.payloadLockedDocumentsRels(),
		products: r.many.products(),
		tenant: r.one.tenants({
			from: r.tags.tenantId,
			to: r.tenants.id
		}),
	},
	users: {
		payloadLockedDocumentsRels: r.many.payloadLockedDocumentsRels(),
		payloadPreferences: r.many.payloadPreferences(),
		usersRoles: r.many.usersRoles(),
		usersSessions: r.many.usersSessions(),
		tenants: r.many.tenants({
			from: r.users.id.through(r.usersTenants.parentId),
			to: r.tenants.id.through(r.usersTenants.tenantId)
		}),
	},
	payloadPreferences: {
		users: r.many.users({
			from: r.payloadPreferences.id.through(r.payloadPreferencesRels.parentId),
			to: r.users.id.through(r.payloadPreferencesRels.usersId)
		}),
	},
	productsSpecifications: {
		product: r.one.products({
			from: r.productsSpecifications.parentId,
			to: r.products.id
		}),
	},
	productsVariants: {
		product: r.one.products({
			from: r.productsVariants.parentId,
			to: r.products.id
		}),
		productsVariantsOptions: r.many.productsVariantsOptions(),
	},
	productsVariantsOptions: {
		productsVariant: r.one.productsVariants({
			from: r.productsVariantsOptions.parentId,
			to: r.productsVariants.id
		}),
	},
	subscriptionPlansFeatures: {
		subscriptionPlan: r.one.subscriptionPlans({
			from: r.subscriptionPlansFeatures.parentId,
			to: r.subscriptionPlans.id
		}),
	},
	usersRoles: {
		user: r.one.users({
			from: r.usersRoles.parentId,
			to: r.users.id
		}),
	},
	usersSessions: {
		user: r.one.users({
			from: r.usersSessions.parentId,
			to: r.users.id
		}),
	},
}))