import type { Metadata } from 'next'
import { BlogHero }         from '@/components/sections/blog/BlogHero'
import { BlogClient }       from '@/components/sections/blog/BlogClient'
import { NewsletterSignup } from '@/components/sections/blog/NewsletterSignup'

export const metadata: Metadata = {
  title: 'Blog | Insights That Inspire Growth — Alvis',
  description:
    'Explore expert tips, strategies and industry insights to grow your business and stay ahead of the competition.',
}

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <BlogClient />
      <NewsletterSignup />
    </>
  )
}
