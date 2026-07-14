import { useShallow } from "zustand/react/shallow";
import { useWishlistStore } from "./use-wishlist-store"
import { useCallback } from "react";

export const useWishlist = (tenantSlug: string) => {
    const removeProduct = useWishlistStore((state) => state.removeProduct)
    const addProduct = useWishlistStore((state) => state.addProduct)
    const clearAllWishlists = useWishlistStore((state) => state.clearAllWishlists);
    const clearWishlist = useWishlistStore((state) => state.clearWishlist);

    const productIds = useWishlistStore(useShallow((state) => state.tenantWishlists[tenantSlug]?.productIds || []));

    const wishlistItems = useWishlistStore(useShallow((state) => state.tenantWishlists[tenantSlug]?.productIds || []))

    const isProductInWishlist = useCallback((productId: string) => {
        return wishlistItems.some(item => item === productId);
    }, [wishlistItems]);

    const clearTenantWishlist = useCallback(() => {
        clearWishlist(tenantSlug);
    }, [tenantSlug, clearWishlist]);

    const handleAddProduct = useCallback((productId: string) => {
        addProduct(tenantSlug, productId)
    }, [addProduct, tenantSlug])

    const handleRemoveProduct = useCallback((productId: string) => {
        removeProduct(tenantSlug, productId);
    }, [removeProduct, tenantSlug]);

    return {
        wishlistItems,
        productIds,
        addProductToWishlist: handleAddProduct,
        removeProductFromWislist: handleRemoveProduct,
        clearWishlist: clearTenantWishlist,
        clearAllWishlists: clearAllWishlists,
        isProductInWishlist,
    }
}