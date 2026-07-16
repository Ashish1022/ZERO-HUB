import type { CollectionConfig, NumberFieldSingleValidation } from 'payload'

import { isSuperAdmin } from '@/lib/access'
import { MANIFESTS_BY_SLUG } from '@/templates/registry/manifest'

const validateCompareAtAmount: NumberFieldSingleValidation = (value, options) => {
  if (value == null) return true
  if (!Number.isInteger(value)) return 'Compare-at must be an integer number of paise'

  const amount = (options?.siblingData as { amount?: number } | undefined)?.amount
  if (typeof amount === 'number' && value <= amount) {
    return 'Compare-at price must be greater than the actual price to display a discount'
  }
  return true
}

export const Templates: CollectionConfig = {
  slug: 'templates',
  admin: {
    useAsTitle: 'name',
    group: 'Templates',
    defaultColumns: ['name', 'slug', 'status', 'version', 'pricing.model'],
    description: 'Storefront templates available in the marketplace.',
  },
  access: {
    read: () => true,
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Identity. Must match a slug registered in src/templates/registry.',
      },
      access: {
        read: () => true,
        update: () => false,
      },
      validate: (value?: string | null) => {
        if (!value) return 'Slug is required'
        if (!/^[a-z0-9-]+$/.test(value)) {
          return 'Slug can only contain lowercase letters, numbers, and hyphens'
        }
        if (!MANIFESTS_BY_SLUG.has(value)) {
          return `No template "${value}" is registered in code. Add its manifest and loader to src/templates/registry, then run \`pnpm templates:sync\`.`
        }
        return true
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'Display name shown in the marketplace.' },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'version',
      type: 'text',
      required: true,
      defaultValue: '1.0.0',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Semver, synced from the code manifest. Drives update prompts.',
      },
    },
    {
      name: 'status',
      type: 'select',
      index: true,
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft — hidden from marketplace', value: 'draft' },
        { label: 'Published — listed and purchasable', value: 'published' },
        { label: 'Deprecated — hidden, existing installs keep working', value: 'deprecated' },
      ],
      admin: {
        position: 'sidebar',
        description:
          'Deprecating hides a template from the marketplace but never evicts tenants already running it.',
      },
    },
    {
      name: 'category',
      type: 'select',
      index: true,
      required: true,
      defaultValue: 'general',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Fashion', value: 'fashion' },
        { label: 'Electronics', value: 'electronics' },
        { label: 'Grocery', value: 'grocery' },
        { label: 'Furniture', value: 'furniture' },
        { label: 'Beauty', value: 'beauty' },
        { label: 'Digital', value: 'digital' },
        { label: 'Minimal', value: 'minimal' },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      admin: { description: 'Free-form keywords for marketplace search.' },
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      defaultValue: 'ZERO | HUB Team',
    },
    {
      name: 'thumbnail',
      type: 'text',
      required: true,
      admin: { description: 'Grid preview image. Path under /public or a CDN URL.' },
    },
    {
      name: 'screenshots',
      type: 'array',
      admin: { description: 'Gallery shown on the template detail page.' },
      fields: [{ name: 'url', type: 'text', required: true }],
    },
    {
      name: 'features',
      type: 'array',
      fields: [{ name: 'feature', type: 'text', required: true }],
    },
    {
      name: 'pricing',
      type: 'group',
      admin: { description: 'Commerce. Editable here without a deploy.' },
      fields: [
        {
          name: 'model',
          type: 'select',
          index: true,
          required: true,
          defaultValue: 'free',
          options: [
            { label: 'Free', value: 'free' },
            { label: 'Paid — one-time purchase', value: 'paid' },
          ],
        },
        {
          name: 'amount',
          type: 'number',
          required: true,
          defaultValue: 0,
          min: 0,
          admin: {
            description: 'Price in paise (₹499 = 49900). Integer money — never floats.',
          },
          validate: (value?: number | null) => {
            if (value == null) return 'Amount is required'
            if (!Number.isInteger(value)) return 'Amount must be an integer number of paise'
            if (value < 0) return 'Amount cannot be negative'
            return true
          },
        },
        {
          name: 'compareAtAmount',
          type: 'number',
          min: 0,
          admin: {
            description:
              'Struck-through reference price, in paise. Set above amount to show a discount.',
          },
          validate: validateCompareAtAmount,
        },
        {
          name: 'currency',
          type: 'text',
          required: true,
          defaultValue: 'INR',
          admin: { readOnly: true },
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      index: true,
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Pin to the top of the marketplace.',
      },
    },
    {
      name: 'isDefault',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'The fallback template. Synced from code; exactly one row carries it.',
      },
    },
    {
      name: 'releasedAt',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'changelog',
      type: 'array',
      admin: {
        description: 'Version history, synced from the code manifest. Powers update prompts.',
        readOnly: true,
      },
      fields: [
        { name: 'version', type: 'text', required: true },
        { name: 'date', type: 'date', admin: { date: { pickerAppearance: 'dayOnly' } } },
        { name: 'notes', type: 'textarea' },
      ],
    },
    {
      name: 'stats',
      type: 'group',
      admin: {
        description: 'Denormalised counters. Maintained by the template service.',
      },
      access: {
        read: () => true,
        update: () => false,
      },
      fields: [
        {
          name: 'purchaseCount',
          type: 'number',
          defaultValue: 0,
          admin: { readOnly: true, description: 'Completed purchases, all time.' },
        },
        {
          name: 'activeInstalls',
          type: 'number',
          defaultValue: 0,
          admin: { readOnly: true, description: 'Tenants currently rendering this template.' },
        },
        {
          name: 'ratingAverage',
          type: 'number',
          defaultValue: 0,
          admin: { readOnly: true, description: 'Reserved for template reviews.' },
        },
        {
          name: 'ratingCount',
          type: 'number',
          defaultValue: 0,
          admin: { readOnly: true, description: 'Reserved for template reviews.' },
        },
      ],
    },
  ],
  timestamps: true,
}
