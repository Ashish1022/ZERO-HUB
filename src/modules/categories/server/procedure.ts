import { z } from "zod";

import { Category, Media } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { db } from "@/db";
import { categories, media } from "../../../../drizzle/schema";
import { and, eq, gt, inArray, isNull, or, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

const constructMediaURL = (filename: string) => {
    if (!filename) return null;
    return `/api/media/file/${filename}`;
};

export const categoriesRouter = createTRPCRouter({
    getManyByPayload: baseProcedure
        .input(
            z.object({
                slug: z.string(),
                cursor: z.number().default(1),
                limit: z.number().default(12),
            })
        )
        .query(async ({ ctx, input }) => {
            const data = await ctx.db.find({
                collection: "categories",
                limit: input.limit,
                page: input.cursor,
                depth: 1,
                where: {
                    tenantSlug: {
                        equals: input.slug
                    }
                },
                select: {
                    name: true,
                    slug: true,
                    stats: true,
                    featured: true,
                    thumbnail: true,
                    subcategories: true,
                    description: true,
                },
                sort: 'name'
            });

            const transformedData = data.docs.map((doc) => ({
                ...doc,
                subcategories: (doc.subcategories?.docs ?? []).map((subdoc) => ({
                    ...(subdoc as Category)
                })),
                thumbnail: doc.thumbnail as Media
            }));

            return {
                ...data,
                docs: transformedData
            }
        }),
    getFeaturedByPayload: baseProcedure
        .input(
            z.object({
                slug: z.string()
            })
        )
        .query(async ({ ctx, input }) => {
            const categories = await ctx.db.find({
                collection: "categories",
                limit: 8,
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
                    name: true,
                    slug: true,
                    stats: true,
                    thumbnail: true,
                    subcategories: true,
                    description: true,
                },
                sort: 'name'
            });

            const data = categories.docs.map((doc) => ({
                ...doc,
                subcategories: (doc.subcategories?.docs ?? []).map((subdoc) => ({
                    ...(subdoc as Category)
                })),
                thumbnail: doc.thumbnail as Media
            }));

            return data
        }),
    getOneByPayload: baseProcedure
        .input(
            z.object({
                category: z.string(),
                slug: z.string()
            })
        )
        .query(async ({ ctx, input }) => {
            const category = await ctx.db.find({
                collection: "categories",
                limit: 1,
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
                            slug: {
                                equals: input.category
                            }
                        }
                    ]
                },
                select: {
                    subcategories: true,
                    slug: true,
                    name: true,
                    stats: true,
                    description: true,
                    thumbnail: true,
                    featured: true
                }
            });

            const data = category.docs.map((doc) => ({
                ...doc,
                subcategories: (doc.subcategories?.docs ?? []).map((subdoc) => ({
                    ...(subdoc as Category),
                })),
                thumbnail: doc.thumbnail as Media
            }));

            return data[0]
        }),
    getOne: baseProcedure
        .input(
            z.object({
                category: z.string(),
                slug: z.string()
            })
        )
        .query(async ({ input }) => {
            const { slug, category } = input
            const [categoryData] = await db
                .select({
                    id: categories.id,
                    name: categories.name,
                    slug: categories.slug,
                    featured: categories.featured,
                    thumbnailId: categories.thumbnailId,
                    parentId: categories.parentId,
                    description: categories.description,
                    updatedAt: categories.updatedAt,
                    thumbnailFilename: media.filename,
                    productCount: sql<number>`(
                SELECT COUNT(*)
                FROM products
                WHERE category_id=${categories.id}
            )`.as('product_count'),
                })
                .from(categories)
                .leftJoin(media, eq(media.id, categories.thumbnailId))
                .where(and(
                    eq(categories.tenantSlug, slug),
                    eq(categories.slug, category)
                ))
                .limit(1);
            if (!categoryData) throw new TRPCError({ code: 'NOT_FOUND', message: "Category not found" })
            const subcategoriesData = await db
                .select({
                    id: categories.id,
                    name: categories.name,
                    slug: categories.slug,
                    featured: categories.featured,
                    thumbnailId: categories.thumbnailId,
                    parentId: categories.parentId,
                    description: categories.description,
                    updatedAt: categories.updatedAt,
                    thumbnailFilename: media.filename,
                    productCount: sql<number>`(
                                SELECT COUNT(*)
                                FROM products
                                WHERE category_id=${categories.id}
                            )`.as('product_count'),
                })
                .from(categories)
                .leftJoin(media, eq(media.id, categories.thumbnailId))
                .where(
                    and(
                        eq(categories.tenantSlug, slug),
                        eq(categories.parentId, categoryData.id),
                    )
                )

            const subcategoriesByParent = subcategoriesData.reduce((acc, subcat) => {
                if (!acc[subcat.parentId!]) {
                    acc[subcat.parentId!] = [];
                }
                acc[subcat.parentId!].push(subcat);
                return acc;
            }, {} as Record<string, typeof subcategoriesData>);

            const data = {
                ...categoryData,
                thumbnail: categoryData.thumbnailFilename ? {
                    filename: categoryData.thumbnailFilename,
                    url: constructMediaURL(categoryData.thumbnailFilename)
                } : null,
                subcategories: (subcategoriesByParent[categoryData.id] || []).map((subcat) => ({
                    ...subcat,
                    thumbnail: subcat.thumbnailFilename ? {
                        filename: subcat.thumbnailFilename,
                        url: constructMediaURL(subcat.thumbnailFilename)
                    } : null,
                })),
            }

            return data
        }),
    getFeatured: baseProcedure
        .input(
            z.object({
                slug: z.string()
            })
        )
        .query(async ({ input }) => {
            const { slug } = input
            const categoriesData = await db
                .select({
                    id: categories.id,
                    name: categories.name,
                    slug: categories.slug,
                    stats: categories.slug,
                    featured: categories.featured,
                    thumbnailId: categories.thumbnailId,
                    parentId: categories.parentId,
                    description: categories.description,
                    updatedAt: categories.updatedAt,
                    thumbnailFilename: media.filename,
                    productCount: sql<number>`(
                            SELECT COUNT(*)
                            FROM products
                            WHERE category_id=${categories.id}
                            )`.as('product_count'),
                })
                .from(categories)
                .leftJoin(media, eq(media.id, categories.thumbnailId))
                .where(and(
                    eq(categories.tenantSlug, slug),
                    isNull(categories.parentId),
                    eq(categories.featured, true)
                ))
                .orderBy(categories.updatedAt, categories.id)
                .limit(8);

            const categoryIds = categoriesData.map(c => c.id)

            const subcategoriesData = categoryIds.length > 0
                ? await db
                    .select({
                        id: categories.id,
                        name: categories.name,
                        slug: categories.slug,
                        stats: categories.slug,
                        featured: categories.featured,
                        thumbnailId: categories.thumbnailId,
                        parentId: categories.parentId,
                        description: categories.description,
                        updatedAt: categories.updatedAt,
                        thumbnailFilename: media.filename,
                        productCount: sql<number>`(
                    SELECT COUNT(*)
                    FROM products
                    WHERE category_id=${categories.id}
                )`.as('product_count'),
                    })
                    .from(categories)
                    .leftJoin(media, eq(media.id, categories.thumbnailId))
                    .where(
                        and(
                            eq(categories.tenantSlug, slug),
                            inArray(categories.parentId, categoryIds),
                            eq(categories.featured, true)
                        )
                    )
                    .orderBy(categories.name)
                : [];

            const subcategoriesByParent = subcategoriesData.reduce((acc, subcat) => {
                if (!acc[subcat.parentId!]) {
                    acc[subcat.parentId!] = [];
                }
                acc[subcat.parentId!].push(subcat);
                return acc;
            }, {} as Record<string, typeof subcategoriesData>);

            const data = categoriesData.map((category) => ({
                ...category,
                thumbnail: category.thumbnailFilename ? {
                    filename: category.thumbnailFilename,
                    url: constructMediaURL(category.thumbnailFilename)
                } : null,
                subcategories: (subcategoriesByParent[category.id] || []).map((subcat) => ({
                    ...subcat,
                    thumbnail: subcat.thumbnailFilename ? {
                        filename: subcat.thumbnailFilename,
                        url: constructMediaURL(subcat.thumbnailFilename)
                    } : null,
                })),
            }))

            return data
        }),
    getMany: baseProcedure
        .input(
            z.object({
                slug: z.string(),
                cursor: z.object({
                    id: z.string(),
                    updatedAt: z.string()
                }).optional(),
                limit: z.number().default(3),
            })
        )
        .query(async ({ input }) => {
            const { slug, cursor, limit } = input

            const cursorCondition = cursor
                ? or(
                    gt(categories.updatedAt, cursor.updatedAt),
                    and(
                        eq(categories.updatedAt, cursor.updatedAt),
                        gt(categories.id, cursor.id)
                    )
                )
                : undefined;

            const categoriesData = await db
                .select({
                    id: categories.id,
                    name: categories.name,
                    slug: categories.slug,
                    stats: categories.slug,
                    featured: categories.featured,
                    thumbnailId: categories.thumbnailId,
                    parentId: categories.parentId,
                    description: categories.description,
                    updatedAt: categories.updatedAt,
                    thumbnailFilename: media.filename,
                    productCount: sql<number>`(
                            SELECT COUNT(*)
                            FROM products
                            WHERE category_id=${categories.id}
                        )`.as('product_count'),
                })
                .from(categories)
                .leftJoin(media, eq(media.id, categories.thumbnailId))
                .where(and(
                    eq(categories.tenantSlug, slug),
                    isNull(categories.parentId),
                    cursorCondition
                ))
                .orderBy(categories.updatedAt, categories.id)
                .limit(limit + 1)

            const hasNextPage = categoriesData.length > limit;
            const actualCategories = hasNextPage ? categoriesData.slice(0, limit) : categoriesData;

            const categoryIds = actualCategories.map(c => c.id)

            const subcategoriesData = categoryIds.length > 0
                ? await db
                    .select({
                        id: categories.id,
                        name: categories.name,
                        slug: categories.slug,
                        stats: categories.slug,
                        featured: categories.featured,
                        thumbnailId: categories.thumbnailId,
                        parentId: categories.parentId,
                        description: categories.description,
                        updatedAt: categories.updatedAt,
                        thumbnailFilename: media.filename,
                        productCount: sql<number>`(
                                SELECT COUNT(*)
                                FROM products
                                WHERE category_id=${categories.id}
                            )`.as('product_count'),
                    })
                    .from(categories)
                    .leftJoin(media, eq(media.id, categories.thumbnailId))
                    .where(
                        and(
                            eq(categories.tenantSlug, slug),
                            inArray(categories.parentId, categoryIds)
                        )
                    )
                    .orderBy(categories.name)
                : [];

            const subcategoriesByParent = subcategoriesData.reduce((acc, subcat) => {
                if (!acc[subcat.parentId!]) {
                    acc[subcat.parentId!] = [];
                }
                acc[subcat.parentId!].push(subcat);
                return acc;
            }, {} as Record<string, typeof subcategoriesData>);

            const transformedData = actualCategories.map((category) => ({
                ...category,
                thumbnail: category.thumbnailFilename ? {
                    filename: category.thumbnailFilename,
                    url: constructMediaURL(category.thumbnailFilename)
                } : null,
                subcategories: (subcategoriesByParent[category.id] || []).map((subcat) => ({
                    ...subcat,
                    thumbnail: subcat.thumbnailFilename ? {
                        filename: subcat.thumbnailFilename,
                        url: constructMediaURL(subcat.thumbnailFilename)
                    } : null,
                })),
            }))

            const nextCursor = hasNextPage && actualCategories.length > 0
                ? {
                    id: actualCategories[actualCategories.length - 1].id,
                    updatedAt: actualCategories[actualCategories.length - 1].updatedAt
                }
                : null;

            return {
                data: transformedData,
                hasNextPage,
                nextCursor,
                totalDocs: actualCategories.length,
            }
        })
})