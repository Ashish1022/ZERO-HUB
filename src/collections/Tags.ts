import { isSuperAdmin } from '@/lib/access'
import { Tenant } from '@/payload-types'
import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
    slug: 'tags',
    admin: {
        useAsTitle: 'name',
        group: "Store",
        description: 'Manage product tags and categories',
    },
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
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            maxLength: 50,
            index: true,
            admin: {
                description: 'Display name for the tag'
            },
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            index: true,
            admin: {
                description: "URL-friendly version of the tag name"
            },
            hooks: {
                beforeValidate: [
                    ({ value, data }) => {
                        if (!value && data?.name) {
                            return data.name
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, '-')
                                .replace(/^-+|-+$/g, '')
                        }
                        return value
                    }
                ]
            }
        },
        {
            name: 'description',
            type: 'textarea',
            maxLength: 200,
            admin: {
                description: "Brief description of what this tag represents"
            }
        },
        {
            name: 'type',
            type: 'select',
            options: [
                { label: 'General', value: 'general' },
                { label: 'Feature', value: 'feature' },
                { label: 'Collection', value: 'collection' },
                { label: 'Season', value: 'season' },
                { label: 'Style', value: 'style' },
                { label: 'Material', value: 'material' },
                { label: 'Color', value: 'color' },
                { label: 'Size', value: 'size' },
                { label: 'Brand', value: 'brand' },
                { label: 'Occasion', value: 'occasion' }
            ],
            defaultValue: 'general',
            required: true,
            admin: {
                description: "Category this tag belongs to",
                position: 'sidebar'
            }
        },
        {
            name: 'featured',
            type: 'checkbox',
            defaultValue: false,
            admin: {
                description: "Show this tag in featured filters",
                position: 'sidebar'
            }
        },
        {
            name: 'status',
            type: 'select',
            options: [
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' }
            ],
            defaultValue: 'active',
            required: true,
            index: true,
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: "productCount",
            type: "number",
            virtual: true,
            admin: {
                readOnly: true,
                description: "Number of products using this tag"
            },
            access: {
                read: () => true,
                update: () => false
            },
            hooks: {
                afterRead: [
                    async ({ data, req }) => {
                        if (!data?.id) return 0

                        try {
                            const productCount = await req.payload.find({
                                collection: "products",
                                where: {
                                    tags: { in: [data.id] },
                                },
                                limit: 0
                            })

                            return productCount.totalDocs
                        } catch {
                            return 0
                        }
                    }
                ]
            }
        },
        {
            name: 'seo',
            type: 'group',
            admin: {
                description: 'Search engine optimization settings'
            },
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    maxLength: 60,
                    admin: {
                        description: "SEO title for tag page"
                    }
                },
                {
                    name: 'description',
                    type: 'textarea',
                    maxLength: 160,
                    admin: {
                        description: "Meta description for tag page"
                    }
                }
            ]
        },
    ],
}
