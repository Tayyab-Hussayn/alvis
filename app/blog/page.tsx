import type { Metadata } from 'next'
import { BlogClient }       from '@/components/sections/blog/BlogClient'
import { NewsletterSignup } from '@/components/sections/blog/NewsletterSignup'

export const metadata: Metadata = {
  title: 'Blog | Alvis — Marketing, Design & Tech Insights',
  description:
    'Practical insights on digital marketing, web development, and business growth from the Alvis team.',
}

export default function BlogPage() {
  return (
    <>
      <BlogClient />
      <NewsletterSignup />
    </>
  )
}
