export interface Service {
  slug: string
  title: string
  icon: string
  shortDesc: string
  category: 'development' | 'marketing' | 'design' | 'it'
  longDescription: string
  deliverables: string[]
}

export const services: Service[] = [
  {
    slug: 'web-design-development',
    title: 'Web Design & Development',
    icon: 'Monitor',
    shortDesc: 'Pixel-perfect websites that convert.',
    category: 'development',
    longDescription:
      'We build websites that look world-class and perform like precision instruments. From brand-new launches to full rebuilds — every project is mobile-first, fast, and built to convert.',
    deliverables: [
      'Custom UI design',
      'Responsive development (Next.js / React)',
      'Performance optimization',
      'CMS integration',
      'Quality assurance & testing',
      'Post-launch support',
    ],
  },
  {
    slug: 'seo',
    title: 'Search Engine Optimization',
    icon: 'TrendingUp',
    shortDesc: 'Rank higher. Attract qualified traffic.',
    category: 'marketing',
    longDescription:
      "We don't do SEO the old way. Technical audits, content strategy, link building, and on-page optimization that compounds over time — building traffic that you own.",
    deliverables: [
      'Technical SEO audit',
      'Keyword research & mapping',
      'On-page optimization',
      'Content strategy',
      'Backlink acquisition',
      'Monthly reporting',
    ],
  },
  {
    slug: 'social-media-marketing',
    title: 'Social Media Marketing',
    icon: 'Share2',
    shortDesc: 'Build audience. Drive engagement.',
    category: 'marketing',
    longDescription:
      'Social media done right is not just posting. It\'s building a community, driving engagement, and creating content that converts followers into customers.',
    deliverables: [
      'Platform strategy (Instagram, LinkedIn, Facebook, X)',
      'Content calendar',
      'Creative production',
      'Community management',
      'Analytics & optimization',
    ],
  },
  {
    slug: 'ppc-advertising',
    title: 'Google Ads & PPC',
    icon: 'Target',
    shortDesc: 'Ad spend that actually returns.',
    category: 'marketing',
    longDescription:
      'Every dollar of ad spend is tracked. We build campaigns that hit the right audience, at the right time, with the right message — and we optimize relentlessly.',
    deliverables: [
      'Campaign strategy & setup',
      'Ad copywriting',
      'Audience targeting',
      'Bid management',
      'A/B testing',
      'Weekly performance reports',
    ],
  },
  {
    slug: 'branding',
    title: 'Branding & Visual Identity',
    icon: 'Palette',
    shortDesc: 'A brand that earns instant trust.',
    category: 'design',
    longDescription:
      'Your brand is the first thing people feel before they read a word. We craft identities that are clear, memorable, and built to last — not trend-chasing.',
    deliverables: [
      'Brand strategy',
      'Logo design',
      'Color system & typography',
      'Brand guidelines document',
      'Business stationery',
      'Brand asset library',
    ],
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    icon: 'Layout',
    shortDesc: 'Interfaces people love using.',
    category: 'design',
    longDescription:
      'We design interfaces that people understand instantly and enjoy using. Research-driven, prototype-tested, pixel-perfect.',
    deliverables: [
      'User research & personas',
      'Information architecture',
      'Wireframing',
      'High-fidelity UI design',
      'Interactive prototypes',
      'Design system creation',
    ],
  },
  {
    slug: 'content-marketing',
    title: 'Content Marketing',
    icon: 'FileText',
    shortDesc: 'Content that educates, attracts, converts.',
    category: 'marketing',
    longDescription:
      'Content that educates your audience, ranks on Google, and converts readers into leads. Strategy-led, not volume-led.',
    deliverables: [
      'Content strategy',
      'SEO-driven blog writing',
      'Case study creation',
      'Email newsletter setup',
      'Content calendar management',
      'Performance tracking',
    ],
  },
  {
    slug: 'it-consulting',
    title: 'IT Consulting',
    icon: 'Server',
    shortDesc: 'Technology strategy for business growth.',
    category: 'it',
    longDescription:
      'Technology decisions have long-term consequences. We help you choose the right stack, architecture, and tools — then help you implement them without the usual chaos.',
    deliverables: [
      'Technology assessment',
      'Software architecture planning',
      'Vendor selection',
      'Team structure recommendations',
      'Process automation',
      'Ongoing advisory',
    ],
  },
]
