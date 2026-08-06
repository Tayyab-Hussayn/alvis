export interface Service {
  slug: string
  title: string
  shortDesc: string
  category: 'development' | 'marketing' | 'design' | 'it'
  longDescription: string
  deliverables: string[]
}

export const services: Service[] = [
  {
    slug: 'seo',
    title: 'SEO',
    shortDesc: 'Rank higher on Google and drive qualified organic traffic that converts into customers',
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
    shortDesc: 'Build engaged communities, create viral content, and convert followers into loyal customers',
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
    title: 'Online Reputation Management',
    shortDesc: 'Manage reviews, build trust, and protect your brand reputation across all platforms',
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
    shortDesc: 'Strategic campaigns combining paid ads, email, and analytics for measurable ROI',
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
    shortDesc: 'Fast, responsive websites and landing pages built to convert visitors into customers',
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
    shortDesc: 'Native iOS and Android apps that users love, optimized for engagement and growth',
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
    shortDesc: 'Intelligent chatbots and automation that handle customer service 24/7 at scale',
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
    shortDesc: 'Stunning visual content from logos to social graphics that leave lasting impressions',
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
    shortDesc: 'Professional videos and animations that captivate, engage, and drive results',
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
