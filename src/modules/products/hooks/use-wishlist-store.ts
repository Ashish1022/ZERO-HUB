import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface WishlistItem {
    productIds: string[];
}

interface WishlistState {
    tenantWishlists: Record<string, WishlistItem>;
    addProduct: (tenantSlug: string, productId: string) => void;
    removeProduct: (tenantSlug: string, productId: string) => void;
    clearWishlist: (tenantSlug: string) => void;
    clearAllWishlists: () => void;
}


export const useWishlistStore = create<WishlistState>()(
    persist(
        (set) => ({
            tenantWishlists: {},
            addProduct: (tenantSlug, productId) =>
                set((state => ({
                    tenantWishlists: {
                        ...state.tenantWishlists,
                        [tenantSlug]: {
                            productIds: [
                                ...(state.tenantWishlists[tenantSlug]?.productIds || []),
                                productId,
                            ]
                        }
                    }
                }))),
            removeProduct: (tenantSlug, productId) =>
                set((state => ({
                    tenantWishlists: {
                        ...state.tenantWishlists,
                        [tenantSlug]: {
                            productIds: state.tenantWishlists[tenantSlug]?.productIds.filter(
                                (id) => id !== productId
                            ) || [],
                        }
                    }
                }))),
            clearWishlist: (tenantSlug) =>
                set((state => ({
                    tenantWishlists: {
                        ...state.tenantWishlists,
                        [tenantSlug]: {
                            productIds: []
                        }
                    }
                }))),
            clearAllWishlists: () =>
                set({
                    tenantWishlists: {},
                }),
        }),
        {
            name: "zerohub-wishlist",
            storage: createJSONStorage(() => localStorage)
        }
    )
)