'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { blogPosts } from '@/data/blogPosts'
import { useScrollReveal, useScrollRevealGroup } from '@/components/animations/useScrollReveal'
import { useNewsletterSubscribe } from '@/components/hooks/useNewsletterSubscribe'

const ALL = 'All Posts'

const categoryIcons: { [key: string]: React.ReactNode } = {
  [ALL]:                <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  'Digital Marketing':  <path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6" />,
  'SEO':                <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></>,
  'Web Development':    <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />,
  'Graphic Design':     <path d="M6 3h12l4 6-10 12L2 9l4-6zM2 9h20M12 21 8 9l4-6 4 6-4 12z" />,
  'AI Automation':      <><circle cx="12" cy="12" r="1" /><path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0" /><path d="M12 2v4m0 8v4M2 12h4m8 0h4" /></>,
  'Online Reputation Management': <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></>,
}

const categoryColors: { [key: string]: string } = {
  'Digital Marketing': '#e63946',
  'SEO':               '#3b82f6',
  'Web Development':   '#8b5cf6',
  'Graphic Design':    '#f59e0b',
  'AI Automation':     '#14a89b',
  'Online Reputation Management': '#16a34a',
}

/*
 * Filters and sidebar counts are derived from the posts themselves.
 * These were previously two hardcoded lists that had drifted badly: the sidebar
 * advertised 94 posts across 7 categories when 6 posts existed across 5, and
 * five of the seven filters matched no post at all and returned an empty grid.
 */
const usedCategories = Array.from(new Set(blogPosts.map(p => p.category))).sort()

const pills = [ALL, ...usedCategories].map(label => ({
  label,
  icon: categoryIcons[label] ?? <circle cx="12" cy="12" r="9" />,
}))

const categories = usedCategories.map(name => ({
  name,
  count: String(blogPosts.filter(p => p.category === name).length).padStart(2, '0'),
  color: categoryColors[name] ?? '#e63946',
}))

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
}

/** Sidebar signup. The previous markup used a decorative `<span>` in place of a
 *  submit button and had no handler, so the field did nothing at all. */
function SidebarNewsletter() {
  const { email, setEmail, state, error, subscribe } = useNewsletterSubscribe('blog-sidebar')

  if (state === 'done') {
    return (
      <p className="text-[13px] font-bold text-white" role="status">
        You&apos;re subscribed. Watch your inbox.
      </p>
    )
  }

  return (
    <form className="relative" onSubmit={subscribe} noValidate>
      <label htmlFor="sidebar-email" className="sr-only">Email address</label>
      <input
        id="sidebar-email"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full rounded-full bg-white pl-5 pr-14 py-3 text-[13px] outline-none"
        style={{ color: '#271717' }}
      />
      <button
        type="submit"
        aria-label="Subscribe"
        disabled={state === 'sending'}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-opacity disabled:opacity-60"
        style={{ background: '#e63946' }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff">
          <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
        </svg>
      </button>
      {state === 'error' && (
        <p className="mt-2 text-[12px]" style={{ color: '#ffb3b8' }} role="alert">{error}</p>
      )}
    </form>
  )
}

function ReadMore() {
  return (
    <span className="inline-flex items-center gap-2 text-[12px] font-bold" style={{ color: '#e63946' }}>
      Read More
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14m-7-7 7 7-7 7" />
      </svg>
    </span>
  )
}

export function BlogClient() {
  const [active, setActive] = useState(ALL)
  const [query, setQuery] = useState('')

  const [featured, ...rest] = blogPosts

  /*
   * The featured card is only shown in the unfiltered view. Previously it
   * rendered unconditionally while being excluded from the filtered list, so
   * selecting its category showed the featured post above an empty grid.
   */
  const isFiltering = active !== ALL || query.trim() !== ''

  const visible = useMemo(() => {
    let list = isFiltering ? blogPosts : rest
    if (active !== ALL) list = list.filter(p => p.category === active)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q))
    }
    return list
  }, [active, query, rest, isFiltering])

  const featuredRef = useScrollReveal<HTMLAnchorElement>()
  const gridRef = useScrollRevealGroup<HTMLDivElement>({ stagger: 0.08 })

  return (
    <section id="posts" className="px-5 md:px-8 pb-16" style={{ background: '#fff8f7' }}>
      <div className="max-w-[1280px] mx-auto">

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {pills.map(p => {
            const on = p.label === active
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => setActive(p.label)}
                className="flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-bold transition-colors"
                style={on ? { background: '#e63946', color: '#fff' } : { background: '#fff', color: '#5b403f', border: '1px solid #f0dedd' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {p.icon}
                </svg>
                {p.label}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Main column */}
          <div className="lg:col-span-8">
            {/* Featured — unfiltered view only */}
            {!isFiltering && (
            <Link
              ref={featuredRef}
              href={`/blog/${featured.slug}`}
              className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl overflow-hidden mb-8 transition-transform hover:-translate-y-1"
              style={{ boxShadow: '0 20px 60px -25px rgba(0,0,0,0.12)' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featured.coverImage} alt={featured.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              <div className="p-7">
                <span className="block text-[11px] font-bold uppercase tracking-[0.08em] mb-3" style={{ color: '#e63946' }}>
                  {featured.category}
                </span>
                <h2 className="font-display font-extrabold text-[20px] mb-3" style={{ lineHeight: '1.3', letterSpacing: '-0.02em', color: '#0d0d0d' }}>
                  {featured.title}
                </h2>
                <p className="text-[13px] mb-6" style={{ lineHeight: '1.6', color: '#5b403f' }}>{featured.excerpt}</p>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: '#0a1b3d' }}>A</span>
                    <span>
                      <span className="block text-[12px] font-bold" style={{ color: '#0d0d0d' }}>{featured.author}</span>
                      <span className="block text-[11px]" style={{ color: '#8f6f6e' }}>{fmtDate(featured.date)}</span>
                    </span>
                  </span>
                  <ReadMore />
                </div>
              </div>
            </Link>
            )}

            {/* Post grid */}
            {visible.length === 0 ? (
              <div
                className="bg-white rounded-2xl p-10 text-center"
                style={{ boxShadow: '0 20px 60px -25px rgba(0,0,0,0.12)' }}
              >
                <p className="font-display font-bold text-[17px] mb-2" style={{ color: '#0d0d0d' }}>
                  No posts found
                </p>
                <p className="text-[13px] mb-5" style={{ color: '#5b403f' }}>
                  Nothing matches that filter yet. Try another category or clear your search.
                </p>
                <button
                  type="button"
                  onClick={() => { setActive(ALL); setQuery('') }}
                  className="inline-flex items-center gap-2 rounded-full text-white text-[12px] font-bold px-6 py-2.5"
                  style={{ background: '#e63946' }}
                >
                  Show all posts
                </button>
              </div>
            ) : (
            <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map(p => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="bg-white rounded-2xl overflow-hidden flex flex-col transition-transform hover:-translate-y-1"
                  style={{ boxShadow: '0 20px 60px -25px rgba(0,0,0,0.12)' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.coverImage} alt={p.title} loading="lazy" decoding="async" className="w-full h-[150px] object-cover" />
                  <div className="p-5 flex flex-col flex-1">
                    <span className="block text-[10.5px] font-bold uppercase tracking-[0.08em] mb-2" style={{ color: '#e63946' }}>
                      {p.category}
                    </span>
                    <h3 className="font-display font-extrabold text-[15px] mb-2" style={{ lineHeight: '1.35', color: '#0d0d0d' }}>
                      {p.title}
                    </h3>
                    <p className="text-[12.5px] mb-5" style={{ lineHeight: '1.6', color: '#5b403f' }}>{p.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <span className="text-[11px]" style={{ color: '#8f6f6e' }}>{fmtDate(p.date)}</span>
                      <ReadMore />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 20px 60px -25px rgba(0,0,0,0.12)' }}>
              <h3 className="font-display font-extrabold text-[16px] mb-4" style={{ color: '#0d0d0d' }}>Search Blog</h3>
              <div className="flex gap-2">
                <label htmlFor="blog-search" className="sr-only">Search articles</label>
                <input
                  id="blog-search"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="flex-1 rounded-xl px-4 py-3 text-[13px] outline-none"
                  style={{ border: '1px solid #f0dedd', background: '#fffdfc', color: '#271717' }}
                />
                <span className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#e63946' }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Popular posts */}
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 20px 60px -25px rgba(0,0,0,0.12)' }}>
              <h3 className="font-display font-extrabold text-[16px] mb-5" style={{ color: '#0d0d0d' }}>Popular Posts</h3>
              <ul className="space-y-4">
                {blogPosts.slice(0, 5).map((p, i) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="flex items-start gap-3 group">
                      <span className="relative shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.coverImage} alt="" loading="lazy" decoding="async" className="w-14 h-14 rounded-lg object-cover" />
                        <span
                          className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ background: '#e63946' }}
                        >
                          {i + 1}
                        </span>
                      </span>
                      <span>
                        <span className="block text-[12.5px] font-bold mb-1 group-hover:text-[#e63946] transition-colors" style={{ lineHeight: '1.35', color: '#0d0d0d' }}>
                          {p.title}
                        </span>
                        <span className="block text-[11px]" style={{ color: '#8f6f6e' }}>{fmtDate(p.date)}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 20px 60px -25px rgba(0,0,0,0.12)' }}>
              <h3 className="font-display font-extrabold text-[16px] mb-5" style={{ color: '#0d0d0d' }}>Categories</h3>
              <ul className="space-y-1">
                {categories.map(c => (
                  <li key={c.name}>
                    <button
                      type="button"
                      onClick={() => { setActive(c.name); setQuery('') }}
                      className="w-full flex items-center justify-between rounded-lg px-2 py-1.5 -mx-2 transition-colors hover:bg-[#fdeeed] text-left"
                      style={active === c.name ? { background: '#fdeeed' } : undefined}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: c.color }} />
                        <span
                          className="text-[13px]"
                          style={{ color: active === c.name ? '#b7102a' : '#271717', fontWeight: active === c.name ? 700 : 400 }}
                        >
                          {c.name}
                        </span>
                      </span>
                      <span className="text-[12px]" style={{ color: '#8f6f6e' }}>({c.count})</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter card */}
            <div className="rounded-2xl p-6" style={{ background: '#0a1b3d' }}>
              <span className="w-11 h-11 rounded-xl mb-4 flex items-center justify-center" style={{ background: '#e63946' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                  <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
                </svg>
              </span>
              <h3 className="font-display font-extrabold text-[17px] text-white mb-2" style={{ lineHeight: '1.3' }}>
                Stay Updated With Our Latest Insights
              </h3>
              <p className="text-[12.5px] mb-5" style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.7)' }}>
                Subscribe to our newsletter and get the latest tips and strategies directly in your inbox.
              </p>
              <SidebarNewsletter />
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
