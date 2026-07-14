import { useCallback } from "react";
import { useCartStore } from "./use-cart-store";
import { useShallow } from 'zustand/react/shallow';

export const useCart = (tenantSlug: string) => {
    const removeProduct = useCartStore((state) => state.removeProduct);
    const addProduct = useCartStore((state) => state.addProduct);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const incrementQuantity = useCartStore((state) => state.incrementQuantity);
    const decrementQuantity = useCartStore((state) => state.decrementQuantity);
    const clearAllCarts = useCartStore((state) => state.clearAllCarts);
    const clearCart = useCartStore((state) => state.clearCart);

    const cartItems = useCartStore(useShallow((state) =>
        state.tenantCarts[tenantSlug]?.items || []
    ));

    const isProductInCart = useCallback((productId: string) => {
        return cartItems.some(item => item.productId === productId);
    }, [cartItems]);

    const getProductQuantity = useCallback((productId: string) => {
        const item = cartItems.find(item => item.productId === productId);
        return item?.quantity || 0;
    }, [cartItems]);

    const clearTenantCart = useCallback(() => {
        clearCart(tenantSlug);
    }, [tenantSlug, clearCart]);

    const handleAddProduct = useCallback((productId: string, quantity = 1) => {
        addProduct(tenantSlug, productId, quantity);
    }, [addProduct, tenantSlug]);

    const handleRemoveProduct = useCallback((productId: string) => {
        removeProduct(tenantSlug, productId);
    }, [removeProduct, tenantSlug]);

    const handleUpdateQuantity = useCallback((productId: string, quantity: number) => {
        updateQuantity(tenantSlug, productId, quantity);
    }, [updateQuantity, tenantSlug]);

    const handleIncrementQuantity = useCallback((productId: string) => {
        incrementQuantity(tenantSlug, productId);
    }, [incrementQuantity, tenantSlug]);

    const handleDecrementQuantity = useCallback((productId: string) => {
        decrementQuantity(tenantSlug, productId);
    }, [decrementQuantity, tenantSlug]);

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const uniqueItems = cartItems.length;

    return {
        cartItems,

        addProductToCart: handleAddProduct,
        removeProductFromCart: handleRemoveProduct,
        updateQuantity: handleUpdateQuantity,
        incrementQuantity: handleIncrementQuantity,
        decrementQuantity: handleDecrementQuantity,

        clearCart: clearTenantCart,
        clearAllCarts,

        isProductInCart,
        getProductQuantity,

        totalItems,
        uniqueItems,
    };
};