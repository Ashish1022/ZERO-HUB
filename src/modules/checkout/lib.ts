export interface OrderItem {
    category: string;
    product: string;
    quantity: number;
    unitPrice: number;
    discountPerItem?: number;
    grossItemAmount?: number;
}

export interface Order {
    name: string;
    customer: string;
    isPaid: boolean;
    orderItems: OrderItem[];
    orderDate?: Date;
    grossAmount?: number;
    discountAmount?: number;
    taxAmount?: number;
    shippingAmount?: number;
    netAmount?: number;
}

// 1. Calculate grossItemAmount for each order item
export function calculateGrossItemAmount(item: OrderItem): number {
    const { unitPrice, quantity, discountPerItem = 0 } = item;
    return (unitPrice * quantity) - discountPerItem;
}

// 2. Calculate grossAmount (sum of all grossItemAmount)
export function calculateGrossAmount(orderItems: OrderItem[]): number {
    return orderItems.reduce((total, item) => {
        return total + calculateGrossItemAmount(item);
    }, 0);
}

// 3. Calculate tax amount (typically percentage of gross amount)
export function calculateTaxAmount(grossAmount: number, taxRate: number = 0.18): number {
    return grossAmount * taxRate; // 18% GST example
}

// 4. Calculate shipping amount (can be flat rate, weight-based, etc.)
export function calculateShippingAmount(grossAmount: number, shippingRate: number): number {
    // Example: Free shipping above 500, otherwise flat 50
    return grossAmount >= 500 ? 0 : shippingRate;
}

// 5. Calculate net amount (final amount to pay)
export function calculateNetAmount(
    grossAmount: number,
    discountAmount: number = 0,
    taxAmount: number,
    shippingAmount: number
): number {
    return grossAmount - discountAmount + taxAmount + shippingAmount;
}

// Complete order calculation function
export function calculateOrderTotals(
    orderItems: OrderItem[],
    orderLevelDiscount: number = 0,
    taxRate: number = 0.18,
    shippingRate: number
) {
    // Step 1: Calculate each item's gross amount
    const itemsWithGrossAmount = orderItems.map(item => ({
        ...item,
        grossItemAmount: calculateGrossItemAmount(item)
    }));
    // Step 2: Calculate gross amount (sum of all items)
    const grossAmount = calculateGrossAmount(itemsWithGrossAmount);

    // Step 3: Calculate tax amount
    const taxAmount = calculateTaxAmount(grossAmount, taxRate);

    // Step 4: Calculate shipping amount
    const shippingAmount = calculateShippingAmount(grossAmount, shippingRate);

    // Step 5: Calculate net amount
    const netAmount = calculateNetAmount(
        grossAmount,
        orderLevelDiscount,
        taxAmount,
        shippingAmount
    );

    return {
        orderItems: itemsWithGrossAmount,
        grossAmount,
        discountAmount: orderLevelDiscount,
        taxAmount,
        shippingAmount,
        netAmount
    };
}