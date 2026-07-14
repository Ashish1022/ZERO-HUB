import { redis } from "@/lib/redis";

// Cache management helper functions
export const invalidateProductsCache = async (tenantSlug: string): Promise<void> => {
    try {
        const pattern = `products:${tenantSlug}:*`;
        const keys = await redis.keys(pattern);

        if (keys.length > 0) {
            await redis.del(...keys);
            console.log(`Invalidated ${keys.length} product cache entries for: ${tenantSlug}`);
        }
    } catch (error) {
        console.error('Failed to invalidate products cache:', error);
    }
};

// More targeted cache invalidation for specific categories
export const invalidateProductsCacheByCategory = async (tenantSlug: string, categorySlug: string): Promise<void> => {
    try {
        const pattern = `products:${tenantSlug}:*:*:*:*:*${categorySlug}*`;
        const keys = await redis.keys(pattern);

        if (keys.length > 0) {
            await redis.del(...keys);
            console.log(`Invalidated ${keys.length} product cache entries for category: ${categorySlug}`);
        }
    } catch (error) {
        console.error('Failed to invalidate products cache by category:', error);
    }
};

// Invalidate when product prices change
export const invalidateProductsCacheByPrice = async (tenantSlug: string): Promise<void> => {
    try {
        // Invalidate all caches with price filters
        const patterns = [
            `products:${tenantSlug}:*:*:*:*:*`, // All products caches
        ];

        for (const pattern of patterns) {
            const keys = await redis.keys(pattern);
            if (keys.length > 0) {
                await redis.del(...keys);
                console.log(`Invalidated ${keys.length} product cache entries with price filters`);
            }
        }
    } catch (error) {
        console.error('Failed to invalidate products cache by price:', error);
    }
};

// Clear specific product from all caches (when product is updated)
export const invalidateProductInAllCaches = async (tenantSlug: string, productId: string): Promise<void> => {
    try {
        // This is more complex - you might want to store product->cache mapping
        // For now, invalidate all product caches for the tenant
        await invalidateProductsCache(tenantSlug);

        console.log(`Invalidated all product caches due to product update: ${productId}`);
    } catch (error) {
        console.error('Failed to invalidate product caches:', error);
    }
};