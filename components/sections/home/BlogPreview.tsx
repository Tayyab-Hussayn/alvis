'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Container } from '@/components/ui/Container'
import { blogPosts } from '@/data/blogPosts'

const recent = blogPosts.slice(0, 3)

export function BlogPreview() {
  return (
    <section className="py-20 md:py-28 lg:py-36 bg-bg">
      <Container>
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <SectionLabel className="mb-4">Insights</SectionLabel>
            <h2 className="text-display-lg font-display font-bold text-text">
              From the Alvis Blog
            </h2>
          </div>
          <Button href="/blog" variant="ghost" withArrow>
            Read All Posts
          </Button>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recent.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group cursor-pointer block"
              >
                {/* Cover image thumbnail visual */}
                <div className="aspect-video rounded-2xl overflow-hidden bg-text mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(37,99,235,0.6)] via-[rgba(37,99,235,0.15)] to-[rgba(29,78,216,0.35)]" />
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:20px_20px] group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
                </div>

                <Badge className="mb-2">{post.category}</Badge>

                <h3 className="text-display-md font-display font-semibold text-text mt-2 group-hover:text-accent transition-colors duration-200 leading-snug">
                  {post.title}
                </h3>

                <p className="text-body-sm text-text-muted mt-2 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-4 text-body-sm text-text-muted font-medium">
                  <span>{post.author}</span>
                  <span>{post.readTime} · {new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
