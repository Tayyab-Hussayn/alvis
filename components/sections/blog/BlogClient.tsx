'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { cn } from '@/lib/utils'
import { blogPosts } from '@/data/blogPosts'

const categories = ['All', 'SEO', 'Web Dev', 'Marketing', 'Design', 'Branding', 'IT']

function BlogCard({ post }: { post: (typeof blogPosts)[0] }) {
  return (
    <motion.div
      layout
      initial={{ y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full">
        <div className="aspect-video rounded-2xl overflow-hidden relative mb-4 bg-gradient-to-br from-subtle to-border">
          <div className="absolute inset-0 bg-accent-soft/20 group-hover:scale-105 transition-transform duration-500" />
        </div>

        <div className="flex items-center gap-3 mb-3">
          <Badge>{post.category}</Badge>
          <span className="text-label text-text-faint uppercase tracking-widest">{post.readTime}</span>
        </div>

        <h3 className="text-display-md font-display font-semibold text-text mb-2 group-hover:text-accent transition-colors duration-200 line-clamp-2 flex-grow">
          {post.title}
        </h3>

        <p className="text-body-sm text-text-muted line-clamp-2 mb-4">{post.excerpt}</p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border text-body-sm text-text-faint">
          <span>{post.author}</span>
          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </Link>
    </motion.div>
  )
}

export function BlogClient() {
  const [active, setActive] = useState('All')
  const gridRef = useRef<HTMLDivElement>(null)

  const filtered =
    active === 'All'
      ? blogPosts
      : blogPosts.filter((p) => p.category.toLowerCase() === active.toLowerCase())

  const featured  = filtered[0]
  const remaining = filtered.slice(1)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !gridRef.current) return

    const init = async () => {
      const { gsap } = await import('gsap')
      gsap.from(Array.from(gridRef.current!.children), {
        opacity: 0, y: 40, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.1,
      })
    }

    init()
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-10 bg-bg border-b border-border">
        <Container>
          <div className="max-w-3xl mb-10">
            <SectionLabel className="mb-4">The Alvis Blog</SectionLabel>
            <h1 className="text-display-xl font-display font-bold text-text mt-4 mb-6">
              Insights on Marketing,<br />Design &amp; Technology.
            </h1>
            <p className="text-body-lg text-text-muted max-w-xl">
              No fluff. Just practical thinking on what&apos;s working in digital marketing,
              web development, and business growth — written by practitioners.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  'flex-shrink-0 rounded-full px-4 py-2 text-body-sm border transition-all duration-200',
                  active === cat
                    ? 'bg-accent text-white border-accent'
                    : 'bg-subtle text-text-muted border-border hover:border-accent hover:text-accent',
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="bg-bg py-12">
          <Container>
            <AnimatePresence mode="wait">
              <motion.div
                key={featured.slug}
                initial={{ y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <Link href={`/blog/${featured.slug}`} className="group block">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 items-stretch bg-surface border border-border rounded-3xl overflow-hidden hover:border-accent transition-colors duration-300">
                    {/* Image */}
                    <div className="lg:col-span-3 aspect-video lg:aspect-auto relative overflow-hidden bg-gradient-to-br from-subtle to-border min-h-[260px]">
                      <div className="absolute inset-0 bg-accent-soft/20 group-hover:scale-105 transition-transform duration-500" />
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge className="bg-accent text-white">Featured</Badge>
                        <Badge>{featured.category}</Badge>
                      </div>
                      <h2 className="text-display-lg font-display font-bold text-text mb-4 group-hover:text-accent transition-colors duration-200">
                        {featured.title}
                      </h2>
                      <p className="text-body-md text-text-muted line-clamp-3 mb-6">
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-body-sm text-text-faint">
                        <span>{featured.author}</span>
                        <span>
                          {new Date(featured.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · {featured.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
          </Container>
        </section>
      )}

      {/* Blog grid */}
      <section className="bg-bg pb-20">
        <Container>
          {remaining.length > 0 ? (
            <div
              ref={gridRef}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {remaining.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </AnimatePresence>
            </div>
          ) : filtered.length === 1 ? null : (
            <p className="text-body-lg text-text-muted text-center py-16">
              No posts in this category yet.
            </p>
          )}
        </Container>
      </section>
    </>
  )
}
