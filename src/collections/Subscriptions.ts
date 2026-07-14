import { isSuperAdmin } from "@/lib/access";
import { CollectionConfig } from "payload";

export const Subscriptions: CollectionConfig = {
    slug: "subscriptions",
    access: {
        create: ({ req }) => isSuperAdmin(req.user),
        read: ({ req }) => isSuperAdmin(req.user),
        update: ({ req }) => isSuperAdmin(req.user),
        delete: ({ req }) => isSuperAdmin(req.user),
    },
    admin: {
        group: "Subscriptions",
        useAsTitle: 'razorpaySubscriptionId',
    },
    fields: [
        {
            name: 'tenant',
            type: 'relationship',
            relationTo: 'tenants',
            required: true,
        },
        {
            name: 'plan',
            type: 'relationship',
            relationTo: 'subscription-plans',
            required: true,
        },
        {
            name: 'razorpaySubscriptionId',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'status',
            type: 'select',
            index: true,
            options: [
                { label: 'Created', value: 'created' },
                { label: 'Pending', value: 'pending' },
                { label: 'Authenticated', value: 'authenticated' },
                { label: 'Active', value: 'active' },
                { label: 'Paused', value: 'paused' },
                { label: 'Halted', value: 'halted' },
                { label: 'Cancelled', value: 'cancelled' },
                { label: 'Completed', value: 'completed' },
                { label: 'Expired', value: 'expired' },
            ],
            required: true,
        },
        {
            name: 'startAt',
            type: 'date',
        },
        {
            name: 'endAt',
            type: 'date',
        },
        {
            name: 'currentStart',
            type: 'date',
        },
        {
            name: 'currentEnd',
            type: 'date',
        },
        {
            name: 'chargeAt',
            type: 'date',
        },
        {
            name: 'totalCount',
            type: 'number',
        },
        {
            name: 'paidCount',
            type: 'number',
            defaultValue: 0,
        },
        {
            name: 'remainingCount',
            type: 'number',
        },
    ]
}