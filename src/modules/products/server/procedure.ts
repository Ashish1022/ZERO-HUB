import { z } from "zod";

import type { Where } from "payload";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category, Media } from "@/payload-types";
import { sortedValues } from "../search-param";
import { db } from "@/db";

import { categories, media, products, productsImages, reviews } from "../../../../drizzle/schema";
import { and, or, gt, eq, inArray, gte, lte } from 'drizzle-orm';

export const productsRouter = createTRPCRouter({
    getManyByPayload: baseProcedure
        .input(
            z.object({
                search: z.string().nullable().optional(),
                cursor: z.number().default(1),
                minPrice: z.string().nullable().optional(),
                maxPrice: z.string().nullable().optional(),
                sort: z.enum(sortedValues).nullable().optional(),
                category: z.array(z.string()).nullable().optional(),
                slug: z.string().nullable().optional(),
                limit: z.number().default(12),
            })
        )
        .query(async ({ ctx, input }) => {
            const where: Where = {
                tenantSlug: {
                    equals: input.slug
                }
            }

            if (input.search) {
                where["name"] = {
                    like: input.search,
                }
            }

            if (input.category && input.category.length > 0) {
                const categoriesData = await ctx.db.find({
                    collection: "categories",
                    limit: 1,
                    depth: 1,
                    pagination: false,
                    where: {
                        slug: {
                            in: input.category
                        }
                    },
                    select: {
                        subcategories: true,
                        slug: true
                    }
                })
                const formattedData = categoriesData.docs.map((doc) => ({
                    ...doc,
                    subcategories: (doc.subcategories?.docs ?? []).map((subdoc) => ({
                        ...(subdoc as Category),
                    })),
                }));

                const subcategoriesSlugs = [];
                const parentCategory = formattedData[0]

                if (parentCategory) {
                    subcategoriesSlugs.push(...parentCategory.subcategories.map((subcategory) => subcategory.slug))
                    where["category.slug"] = {
                        in: [parentCategory.slug, ...subcategoriesSlugs]
                    }
                }
            }

            if (input.minPrice && input.maxPrice) {
                where["pricing.price"] = {
                    greater_than_equal: input.minPrice,
                    less_than_equal: input.maxPrice,
                }
            } else if (input.minPrice) {
                where["pricing.price"] = {
                    greater_than_equal: input.minPrice
                }
            } else if (input.maxPrice) {
                where["pricing.price"] = {
                    less_than_equal: input.maxPrice
                }
            }

            const data = await ctx.db.find({
                collection: "products",
                limit: input.limit,
                page: input.cursor,
                depth: 1,
                where: where,
                select: {
                    featured: true,
                    name: true,
                    slug: true,
                    category: true,
                    images: true,
                    description: true,
                    pricing: true,
                    badge: true,
                }
            });

            const transformedData = await Promise.all(
                data.docs.map(async (doc) => {
                    const reviewsData = await ctx.db.find({
                        collection: "reviews",
                        depth: 0,
                        pagination: false,
                        where: {
                            product: {
                                equals: doc.id
                            }
                        }
                    });
                    return {
                        ...doc,
                        images: doc.images?.map(imageItem => ({
                            ...imageItem,
                            image: imageItem.image as Media,
                        })) || [],
                        category: doc.category as Category,
                        reviewCount: reviewsData.totalDocs,
                        reviewRating: reviewsData.docs.length === 0 ? 0 :
                            reviewsData.docs.reduce((acc, review) => acc + review.rating, 0) / reviewsData.totalDocs
                    };
                })
            );

            return {
                ...data,
                docs: transformedData
            }
        }),
    getFeaturedByPayload: baseProcedure
        .input(
            z.object({
                slug: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            const products = await ctx.db.find({
                collection: "products",
                limit: 4,
                pagination: false,
                depth: 1,
                where: {
                    and: [
                        {
                            tenantSlug: {
                                equals: input.slug
                            }
                        },
                        {
                            featured: {
                                equals: true
                            }
                        }
                    ]
                },
                select: {
                    featured: true,
                    name: true,
                    slug: true,
                    category: true,
                    images: true,
                    description: true,
                    pricing: true,
                    badge: true,
                }
            })

            const data = await Promise.all(
                products.docs.map(async (doc) => {
                    const reviewsData = await ctx.db.find({
                        collection: "reviews",
                        depth: 0,
                        pagination: false,
                        where: {
                            product: {
                                equals: doc.id
                            }
                        }
                    });
                    return {
                        ...doc,
                        images: doc.images?.map(imageItem => ({
                            ...imageItem,
                            image: imageItem.image as Media,
                        })) || [],
                        category: doc.category as Category,
                        reviewCount: reviewsData.totalDocs,
                        reviewRating: reviewsData.docs.length === 0 ? 0 :
                            reviewsData.docs.reduce((acc, review) => acc + review.rating, 0) / reviewsData.totalDocs
                    };
                })
            );

            return data
        }),
    getFeatured: baseProcedure
        .input(
            z.object({
                slug: z.string(),
            })
        )
        .query(async ({ input }) => {
            const productsData = await db
                .select({
                    id: products.id,
                    featured: products.featured,
                    name: products.name,
                    slug: products.slug,
                    categoryId: products.categoryId,
                    description: products.description,
                    pricingPrice: products.pricingPrice,
                    pricingCompareAtPrice: products.pricingCompareAtPrice,
                    badge: products.badge,
                    updatedAt: products.updatedAt,
                    categoryName: categories.name,
                    categorySlug: categories.slug,
                })
                .from(products)
                .leftJoin(categories, eq(products.categoryId, categories.id))
                .where(and(
                    eq(products.tenantSlug, input.slug),
                    eq(categories.featured, true)
                ))
                .limit(8);

            const productIds = productsData.map(p => p.id);

            const productReviews = await db
                .select({
                    id: reviews.id,
                    name: reviews.name,
                    rating: reviews.rating,
                    title: reviews.title,
                    description: reviews.description,
                    productId: reviews.productId
                })
                .from(reviews)
                .where(inArray(reviews.productId, productIds))
            const images = await db
                .select({
                    imageId: productsImages.imageId,
                    parentId: productsImages.parentId,
                    isPrimary: productsImages.isPrimary,
                    order: productsImages.order,
                    url: media.url,
                    filename: media.filename
                })
                .from(productsImages)
                .leftJoin(media, eq(productsImages.imageId, media.id))
                .where(inArray(productsImages.parentId, productIds));

            const imagesByProductId: Record<string, typeof images> = {};
            const reviewsByProductId: Record<string, typeof productReviews> = {};

            productReviews.forEach(review => {
                const productId = review.productId;
                if (!reviewsByProductId[productId]) {
                    reviewsByProductId[productId] = [];
                }
                reviewsByProductId[productId].push(review)
            })

            images.forEach(image => {
                const productId = image.parentId;
                if (!imagesByProductId[productId]) {
                    imagesByProductId[productId] = [];
                }
                imagesByProductId[productId].push(image);
            });

            const data = productsData.map(item => {
                const productImages = imagesByProductId[item.id] || []
                const productReviews = reviewsByProductId[item.id] || []

                const reviewCount = productReviews.length;
                const reviewRating = reviewCount === 0 ? 0 :
                    productReviews.reduce((acc, review) => acc + parseFloat(review.rating), 0) / reviewCount;

                return {
                    ...item,
                    images: productImages,
                    reviewCount,
                    reviewRating,
                }
            })

            return data

        }),
    getOne: baseProcedure
        .input(
            z.object({
                slug: z.string(),
                product: z.string()
            })
        )
        .query(async ({ ctx, input }) => {
            const product = await ctx.db.find({
                collection: "products",
                limit: 1,
                depth: 1,
                pagination: false,
                where: {
                    and: [
                        {
                            tenantSlug: {
                                equals: input.slug
                            }
                        },
                        {
                            slug: {
                                equals: input.product
                            }
                        }
                    ]
                },
                select: {
                    name: true,
                    images: true,
                    description: true,
                    pricing: true,
                    slug: true,
                    badge: true,
                    inventory: true,
                    category: true,
                    specifications: true,
                    variants: true,
                    shipping: true,
                    refundPolicy: true,
                }
            });
            const data = product.docs[0]

            const review = await ctx.db.find({
                collection: "reviews",
                pagination: false,
                where: {
                    product: {
                        equals: data.id
                    }
                }
            })
            const reviewRating = review.docs.length > 0 ? review.docs.reduce((acc, review) => acc + review.rating, 0) / review.totalDocs : 0;
            const ratingDistribution: Record<number, number> = {
                5: 0,
                4: 0,
                3: 0,
                2: 0,
                1: 0,
            };

            if (review.totalDocs > 0) {
                review.docs.forEach((review) => {
                    const rating = review.rating
                    if (rating >= 1 && rating <= 5) ratingDistribution[rating] = (ratingDistribution[rating] || 0) + 1;
                });
                Object.keys(ratingDistribution).forEach((key) => {
                    const rating = Number(key);
                    const count = ratingDistribution[rating] || 0;
                    ratingDistribution[rating] = Math.round(
                        (count / review.totalDocs) * 100,
                    )
                })
            }

            return {
                ...data,
                images: data.images?.map(imageItem => ({
                    ...imageItem,
                    image: imageItem.image as Media,
                })) || [],
                category: data.category as Category,
                reviewRating,
                reviewCount: review.totalDocs,
                reviews: review.docs,
                ratingDistribution,
            }
        }),
    getMany: baseProcedure
        .input(
            z.object({
                slug: z.string(),
                cursor: z.object({
                    id: z.string(),
                    updatedAt: z.string(),
                }).optional(),
                limit: z.number().default(12),
                minPrice: z.string().nullable().optional(),
                maxPrice: z.string().nullable().optional(),
                category: z.array(z.string()).nullable().optional(),
            })
        )
        .query(async ({ input }) => {
            const { slug, cursor, limit, minPrice, maxPrice, category } = input;

            const baseCondition = eq(products.tenantSlug, slug);
            const whereConditions = [baseCondition];

            if (cursor) {
                const cursorCondition = or(
                    gt(products.updatedAt, cursor.updatedAt),
                    and(
                        eq(products.updatedAt, cursor.updatedAt),
                        gt(products.id, cursor.id)
                    )
                );
                if (cursorCondition) {
                    whereConditions.push(cursorCondition);
                }
            }

            if (minPrice && maxPrice) {
                const priceCondition = and(
                    gte(products.pricingPrice, minPrice),
                    lte(products.pricingPrice, maxPrice)
                );
                if (priceCondition) {
                    whereConditions.push(priceCondition);
                }
            } else if (minPrice) {
                whereConditions.push(gte(products.pricingPrice, minPrice));
            } else if (maxPrice) {
                whereConditions.push(lte(products.pricingPrice, maxPrice));
            }

            if (category && category.length > 0) {
                const categoriesData = await db
                    .select({
                        id: categories.id,
                        slug: categories.slug,
                        parentId: categories.parentId
                    })
                    .from(categories)
                    .where(inArray(categories.slug, category));

                if (categoriesData.length > 0) {
                    const parentCategoryIds = categoriesData
                        .filter(cat => !cat.parentId)
                        .map(cat => cat.id);

                    const allCategoryIds = categoriesData.map(cat => cat.id);

                    if (parentCategoryIds.length > 0) {
                        const subcategoriesData = await db
                            .select({
                                id: categories.id,
                                slug: categories.slug,
                                parentId: categories.parentId
                            })
                            .from(categories)
                            .where(inArray(categories.parentId, parentCategoryIds));

                        allCategoryIds.push(...subcategoriesData.map(sub => sub.id));
                    }

                    const uniqueCategoryIds = [...new Set(allCategoryIds)];
                    whereConditions.push(inArray(products.categoryId, uniqueCategoryIds));
                }
            }

            const validConditions = whereConditions.filter(Boolean);
            const whereCondition = validConditions.length === 1 ? validConditions[0] : and(...validConditions);

            const productsList = await db
                .select({
                    id: products.id,
                    featured: products.featured,
                    name: products.name,
                    slug: products.slug,
                    categoryId: products.categoryId,
                    description: products.description,
                    pricingPrice: products.pricingPrice,
                    pricingCompareAtPrice: products.pricingCompareAtPrice,
                    badge: products.badge,
                    updatedAt: products.updatedAt,
                    categoryName: categories.name,
                    categorySlug: categories.slug,
                })
                .from(products)
                .leftJoin(categories, eq(products.categoryId, categories.id))
                .where(whereCondition)
                .orderBy(products.updatedAt, products.id)
                .limit(limit + 1);

            if (!productsList || productsList.length === 0) {
                return {
                    data: [],
                    nextCursor: null,
                    totalDocs: 0,
                    hasNextPage: false,
                };
            }

            const hasNextPage = productsList.length > limit
            const resultItems = hasNextPage ? productsList.slice(0, limit) : productsList;

            let nextCursor = null;
            if (hasNextPage && resultItems.length > 0) {
                const lastItem = resultItems[resultItems.length - 1];
                nextCursor = {
                    id: lastItem.id,
                    updatedAt: lastItem.updatedAt
                }
            }

            const productIds = resultItems.map(p => p.id);

            const productReviews = await db
                .select({
                    id: reviews.id,
                    name: reviews.name,
                    rating: reviews.rating,
                    title: reviews.title,
                    description: reviews.description,
                    productId: reviews.productId
                })
                .from(reviews)
                .where(inArray(reviews.productId, productIds))

            const images = await db
                .select({
                    imageId: productsImages.imageId,
                    parentId: productsImages.parentId,
                    isPrimary: productsImages.isPrimary,
                    order: productsImages.order,
                    url: media.url,
                    filename: media.filename
                })
                .from(productsImages)
                .leftJoin(media, eq(productsImages.imageId, media.id))
                .where(inArray(productsImages.parentId, productIds));

            const imagesByProductId: Record<string, typeof images> = {};
            const reviewsByProductId: Record<string, typeof productReviews> = {};

            productReviews.forEach(review => {
                const productId = review.productId;
                if (!reviewsByProductId[productId]) {
                    reviewsByProductId[productId] = [];
                }
                reviewsByProductId[productId].push(review)
            })

            images.forEach(image => {
                const productId = image.parentId;
                if (!imagesByProductId[productId]) {
                    imagesByProductId[productId] = [];
                }
                imagesByProductId[productId].push(image);
            });

            const data = resultItems.map(item => {
                const productImages = imagesByProductId[item.id] || []
                const productReviews = reviewsByProductId[item.id] || []

                const reviewCount = productReviews.length;
                const reviewRating = reviewCount === 0 ? 0 :
                    productReviews.reduce((acc, review) => acc + parseFloat(review.rating), 0) / reviewCount;

                return {
                    ...item,
                    images: productImages,
                    reviewCount,
                    reviewRating,
                }
            })

            return {
                data,
                nextCursor,
                totalDocs: resultItems.length,
                hasNextPage,
            };
        })
})