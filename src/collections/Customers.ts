import { CollectionConfig } from "payload";
import { isSuperAdmin } from "@/lib/access";

export const Customers: CollectionConfig = {
    slug: "customers",
    admin: {
        useAsTitle: "firstname",
        group: "Customers",
    },
    access: {
        read: () => true,
        create: ({ req }) => isSuperAdmin(req.user),
        delete: ({ req }) => isSuperAdmin(req.user),
        update: ({ req }) => isSuperAdmin(req.user),
    },
    fields: [
        {
            name: "firstname",
            type: "text",
            required: true,
        },
        {
            name: "lastname",
            type: "text",
            required: true,
        },
        {
            name: "email",
            type: "text",
            required: true,
        },
        {
            name: "newsLetter",
            type: 'checkbox',
            defaultValue: false
        },
        {
            name: "shippingAddress",
            label: "Shipping Information",
            type: "group",
            fields: [
                {
                    name: 'street',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'apartment',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'city',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'postalCode',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'state',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'country',
                    type: 'text',
                    required: true,
                },
            ]
        },
        {
            name: "deliveryOption",
            type: "text",
        },
        {
            name: "specialInstructions",
            type: "text",
        },
    ]
}