import type { CollectionConfig } from 'payload'

import { isSuperAdmin } from '@/lib/access'

export const TemplatePurchases: CollectionConfig = {
  slug: 'template-purchases',
  admin: {
    useAsTitle: 'razorpayOrderId',
    group: 'Templates',
    defaultColumns: ['razorpayOrderId', 'template', 'status', 'amount', 'createdAt'],
    description: 'Payment records for template purchases. Append-only.',
    hidden: ({ user }) => !isSuperAdmin(user),
  },
  access: {
    read: () => true,
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
  },
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
      defaultValue: 'pending',
      options: [
        { label: 'Pending — order created, awaiting payment', value: 'pending' },
        { label: 'Completed — payment verified', value: 'completed' },
        { label: 'Failed', value: 'failed' },
        { label: 'Refunded', value: 'refunded' },
      ],
    },
    {
      name: 'razorpayOrderId',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description:
          'Razorpay order id. Unique — this is the idempotency key that stops a replayed webhook granting the template twice.',
      },
    },
    {
      name: 'razorpayPaymentId',
      type: 'text',
      index: true,
      admin: { description: 'Set once payment is captured.' },
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
      min: 0,
      admin: { description: 'Amount charged, in paise. Frozen at purchase time.' },
    },
    {
      name: 'currency',
      type: 'text',
      required: true,
      defaultValue: 'INR',
    },
    {
      name: 'versionAtPurchase',
      type: 'text',
      admin: {
        description:
          'Template version the tenant bought. The entitlement upgrades past it; this stays put as the record of what was sold.',
      },
    },
    {
      name: 'purchasedAt',
      type: 'date',
      index: true,
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'failureReason',
      type: 'text',
      admin: { description: 'Populated on failed or refunded rows for support.' },
    },
  ],
  timestamps: true,
}
