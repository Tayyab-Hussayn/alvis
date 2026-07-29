import type { MetadataRoute } from 'next'
import { caseStudies } from '@/data/caseStudies'
import { blogPosts }   from '@/data/blogPosts'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://alvis.agency'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                   lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE}/services`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/about`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/case-studies`, lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/blog`,         lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/contact`,      lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.7 },
  ]

  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((s) => ({
    url:             `${BASE}/case-studies/${s.slug}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly',
    priority:        0.7,
  }))

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url:             `${BASE}/blog/${p.slug}`,
    lastModified:    new Date(p.date),
    changeFrequency: 'monthly',
    priority:        0.6,
  }))

  return [...staticPages, ...caseStudyPages, ...blogPages]
}
