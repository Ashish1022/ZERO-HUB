import type { TemplateManifest } from '../contract'

export const atelierTemplateManifest: TemplateManifest = {
  slug: 'atelier',
  name: 'Atelier',
  description:
    'A quiet editorial storefront: serif headlines, generous whitespace and a magazine-style product grid. Suited to fashion, homeware and anything sold on craft rather than spec.',
  version: '1.0.0',
  category: 'fashion',
  tags: ['editorial', 'serif', 'minimal', 'whitespace', 'boutique'],
  author: 'ZERO | HUB Team',
  thumbnail: '/templates/3.png',
  screenshots: ['/templates/3.png', '/templates/5.png', '/templates/7.jpg'],
  pricing: {
    model: 'paid',
    amount: 199900,
    currency: 'INR',
  },
  features: [
    'Editorial serif typography, no webfont fetch',
    'Asymmetric magazine-style product grid',
    'Numbered category index',
    'Shared cart and checkout, themed in ink on bone',
    'Responsive across all breakpoints',
    'System serif — no layout shift on font load',
  ],
  status: 'published',
  releasedAt: '2026-07-15',
  changelog: [{ version: '1.0.0', date: '2026-07-15', notes: 'Initial release.' }],
}
