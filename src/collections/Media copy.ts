import { isSuperAdmin } from '@/lib/access';
import { Tenant } from '@/payload-types';
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  defaultPopulate: {
    filename: true,
    url: true
  },
  access: {
    create: ({ req }) => {
      if (isSuperAdmin(req.user)) return true;

      if (req.user) {
        const tenant = req.user?.tenants?.[0]?.tenant as Tenant;
        return Boolean(tenant?.subscription?.subscriptionDetailsSubmitted);
      }

      return false;
    },
    read: () => true,
    delete: () => true,
  },
  admin: {
    description: "Upload and manage media files. Supported formats: images, videos, documents.",
    useAsTitle: 'filename',
    group: "Media",
    hidden: ({ user }) => !isSuperAdmin(user)
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      defaultValue:'Image',
      maxLength: 200,
      admin: {
        hidden: true,
      },
    },
  ],
  upload: true,
}
