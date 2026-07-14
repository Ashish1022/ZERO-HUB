import { isSuperAdmin } from "@/lib/access";
import { CollectionConfig } from "payload";

export const Reviews: CollectionConfig = {
    slug: "reviews",
    admin: {
        useAsTitle: "name",
        group: "Customers",
    },
    access: {
        read: () => true,
        create: () => true,
        delete: ({ req }) => isSuperAdmin(req.user),
        update: ({ req }) => isSuperAdmin(req.user),
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
        {
            name: "rating",
            type: "number",
            required: true,
            min: 1,
            max: 5
        },
        {
            name: "title",
            type: "text",
            required: true,
        },
        {
            name: "description",
            type: "text",
            required: true,
        },
        {
            name: "email",
            type: "text",
        },
        {
            name: "product",
            type: "relationship",
            relationTo: "products",
            required: true,
            hasMany: false
        },
    ],
    timestamps: true
}