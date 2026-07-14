import { CollectionConfig } from "payload";

import { isSuperAdmin } from "@/lib/access";
import { Tenant } from "@/payload-types";

export const Products: CollectionConfig = {
    slug: "products",
    access: {
        create: ({ req }) => {
            if (isSuperAdmin(req.user)) return true

            const tenant = req.user?.tenants?.[0]?.tenant as Tenant
            if (!tenant) return false

            const hasSubscriptionDetails = Boolean(tenant?.subscription?.subscriptionDetailsSubmitted)
            const hasBankDetails = Boolean(tenant?.bankDetails?.bankDetailsSubmitted)
            const isTrialActive = Boolean(tenant?.subscription?.isTrialActive)

            return hasSubscriptionDetails || isTrialActive || hasBankDetails
        }
    },
    indexes: [
        {
            fields: ['tenantSlug', 'slug'],
            unique: true
        },
        {
            fields: ['tenantSlug', 'name'],
        }
    ],
    admin: {
        useAsTitle: 'name',
        group: "Store",
        description: "You must verify your account before creating products.",
    },
    fields: [
        {
            name: "tenantSlug",
            type: "text",
            required: true,
            index: true,
            admin: {
                hidden: true
            },
            hooks: {
                beforeValidate: [
                    ({ value, req }) => {
                        if (!value) {
                            const tenant = req.user?.tenants?.[0]?.tenant as Tenant;
                            return tenant?.slug || '';
                        }
                        return value;
                    }
                ]
            }
        },
        {
            name: "name",
            type: "text",
            index: true,
            required: true,
            maxLength: 100,
            admin: {
                description: "Product name (max 100 characters)"
            }

        },
        {
            name: "slug",
            type: "text",
            required: true,
            unique: true,
            index: true,
            admin: {
                description: "URL-friendly version of the product name. e.g. [your_site]/zerohub.site/products/[slug]",
            },
            access: {
                create: () => true,
                update: ({ req }) => isSuperAdmin(req.user)
            },
            hooks: {
                beforeValidate: [
                    ({ value, data }) => {
                        if (!value && data?.name) {
                            return data.name
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, '-')
                                .replace(/^-+|-+$/g, '');
                        }
                        return value;
                    }
                ]
            }
        },
        {
            name: "description",
            type: "text",
            required: true,
            admin: {
                description: "Detailed product description"
            }
        },
        {
            name: "shortDescription",
            type: "textarea",
            maxLength: 200,
            admin: {
                description: "Brief description for product listings"
            }
        },
        {
            name: "pricing",
            type: "group",
            admin: {
                description: "Product pricing information"
            },
            fields: [
                {
                    name: "price",
                    type: "number",
                    required: true,
                    min: 0,
                    admin: {
                        step: 0.01,
                        description: "Regular price in your store currency"
                    }
                },
                {
                    name: "compareAtPrice",
                    type: "number",
                    required: true,
                    min: 0,
                    admin: {
                        step: 0.01,
                        description: "Discount price (for showing discounts)"
                    }
                },
                {
                    name: "costPrice",
                    type: "number",
                    required: true,
                    min: 0,
                    admin: {
                        step: 0.01,
                        description: "Your cost (for profit calculations)"
                    }
                },
                {
                    name: "taxable",
                    type: "checkbox",
                    defaultValue: true,
                    admin: {
                        description: "Whether this product is subject to taxes"
                    }
                }
            ]
        },
        {
            name: "inventory",
            type: "group",
            fields: [
                {
                    name: "trackQuantity",
                    type: "checkbox",
                    defaultValue: true,
                    admin: {
                        description: "Track inventory levels for this product"
                    }
                },
                {
                    name: "quantity",
                    type: "number",
                    defaultValue: 0,
                    min: 0,
                    admin: {
                        condition: (data) => data?.inventory?.trackQuantity,
                        description: "Current stock quantity"
                    }
                },
                {
                    name: "lowStockThreshold",
                    type: "number",
                    defaultValue: 5,
                    min: 0,
                    admin: {
                        condition: (data) => data?.inventory?.trackQuantity,
                        description: "Alert when stock reaches this level"
                    }
                },
                {
                    name: "allowBackorders",
                    type: "checkbox",
                    defaultValue: false,
                    admin: {
                        description: "Allow purchases when out of stock"
                    }
                }
            ]
        },
        {
            name: "category",
            index: true,
            type: "relationship",
            relationTo: "categories",
            hasMany: false,
            maxDepth: 1,
            required: true,
            admin: {
                description: "Primary product category"
            }
        },
        {
            name: "tags",
            type: "relationship",
            relationTo: "tags",
            hasMany: true,
            index: true,
            admin: {
                description: "Tags for filtering and search"
            }
        },
        {
            name: "images",
            type: "array",
            required: true,
            minRows: 1,
            maxRows: 10,
            admin: {
                description: "Product images (1-10 images required)"
            },
            fields: [
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true
                },
                {
                    name: "isPrimary",
                    type: "checkbox",
                    defaultValue: false,
                    admin: {
                        description: "Use as main product image"
                    }
                }
            ]
        },
        {
            name: "specifications",
            type: "array",
            admin: {
                description: "Product specifications and features"
            },
            fields: [
                {
                    name: "name",
                    type: "text",
                    required: true
                },
                {
                    name: "value",
                    type: "text",
                    required: true
                }
            ]
        },
        {
            name: "variants",
            type: "array",
            admin: {
                description: "Product variations (size, color, etc.)"
            },
            fields: [
                {
                    name: "name",
                    type: "text",
                    required: true,
                    admin: {
                        description: "Variant name (e.g., 'Size', 'Color')"
                    }
                },
                {
                    name: "options",
                    type: "array",
                    required: true,
                    fields: [
                        {
                            name: "label",
                            type: "text",
                            required: true
                        },
                        {
                            name: "priceAdjustment",
                            type: "number",
                            defaultValue: 0,
                            admin: {
                                step: 0.01,
                                description: "Price adjustment for this option"
                            }
                        }
                    ]
                }
            ]
        },
        {
            name: "seo",
            type: "group",
            fields: [
                {
                    name: "title",
                    type: "text",
                    maxLength: 60,
                    admin: {
                        description: "SEO title (recommended: 50-60 characters)"
                    }
                },
                {
                    name: "description",
                    type: "textarea",
                    maxLength: 160,
                    admin: {
                        description: "Meta description (recommended: 150-160 characters)"
                    }
                },
                {
                    name: "keywords",
                    type: "text",
                    admin: {
                        description: "Comma-separated keywords"
                    }
                }
            ]
        },
        {
            name: "featured",
            index: true,
            type: "checkbox",
            defaultValue: false,
            admin: {
                description: "Feature this product on homepage"
            }
        },
        {
            name: "badge",
            type: "select",
            options: [
                { label: "None", value: "" },
                { label: "New", value: "new" },
                { label: "Sale", value: "sale" },
                { label: "Best Seller", value: "bestseller" },
                { label: "Limited Edition", value: "limited" }
            ],
            admin: {
                description: "Display badge on product"
            }
        },
        {
            name: "content",
            type: "richText",
            admin: {
                condition: (data) => data?.productType === "digital",
                description: "Product documentation, guides, and bonus materials"
            }
        },
        {
            name: "shipping",
            type: "group",
            fields: [
                {
                    name: "weight",
                    type: "number",
                    min: 0,
                    admin: {
                        step: 0.01,
                        description: "Weight in kg"
                    }
                },
                {
                    name: "dimensions",
                    type: "group",
                    fields: [
                        {
                            name: "length",
                            type: "number",
                            min: 0,
                            admin: { step: 0.01 }
                        },
                        {
                            name: "width",
                            type: "number",
                            min: 0,
                            admin: { step: 0.01 }
                        },
                        {
                            name: "height",
                            type: "number",
                            min: 0,
                            admin: { step: 0.01 }
                        }
                    ]
                },
                {
                    name: "requiresShipping",
                    type: "checkbox",
                    defaultValue: true
                },
                {
                    name: "freeShipping",
                    type: "checkbox",
                    defaultValue: false,
                    admin: {
                        description: "Offer free shipping for this product"
                    }
                },
                {
                    name: "shippingCost",
                    type: "number",
                    min: 0,
                    admin: {
                        step: 0.01,
                        condition: (data) => data?.shipping?.requiresShipping && !data?.shipping?.freeShipping,
                        description: "Shipping cost for this product (leave empty to use store default)"
                    }
                },
            ]
        },
        {
            name: "refundPolicy",
            type: "select",
            options: [
                { label: "30 Days", value: "30-day" },
                { label: "14 Days", value: "14-day" },
                { label: "7 Days", value: "7-day" },
                { label: "3 Days", value: "3-day" },
                { label: "1 Day", value: "1-day" },
                { label: "No Refunds", value: "no-refunds" }
            ],
            defaultValue: "30-day",
            required: true,
            admin: {
                description: "Product return/refund policy"
            }
        },
        {
            name: "status",
            type: "select",
            options: [
                { label: "Active", value: "active" },
                { label: "Draft", value: "draft" },
                { label: "Archived", value: "archived" }
            ],
            defaultValue: "draft",
            required: true,
            index: true,
            admin: {
                description: "Product publication status"
            }
        },
    ]
}