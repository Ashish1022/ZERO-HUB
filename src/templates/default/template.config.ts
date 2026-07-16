import type { TemplateManifest } from '../contract'

export const defaultTemplateManifest: TemplateManifest = {
  slug: 'default',
  name: 'Aurora',
  description:
    'A warm, editorial storefront with a full-bleed hero, featured collections, and a product grid that stays fast on long catalogs. A dependable starting point for any store.',
  version: '1.0.0',
  category: 'general',
  tags: ['storefront', 'editorial', 'warm', 'responsive'],
  author: 'ZERO | HUB Team',
  thumbnail: '/templates/1.png',
  screenshots: ['/templates/1.png', '/templates/2.png', '/templates/3.png'],
  pricing: {
    model: 'free',
    amount: 0,
    currency: 'INR',
  },
  features: [
    'Responsive across all breakpoints',
    'Featured collections on the homepage',
    'Product filtering and search',
    'Cart, wishlist and checkout',
    'Customer reviews and ratings',
    'SEO-friendly server rendering',
  ],
  status: 'published',
  isDefault: true,
  releasedAt: '2026-01-15',
  changelog: [{ version: '1.0.0', date: '2026-01-15', notes: 'Initial release.' }],
}
