import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface CartItem {
    productId: string;
    quantity: number;
}

interface TenantCart {
    items: CartItem[];
}

interface CartState {
    tenantCarts: Record<string, TenantCart>;
    addProduct: (tenantSlug: string, productId: string, quantity?: number) => void;
    removeProduct: (tenantSlug: string, productId: string) => void;
    updateQuantity: (tenantSlug: string, productId: string, quantity: number) => void;
    incrementQuantity: (tenantSlug: string, productId: string) => void;
    decrementQuantity: (tenantSlug: string, productId: string) => void;
    clearCart: (tenantSlug: string) => void;
    clearAllCarts: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            tenantCarts: {},

            addProduct: (tenantSlug, productId, quantity = 1) =>
                set((state) => {
                    const currentCart = state.tenantCarts[tenantSlug] || { items: [] };
                    const existingItemIndex = currentCart.items.findIndex(
                        item => item.productId === productId
                    );

                    let updatedItems;
                    if (existingItemIndex >= 0) {
                        updatedItems = currentCart.items.map((item, index) =>
                            index === existingItemIndex
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        );
                    } else {
                        updatedItems = [...currentCart.items, { productId, quantity }];
                    }

                    return {
                        tenantCarts: {
                            ...state.tenantCarts,
                            [tenantSlug]: {
                                items: updatedItems
                            }
                        }
                    };
                }),

            removeProduct: (tenantSlug, productId) =>
                set((state) => ({
                    tenantCarts: {
                        ...state.tenantCarts,
                        [tenantSlug]: {
                            items: state.tenantCarts[tenantSlug]?.items.filter(
                                item => item.productId !== productId
                            ) || []
                        }
                    }
                })),

            updateQuantity: (tenantSlug, productId, quantity) =>
                set((state) => {
                    const currentCart = state.tenantCarts[tenantSlug] || { items: [] };

                    if (quantity <= 0) {
                        return {
                            tenantCarts: {
                                ...state.tenantCarts,
                                [tenantSlug]: {
                                    items: currentCart.items.filter(
                                        item => item.productId !== productId
                                    )
                                }
                            }
                        };
                    }

                    const updatedItems = currentCart.items.map(item =>
                        item.productId === productId
                            ? { ...item, quantity }
                            : item
                    );

                    return {
                        tenantCarts: {
                            ...state.tenantCarts,
                            [tenantSlug]: {
                                items: updatedItems
                            }
                        }
                    };
                }),

            incrementQuantity: (tenantSlug, productId) =>
                set((state) => {
                    const currentCart = state.tenantCarts[tenantSlug] || { items: [] };
                    const existingItem = currentCart.items.find(
                        item => item.productId === productId
                    );

                    if (!existingItem) {
                        return {
                            tenantCarts: {
                                ...state.tenantCarts,
                                [tenantSlug]: {
                                    items: [...currentCart.items, { productId, quantity: 1 }]
                                }
                            }
                        };
                    }

                    const updatedItems = currentCart.items.map(item =>
                        item.productId === productId
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );

                    return {
                        tenantCarts: {
                            ...state.tenantCarts,
                            [tenantSlug]: {
                                items: updatedItems
                            }
                        }
                    };
                }),

            decrementQuantity: (tenantSlug, productId) =>
                set((state) => {
                    const currentCart = state.tenantCarts[tenantSlug] || { items: [] };
                    const existingItem = currentCart.items.find(
                        item => item.productId === productId
                    );

                    if (!existingItem || existingItem.quantity <= 1) {
                        return {
                            tenantCarts: {
                                ...state.tenantCarts,
                                [tenantSlug]: {
                                    items: currentCart.items.filter(
                                        item => item.productId !== productId
                                    )
                                }
                            }
                        };
                    }

                    const updatedItems = currentCart.items.map(item =>
                        item.productId === productId
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    );

                    return {
                        tenantCarts: {
                            ...state.tenantCarts,
                            [tenantSlug]: {
                                items: updatedItems
                            }
                        }
                    };
                }),

            clearCart: (tenantSlug) =>
                set((state) => ({
                    tenantCarts: {
                        ...state.tenantCarts,
                        [tenantSlug]: {
                            items: []
                        }
                    }
                })),

            clearAllCarts: () =>
                set({
                    tenantCarts: {},
                }),
        }),
        {
            name: "zerohub-cart",
            storage: createJSONStorage(() => localStorage)
        }
    )
);