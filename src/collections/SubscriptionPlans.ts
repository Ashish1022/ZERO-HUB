import { isSuperAdmin } from "@/lib/access";
import { CollectionConfig } from "payload";

export const SubscriptionPlans: CollectionConfig = {
    slug: "subscription-plans",
    admin: {
        useAsTitle: 'name',
        group: "Subscriptions",
        hidden: ({ user }) => !isSuperAdmin(user)
    },
    access: {
        create: ({ req }) => isSuperAdmin(req.user),
        read: ({ req }) => isSuperAdmin(req.user),
        update: ({ req }) => isSuperAdmin(req.user),
        delete: ({ req }) => isSuperAdmin(req.user),
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'description',
            type: 'textarea',
        },
        {
            name: 'amount',
            type: 'number',
            required: true,
            admin: {
                description: 'Amount in paise (₹100 = 10000 paise)',
            },
        },
        {
            name: 'currency',
            type: 'text',
            defaultValue: 'INR',
        },
        {
            name: 'period',
            type: 'select',
            options: [
                { label: 'Monthly', value: 'monthly' },
                { label: 'Yearly', value: 'yearly' },
            ],
            required: true,
        },
        {
            name: 'interval',
            type: 'number',
            defaultValue: 1,
        },
        {
            name: 'razorpayPlanId',
            type: 'text',
            unique: true,
        },
        {
            name: 'features',
            type: 'array',
            fields: [
                {
                    name: 'feature',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'isActive',
            type: 'checkbox',
            defaultValue: true,
        },
        {
            name: "popular",
            type: "checkbox",
            defaultValue: false
        }
    ],
};
