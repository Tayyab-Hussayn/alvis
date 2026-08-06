import type { MetadataRoute } from 'next'
import { caseStudies } from '@/data/caseStudies'
import { blogPosts }   from '@/data/blogPosts'
import { siteUrl, absoluteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl,                        lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: absoluteUrl('/services'),       lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/about'),          lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/case-studies'),   lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: absoluteUrl('/blog'),           lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: absoluteUrl('/contact'),        lastModified: now, changeFrequency: 'yearly',  priority: 0.7 },
    { url: absoluteUrl('/privacy'),        lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: absoluteUrl('/terms'),          lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((s) => ({
    url:             absoluteUrl(`/case-studies/${s.slug}`),
    lastModified:    now,
    changeFrequency: 'monthly',
    priority:        0.7,
  }))

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url:             absoluteUrl(`/blog/${p.slug}`),
    lastModified:    new Date(p.date),
    changeFrequency: 'monthly',
    priority:        0.6,
  }))

  return [...staticPages, ...caseStudyPages, ...blogPages]
}
