import { relations } from "drizzle-orm/relations";
import { users, usersSessions, tenants, media, productsImages, products, categories, productsSpecifications, productsVariants, productsVariantsOptions, usersTenants, tags, productsRels, reviews, subscriptionPlans, subscriptionPlansFeatures, customers, orders, categorySalesSummary, productsSalesSummary, monthlySalesSummary, subscriptions, usersRoles, ordersOrderItems, payloadLockedDocuments, payloadLockedDocumentsRels, payloadPreferences, payloadPreferencesRels } from "./schema";

export const usersSessionsRelations = relations(usersSessions, ({one}) => ({
	user: one(users, {
		fields: [usersSessions.parentId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	usersSessions: many(usersSessions),
	usersTenants: many(usersTenants),
	usersRoles: many(usersRoles),
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
	payloadPreferencesRels: many(payloadPreferencesRels),
}));

export const mediaRelations = relations(media, ({one, many}) => ({
	tenant: one(tenants, {
		fields: [media.tenantId],
		references: [tenants.id]
	}),
	productsImages: many(productsImages),
	categories_thumbnailId: many(categories, {
		relationName: "categories_thumbnailId_media_id"
	}),
	categories_seoOgImageId: many(categories, {
		relationName: "categories_seoOgImageId_media_id"
	}),
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
}));

export const tenantsRelations = relations(tenants, ({many}) => ({
	media: many(media),
	products: many(products),
	usersTenants: many(usersTenants),
	tags: many(tags),
	categories: many(categories),
	reviews: many(reviews),
	customers: many(customers),
	orders: many(orders),
	categorySalesSummaries: many(categorySalesSummary),
	productsSalesSummaries: many(productsSalesSummary),
	monthlySalesSummaries: many(monthlySalesSummary),
	subscriptions: many(subscriptions),
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
}));

export const productsImagesRelations = relations(productsImages, ({one}) => ({
	media: one(media, {
		fields: [productsImages.imageId],
		references: [media.id]
	}),
	product: one(products, {
		fields: [productsImages.parentId],
		references: [products.id]
	}),
}));

export const productsRelations = relations(products, ({one, many}) => ({
	productsImages: many(productsImages),
	tenant: one(tenants, {
		fields: [products.tenantId],
		references: [tenants.id]
	}),
	category: one(categories, {
		fields: [products.categoryId],
		references: [categories.id]
	}),
	productsSpecifications: many(productsSpecifications),
	productsVariants: many(productsVariants),
	productsRels: many(productsRels),
	reviews: many(reviews),
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
}));

export const categoriesRelations = relations(categories, ({one, many}) => ({
	products: many(products),
	tenant: one(tenants, {
		fields: [categories.tenantId],
		references: [tenants.id]
	}),
	category: one(categories, {
		fields: [categories.parentId],
		references: [categories.id],
		relationName: "categories_parentId_categories_id"
	}),
	categories: many(categories, {
		relationName: "categories_parentId_categories_id"
	}),
	media_thumbnailId: one(media, {
		fields: [categories.thumbnailId],
		references: [media.id],
		relationName: "categories_thumbnailId_media_id"
	}),
	media_seoOgImageId: one(media, {
		fields: [categories.seoOgImageId],
		references: [media.id],
		relationName: "categories_seoOgImageId_media_id"
	}),
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
}));

export const productsSpecificationsRelations = relations(productsSpecifications, ({one}) => ({
	product: one(products, {
		fields: [productsSpecifications.parentId],
		references: [products.id]
	}),
}));

export const productsVariantsRelations = relations(productsVariants, ({one, many}) => ({
	product: one(products, {
		fields: [productsVariants.parentId],
		references: [products.id]
	}),
	productsVariantsOptions: many(productsVariantsOptions),
}));

export const productsVariantsOptionsRelations = relations(productsVariantsOptions, ({one}) => ({
	productsVariant: one(productsVariants, {
		fields: [productsVariantsOptions.parentId],
		references: [productsVariants.id]
	}),
}));

export const usersTenantsRelations = relations(usersTenants, ({one}) => ({
	tenant: one(tenants, {
		fields: [usersTenants.tenantId],
		references: [tenants.id]
	}),
	user: one(users, {
		fields: [usersTenants.parentId],
		references: [users.id]
	}),
}));

export const tagsRelations = relations(tags, ({one, many}) => ({
	tenant: one(tenants, {
		fields: [tags.tenantId],
		references: [tenants.id]
	}),
	productsRels: many(productsRels),
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
}));

export const productsRelsRelations = relations(productsRels, ({one}) => ({
	product: one(products, {
		fields: [productsRels.parentId],
		references: [products.id]
	}),
	tag: one(tags, {
		fields: [productsRels.tagsId],
		references: [tags.id]
	}),
}));

export const reviewsRelations = relations(reviews, ({one, many}) => ({
	tenant: one(tenants, {
		fields: [reviews.tenantId],
		references: [tenants.id]
	}),
	product: one(products, {
		fields: [reviews.productId],
		references: [products.id]
	}),
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
}));

export const subscriptionPlansFeaturesRelations = relations(subscriptionPlansFeatures, ({one}) => ({
	subscriptionPlan: one(subscriptionPlans, {
		fields: [subscriptionPlansFeatures.parentId],
		references: [subscriptionPlans.id]
	}),
}));

export const subscriptionPlansRelations = relations(subscriptionPlans, ({many}) => ({
	subscriptionPlansFeatures: many(subscriptionPlansFeatures),
	subscriptions: many(subscriptions),
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
}));

export const customersRelations = relations(customers, ({one, many}) => ({
	tenant: one(tenants, {
		fields: [customers.tenantId],
		references: [tenants.id]
	}),
	orders: many(orders),
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
}));

export const ordersRelations = relations(orders, ({one, many}) => ({
	tenant: one(tenants, {
		fields: [orders.tenantId],
		references: [tenants.id]
	}),
	customer: one(customers, {
		fields: [orders.customerId],
		references: [customers.id]
	}),
	ordersOrderItems: many(ordersOrderItems),
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
}));

export const categorySalesSummaryRelations = relations(categorySalesSummary, ({one, many}) => ({
	tenant: one(tenants, {
		fields: [categorySalesSummary.tenantId],
		references: [tenants.id]
	}),
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
}));

export const productsSalesSummaryRelations = relations(productsSalesSummary, ({one, many}) => ({
	tenant: one(tenants, {
		fields: [productsSalesSummary.tenantId],
		references: [tenants.id]
	}),
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
}));

export const monthlySalesSummaryRelations = relations(monthlySalesSummary, ({one, many}) => ({
	tenant: one(tenants, {
		fields: [monthlySalesSummary.tenantId],
		references: [tenants.id]
	}),
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
}));

export const subscriptionsRelations = relations(subscriptions, ({one, many}) => ({
	tenant: one(tenants, {
		fields: [subscriptions.tenantId],
		references: [tenants.id]
	}),
	subscriptionPlan: one(subscriptionPlans, {
		fields: [subscriptions.planId],
		references: [subscriptionPlans.id]
	}),
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
}));

export const usersRolesRelations = relations(usersRoles, ({one}) => ({
	user: one(users, {
		fields: [usersRoles.parentId],
		references: [users.id]
	}),
}));

export const ordersOrderItemsRelations = relations(ordersOrderItems, ({one}) => ({
	order: one(orders, {
		fields: [ordersOrderItems.parentId],
		references: [orders.id]
	}),
}));

export const payloadLockedDocumentsRelsRelations = relations(payloadLockedDocumentsRels, ({one}) => ({
	payloadLockedDocument: one(payloadLockedDocuments, {
		fields: [payloadLockedDocumentsRels.parentId],
		references: [payloadLockedDocuments.id]
	}),
	user: one(users, {
		fields: [payloadLockedDocumentsRels.usersId],
		references: [users.id]
	}),
	media: one(media, {
		fields: [payloadLockedDocumentsRels.mediaId],
		references: [media.id]
	}),
	tenant: one(tenants, {
		fields: [payloadLockedDocumentsRels.tenantsId],
		references: [tenants.id]
	}),
	product: one(products, {
		fields: [payloadLockedDocumentsRels.productsId],
		references: [products.id]
	}),
	tag: one(tags, {
		fields: [payloadLockedDocumentsRels.tagsId],
		references: [tags.id]
	}),
	category: one(categories, {
		fields: [payloadLockedDocumentsRels.categoriesId],
		references: [categories.id]
	}),
	review: one(reviews, {
		fields: [payloadLockedDocumentsRels.reviewsId],
		references: [reviews.id]
	}),
	subscriptionPlan: one(subscriptionPlans, {
		fields: [payloadLockedDocumentsRels.subscriptionPlansId],
		references: [subscriptionPlans.id]
	}),
	subscription: one(subscriptions, {
		fields: [payloadLockedDocumentsRels.subscriptionsId],
		references: [subscriptions.id]
	}),
	customer: one(customers, {
		fields: [payloadLockedDocumentsRels.customersId],
		references: [customers.id]
	}),
	order: one(orders, {
		fields: [payloadLockedDocumentsRels.ordersId],
		references: [orders.id]
	}),
	categorySalesSummary: one(categorySalesSummary, {
		fields: [payloadLockedDocumentsRels.categorySalesSummaryId],
		references: [categorySalesSummary.id]
	}),
	productsSalesSummary: one(productsSalesSummary, {
		fields: [payloadLockedDocumentsRels.productsSalesSummaryId],
		references: [productsSalesSummary.id]
	}),
	monthlySalesSummary: one(monthlySalesSummary, {
		fields: [payloadLockedDocumentsRels.monthlySalesSummaryId],
		references: [monthlySalesSummary.id]
	}),
}));

export const payloadLockedDocumentsRelations = relations(payloadLockedDocuments, ({many}) => ({
	payloadLockedDocumentsRels: many(payloadLockedDocumentsRels),
}));

export const payloadPreferencesRelsRelations = relations(payloadPreferencesRels, ({one}) => ({
	payloadPreference: one(payloadPreferences, {
		fields: [payloadPreferencesRels.parentId],
		references: [payloadPreferences.id]
	}),
	user: one(users, {
		fields: [payloadPreferencesRels.usersId],
		references: [users.id]
	}),
}));

export const payloadPreferencesRelations = relations(payloadPreferences, ({many}) => ({
	payloadPreferencesRels: many(payloadPreferencesRels),
}));