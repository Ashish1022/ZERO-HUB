import type { CollectionConfig } from 'payload'

import { isSuperAdmin } from '@/lib/access'
import { tenantsArrayField } from '@payloadcms/plugin-multi-tenant/fields'

const defaultTenantArrayField = tenantsArrayField({
  tenantsArrayFieldName: 'tenants',
  tenantsCollectionSlug: 'tenants',
  tenantsArrayTenantFieldName: 'tenant',
  arrayFieldAccess: {
    read: () => true,
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
  },
  tenantFieldAccess: {
    read: () => true,
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
  },
})

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: ({ req }) => isSuperAdmin(req.user),
    read: ({ req }) => {
      if (isSuperAdmin(req.user)) return true
      if (!req.user) return false
      return { id: { equals: req.user.id } }
    },
    update: ({ req }) => {
      if (isSuperAdmin(req.user)) return true
      if (!req.user) return false
      return { id: { equals: req.user.id } }
    },
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  admin: {
    useAsTitle: 'email',
    group: 'Customers',
    hidden: ({ user }) => !isSuperAdmin(user),
  },
  auth: true,
  fields: [
    {
      name: 'username',
      required: true,
      type: 'text',
      unique: true,
      index: true,
    },
    {
      name: 'phone',
      required: true,
      type: 'text',
      unique: true,
      index: true,
    },
    {
      admin: {
        position: 'sidebar',
      },
      name: 'roles',
      type: 'select',
      defaultValue: ['user'],
      hasMany: true,
      options: ['super-admin', 'user'],
      access: {
        // Only super-admins can change roles — prevents users self-promoting.
        create: ({ req }) => isSuperAdmin(req.user),
        update: ({ req }) => isSuperAdmin(req.user),
      },
    },
    {
      ...defaultTenantArrayField,
      admin: {
        ...(defaultTenantArrayField?.admin || {}),
        position: 'sidebar',
      },
    },
  ],
}
