import type { TemplateManifest } from '../contract'

export const novaTemplateManifest: TemplateManifest = {
  slug: 'nova',
  name: 'Nova',
  description:
    'A high-contrast dark storefront with electric cyan accents, tabular pricing and an angular product grid. Built for electronics, gadgets and anything that should feel engineered.',
  version: '1.0.0',
  category: 'electronics',
  tags: ['dark', 'neon', 'high-contrast', 'technical', 'angular'],
  author: 'ZERO | HUB Team',
  thumbnail: '/templates/2.png',
  screenshots: ['/templates/2.png', '/templates/4.png', '/templates/6.jpg'],
  pricing: {
    model: 'paid',
    amount: 149900,
    currency: 'INR',
    compareAtAmount: 249900,
  },
  features: [
    'True dark UI with an OLED-friendly near-black base',
    'Angular product grid with tabular pricing',
    'Animated hero with scanline and grid motifs',
    'Shared cart and checkout, themed dark',
    'Responsive across all breakpoints',
    'Respects prefers-reduced-motion',
  ],
  status: 'published',
  releasedAt: '2026-07-15',
  changelog: [{ version: '1.0.0', date: '2026-07-15', notes: 'Initial release.' }],
}
