import type { CollectionConfig } from 'payload'

import { isSuperAdmin } from '@/lib/access'

export const TenantTemplates: CollectionConfig = {
  slug: 'tenant-templates',
  admin: {
    useAsTitle: 'id',
    group: 'Templates',
    defaultColumns: ['template', 'status', 'source', 'installedVersion', 'activatedAt'],
    description: 'Which templates each tenant owns, and which one is live.',
    hidden: ({ user }) => !isSuperAdmin(user),
  },
  access: {
    read: () => true,
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  indexes: [
    { fields: ['tenant', 'template'], unique: true },
    { fields: ['tenant', 'status'] },
  ],
  fields: [
    {
      name: 'template',
      type: 'relationship',
      relationTo: 'templates',
      required: true,
      index: true,
      hasMany: false,
    },
    {
      name: 'status',
      type: 'select',
      index: true,
      required: true,
      defaultValue: 'inactive',
      options: [
        { label: 'Active — currently rendering the storefront', value: 'active' },
        { label: 'Inactive — owned, not live', value: 'inactive' },
        { label: 'Revoked — refunded or withdrawn', value: 'revoked' },
      ],
      admin: {
        description:
          'Revoked rows are kept rather than deleted so that history and re-purchase both stay intact.',
      },
    },
    {
      name: 'source',
      type: 'select',
      required: true,
      defaultValue: 'free',
      options: [
        { label: 'Free — claimed at no cost', value: 'free' },
        { label: 'Purchase — paid for', value: 'purchase' },
        { label: 'Grant — issued by an admin', value: 'grant' },
        { label: 'Trial — time-limited', value: 'trial' },
      ],
      admin: { description: 'How this entitlement was acquired.' },
    },
    {
      name: 'purchase',
      type: 'relationship',
      relationTo: 'template-purchases',
      hasMany: false,
      admin: {
        description: 'The payment behind this entitlement. Empty for free and granted templates.',
      },
    },
    {
      name: 'installedVersion',
      type: 'text',
      admin: {
        description:
          'Version this tenant is pinned to. Lags the catalog version when an update is available.',
      },
    },
    {
      name: 'activatedAt',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'deactivatedAt',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'expiresAt',
      type: 'date',
      index: true,
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        description: 'For trial entitlements. Empty means perpetual.',
      },
    },
    {
      name: 'settings',
      type: 'json',
      admin: {
        description:
          'Per-tenant template customisation (colours, fonts, section order). Schema is owned by the template, so this stays untyped here.',
      },
    },
  ],
  timestamps: true,
}
