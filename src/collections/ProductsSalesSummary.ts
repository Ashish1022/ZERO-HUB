import { isSuperAdmin } from "@/lib/access";
import { CollectionConfig } from "payload";

export const ProductsSalesSummary: CollectionConfig = {
    slug: 'products-sales-summary',
    admin: {
        useAsTitle: "productName",
        hidden: ({ user }) => !isSuperAdmin(user)
    },
    fields: [
        {
            name: 'productName',
            type: "text",
            required: true,
        },
        {
            name: 'month',
            type: 'text',
            required: true
        },
        {
            name: 'year',
            type: 'text',
            required: true
        },
        {
            name: 'totalOrders',
            type: 'number',
            required: true,
        },
        {
            name: 'costPrice',
            type: 'number',
            defaultValue: 60
        },
        {
            name: 'grossSales',
            type: 'number',
            required: true,
        },
        {
            name: 'netSales',
            type: 'number',
            required: true,
        },
        {
            name: 'totalItemsSold',
            type: 'number',
            required: true,
        },
    ]
}