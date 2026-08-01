export interface CaseStudyResult {
  metric: string
  value: string
}

export interface CaseStudy {
  slug: string
  title: string
  client: string
  category: string
  tags: string[]
  coverImage: string
  summary: string
  results: CaseStudyResult[]
  challenge: string
  solution: string
  outcome: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'novabridge-digital-transformation',
    title: 'Digital Transformation for a B2B Consulting Firm',
    client: 'NovaBridge Consulting',
    category: 'Web Development + SEO',
    tags: ['Web Design', 'SEO', 'CRO'],
    coverImage: '/images/case-studies/ecommerce.png',
    summary: 'Rebuilt a dated corporate site into a high-converting lead engine, paired with technical SEO that pushed 40+ keywords to page one.',
    results: [
      { metric: 'Organic Traffic', value: '+218%' },
      { metric: 'Lead Form Submissions', value: '+94%' },
      { metric: 'Page Load Time', value: '1.2s' },
    ],
    challenge: 'NovaBridge had a five-year-old website that loaded slowly, ranked poorly, and converted almost no visitors into inquiries. Their brand positioning was unclear and the visual identity felt dated.',
    solution: 'We redesigned the site from scratch on Next.js, implemented a content-led SEO strategy targeting long-tail keywords in their niche, and built a streamlined contact flow with clear service CTAs.',
    outcome: 'Within four months, organic traffic more than tripled. The new site converts at 4.2% versus the previous 0.8%. NovaBridge now consistently appears on the first page for their primary service terms.',
  },
  {
    slug: 'stacklane-saas-growth',
    title: 'Paid Acquisition Scale for an Early-Stage SaaS',
    client: 'Stacklane',
    category: 'PPC + Analytics',
    tags: ['Google Ads', 'PPC', 'Analytics'],
    coverImage: '/images/case-studies/social-media.png',
    summary: 'Restructured a bleeding Google Ads account and built a performance dashboard that gave the growth team full visibility into spend efficiency.',
    results: [
      { metric: 'ROAS', value: '6.1x' },
      { metric: 'Cost Per Acquisition', value: '-40%' },
      { metric: 'Monthly Trial Signups', value: '+130%' },
    ],
    challenge: "Stacklane's paid budget was being absorbed by broad-match keywords with poor intent. The team had no clear attribution model and could not tell which campaigns drove actual trial signups.",
    solution: 'We audited every campaign, cut 60% of wasteful spend, restructured into tight ad groups with exact-match intent, and implemented a full Google Analytics 4 + conversion tracking setup.',
    outcome: 'CAC fell 40% in the first 30 days. Monthly trial signups more than doubled without increasing budget. The team now has a live dashboard tracking every dollar of ad spend to revenue.',
  },
  {
    slug: 'lumient-brand-identity',
    title: 'Brand Identity System for a Creative Studio',
    client: 'Lumient Studio',
    category: 'Branding + Design',
    tags: ['Branding', 'Visual Identity', 'UI Design'],
    coverImage: '/images/case-studies/seo.png',
    summary: 'Created a complete visual identity — logo, type system, color palette, and brand guidelines — that positioned Lumient as a premium creative agency.',
    results: [
      { metric: 'Pitch Win Rate', value: '+55%' },
      { metric: 'Average Project Value', value: '+30%' },
      { metric: 'Brand Recall Score', value: '9.1/10' },
    ],
    challenge: 'Lumient was doing excellent work but looked like a freelancer operation. Their visual identity was inconsistent across touchpoints, which cost them credibility with larger clients.',
    solution: 'We developed a refined brand strategy, then built a full identity system: wordmark, icon, three-color palette, type hierarchy, photography style, and a 40-page brand guidelines document.',
    outcome: "Lumient's pitch win rate increased significantly after rolling out the new identity. They secured two enterprise clients within six weeks of launch — both citing brand credibility as a factor.",
  },
  {
    slug: 'fervent-retail-seo',
    title: 'E-commerce SEO for a Multi-Location Retailer',
    client: 'Fervent Retail Group',
    category: 'SEO + Content',
    tags: ['SEO', 'Content Marketing', 'E-commerce'],
    coverImage: '/images/case-studies/ecommerce.png',
    summary: 'Executed a 12-month technical SEO and content strategy that moved Fervent from page 4 to position 1–3 for their highest-revenue product categories.',
    results: [
      { metric: 'Keyword Rankings (Top 3)', value: '+82 terms' },
      { metric: 'Organic Revenue', value: '+175%' },
      { metric: 'Domain Authority', value: '38 → 54' },
    ],
    challenge: 'Fervent ranked on page 4 or below for nearly every product category. Their blog was inactive, their site had significant crawl errors, and competitor domains were outpacing them.',
    solution: 'We ran a full technical audit, resolved 200+ crawl issues, restructured the site architecture, and executed a content calendar that produced 48 SEO-optimized articles over 12 months.',
    outcome: 'Organic revenue grew 175% year over year. Fervent now dominates the first page for their core product categories, and their content drives backlinks from industry publications.',
  },
  {
    slug: 'meridian-ui-redesign',
    title: 'Product UI Redesign for a Fintech Platform',
    client: 'Meridian Finance',
    category: 'UI/UX Design',
    tags: ['UI Design', 'UX Research', 'Figma'],
    coverImage: '/images/case-studies/social-media.png',
    summary: 'Redesigned a complex financial dashboard into a clean, intuitive interface that reduced user drop-off by 60% and improved daily active usage.',
    results: [
      { metric: 'User Drop-off', value: '-60%' },
      { metric: 'Task Completion Rate', value: '+43%' },
      { metric: 'NPS Score', value: '31 → 67' },
    ],
    challenge: 'Meridian\'s platform had a 68% drop-off on the onboarding flow. The dashboard was dense, confusing, and mobile-unusable. Customer support tickets were dominated by UI confusion.',
    solution: 'We ran 12 user interviews, built a journey map, then redesigned the onboarding, dashboard, and reporting views in Figma. Delivered a full design system with component library.',
    outcome: 'Post-launch NPS doubled. The product team reports that support tickets related to UI confusion dropped 70%. Daily active users grew 35% in the three months following the release.',
  },
  {
    slug: 'apex-social-media',
    title: 'Social Media Growth Strategy for a B2C Brand',
    client: 'Apex Fitness',
    category: 'Social Media Marketing',
    tags: ['Social Media', 'Content', 'Instagram'],
    coverImage: '/images/case-studies/seo.png',
    summary: 'Built a content strategy and posting system from scratch that grew Apex\'s Instagram from 2K to 28K followers in 8 months and drove measurable revenue.',
    results: [
      { metric: 'Instagram Followers', value: '2K → 28K' },
      { metric: 'Social Revenue Attribution', value: '+$120K' },
      { metric: 'Engagement Rate', value: '4.8%' },
    ],
    challenge: "Apex had no consistent social presence. Their posts were sporadic, unbranded, and drove zero measurable sales. They had tried running their own content in-house with no traction.",
    solution: 'We built a 3-pillar content strategy (education, transformation stories, product), created a monthly content calendar, shot and edited 16 posts per month, and managed community engagement daily.',
    outcome: "Apex's Instagram grew 14x in eight months. Social media now accounts for 22% of their monthly e-commerce revenue. Their email list grew by 4,200 subscribers from social CTAs alone.",
  },
  {
    slug: 'qalam-ai-newsletter-automation',
    title: 'AI Newsletter Automation for a SaaS Media Brand',
    client: 'Qalam Media',
    category: 'AI Automation',
    tags: ['AI Automation', 'n8n', 'OpenAI'],
    coverImage: '/images/case-studies/ecommerce.png',
    summary: 'Built a fully autonomous newsletter pipeline using n8n and GPT-4 that researches, writes, and sends weekly content — saving 20+ hours per week.',
    results: [
      { metric: 'Hours Saved Per Week', value: '20+' },
      { metric: 'Open Rate', value: '41%' },
      { metric: 'Subscriber Growth', value: '+340%' },
    ],
    challenge: 'Qalam was manually sourcing, writing, and scheduling newsletter content every week. The process took 20+ hours, required a dedicated editor, and was impossible to scale without hiring.',
    solution: 'We built an n8n workflow that scrapes curated RSS feeds, runs them through a custom GPT-4 prompt chain to generate original editorial content, formats it in HTML, and sends via Mailchimp — all automatically.',
    outcome: 'The pipeline now runs fully autonomously every week. Qalam scaled from one newsletter to three verticals without adding headcount. Open rates held at 41% — above industry average — because content quality actually improved.',
  },
  {
    slug: 'techspirex-web-platform',
    title: 'Full-Stack Web Platform for a Tech Services Company',
    client: 'TechSpirex',
    category: 'Web Development',
    tags: ['Next.js', 'TypeScript', 'Full Stack'],
    coverImage: '/images/case-studies/social-media.png',
    summary: 'Built a complete web platform from scratch — marketing site, client portal, and service delivery dashboard — that replaced a legacy WordPress setup.',
    results: [
      { metric: 'Page Load Speed', value: '0.8s' },
      { metric: 'Lead Conversion', value: '+72%' },
      { metric: 'Portal Adoption', value: '94%' },
    ],
    challenge: "TechSpirex's five-year-old WordPress site was slow, hard to update, and lacked the client portal functionality their operations required. They were managing client communications via email threads.",
    solution: 'We built a Next.js App Router site with a custom client portal, service request system, and internal dashboard — all backed by a PostgreSQL database and secured with role-based authentication.',
    outcome: 'Load times dropped from 4.2s to 0.8s. The client portal has a 94% adoption rate with clients preferring it over email. Lead conversion improved 72% after the new marketing site launched.',
  },
  {
    slug: 'leadsgen-outreach-system',
    title: 'AI-Powered Lead Generation System for a B2B Agency',
    client: 'LeadsGen Co.',
    category: 'Lead Generation',
    tags: ['Lead Generation', 'AI Integration', 'Outreach'],
    coverImage: '/images/case-studies/seo.png',
    summary: 'Built an end-to-end AI outreach system that identifies prospects, personalizes cold emails using GPT-4, and books discovery calls automatically.',
    results: [
      { metric: 'Cold Email Reply Rate', value: '11.4%' },
      { metric: 'Discovery Calls Booked', value: '+230%' },
      { metric: 'Cost Per Meeting', value: '-65%' },
    ],
    challenge: 'LeadsGen was manually researching prospects and writing personalized outreach — a process that produced 8–10 meetings per month at high cost. They needed to scale without scaling their SDR team.',
    solution: 'We built an n8n pipeline that pulls prospect data from Apollo.io, enriches each contact with company context via GPT-4, generates a personalized first-line email, and triggers send via Instantly.ai.',
    outcome: 'Reply rates hit 11.4% versus the industry average of 2–3%. Booked meetings tripled in 60 days. The cost per discovery call dropped 65% because the pipeline runs without manual SDR involvement.',
  },
]
