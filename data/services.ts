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
    slug: 'seo',
    title: 'SEO',
    icon: 'TrendingUp',
    shortDesc: 'Ranking aur visibility behtar karna',
    category: 'marketing',
    longDescription:
      'We optimize your website to rank higher on Google and drive qualified organic traffic. Technical SEO, keyword research, content strategy, and link building — everything you need to own your search results.',
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
    shortDesc: 'Content, posting, paid ads',
    category: 'marketing',
    longDescription:
      'We build your social media presence from the ground up. Content creation, posting strategy, paid ad management, and community engagement — turning followers into customers.',
    deliverables: [
      'Platform strategy (Instagram, LinkedIn, Facebook)',
      'Content calendar & creation',
      'Paid social ad campaigns',
      'Community management',
      'Performance analytics',
      'Monthly strategy reports',
    ],
  },
  {
    slug: 'orm',
    title: 'ORM',
    icon: 'Shield',
    shortDesc: 'Online reputation aur reviews manage karna',
    category: 'marketing',
    longDescription:
      'We manage your online reputation across Google, Yelp, and industry-specific review sites. Monitor reviews, respond to customers, and build a strong positive presence online.',
    deliverables: [
      'Review monitoring & alerts',
      'Response management',
      'Reputation strategy',
      'Review generation campaigns',
      'Crisis management',
      'Monthly reputation reports',
    ],
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    icon: 'Target',
    shortDesc: 'Google Ads, email marketing, analytics',
    category: 'marketing',
    longDescription:
      'Full-funnel digital marketing including Google Ads, email campaigns, and detailed analytics. We track everything, optimize relentlessly, and deliver measurable ROI.',
    deliverables: [
      'Google Ads campaign management',
      'Email marketing setup & campaigns',
      'Conversion tracking & analytics',
      'A/B testing & optimization',
      'Audience targeting & segmentation',
      'Weekly performance reports',
    ],
  },
  {
    slug: 'web-development',
    title: 'Web Development',
    icon: 'Monitor',
    shortDesc: 'Websites aur landing pages banana',
    category: 'development',
    longDescription:
      'We build fast, secure, conversion-focused websites and landing pages. Responsive design, modern tech stack, and performance optimization included.',
    deliverables: [
      'Custom website development',
      'Landing page design & build',
      'Responsive mobile optimization',
      'E-commerce integration',
      'CMS setup (WordPress, Webflow)',
      'Post-launch support & maintenance',
    ],
  },
  {
    slug: 'app-development',
    title: 'App Development',
    icon: 'Smartphone',
    shortDesc: 'Android/iOS apps',
    category: 'development',
    longDescription:
      'We develop native and cross-platform mobile apps for iOS and Android. User-centric design, robust functionality, and app store optimization included.',
    deliverables: [
      'iOS app development',
      'Android app development',
      'Cross-platform solutions (React Native)',
      'UI/UX design',
      'App store optimization',
      'Ongoing support & updates',
    ],
  },
  {
    slug: 'ai-automation',
    title: 'AI Automation',
    icon: 'Zap',
    shortDesc: 'Chatbots aur business automation',
    category: 'development',
    longDescription:
      'We automate your business processes with AI-powered chatbots, customer service bots, and workflow automation. Save time, improve customer experience, and scale without hiring.',
    deliverables: [
      'AI chatbot development',
      'Customer service automation',
      'Workflow automation setup',
      'Integration with existing tools',
      'Training & documentation',
      'Ongoing optimization',
    ],
  },
  {
    slug: 'graphic-design',
    title: 'Graphic Design',
    icon: 'Palette',
    shortDesc: 'Professional design for all your needs',
    category: 'design',
    longDescription:
      'From logos to social media graphics to marketing materials — we create stunning, on-brand visual content that stands out and converts.',
    deliverables: [
      'Logo & brand identity design',
      'Social media graphics',
      'Marketing materials & collateral',
      'Infographics & data visualization',
      'Packaging design',
      'Brand guidelines documentation',
    ],
  },
  {
    slug: 'video-production',
    title: 'Video Editing & Animation',
    icon: 'Video',
    shortDesc: 'Professional video production',
    category: 'design',
    longDescription:
      'We produce, edit, and animate professional videos for marketing, social media, and training. From concept to final delivery, we handle it all.',
    deliverables: [
      'Video editing & post-production',
      'Motion graphics & animation',
      'Promotional video creation',
      'Social media video optimization',
      'Subtitle & captions',
      'Sound design & music integration',
    ],
  },
]
