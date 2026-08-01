'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { blogPosts } from '@/data/blogPosts'

const pills = [
  { label: 'All Posts',   icon: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></> },
  { label: 'Marketing',   icon: <path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6" /> },
  { label: 'SEO',         icon: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></> },
  { label: 'Web Dev',     icon: <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" /> },
  { label: 'Branding',    icon: <path d="M6 3h12l4 6-10 12L2 9l4-6zM2 9h20M12 21 8 9l4-6 4 6-4 12z" /> },
  { label: 'IT',          icon: <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></> },
]

const categories = [
  { name: 'Digital Marketing', count: '24', color: '#e63946' },
  { name: 'SEO',               count: '18', color: '#3b82f6' },
  { name: 'Social Media',      count: '16', color: '#8b5cf6' },
  { name: 'PPC Advertising',   count: '12', color: '#f59e0b' },
  { name: 'E-commerce',        count: '10', color: '#14a89b' },
  { name: 'Branding',          count: '08', color: '#e63946' },
  { name: 'Analytics',         count: '06', color: '#16a34a' },
]

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
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
  const [active, setActive] = useState('All Posts')
  const [query, setQuery] = useState('')

  const [featured, ...rest] = blogPosts

  const visible = useMemo(() => {
    let list = rest
    if (active !== 'All Posts') list = list.filter(p => p.category === active)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q))
    }
    return list
  }, [active, query, rest])

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
            {/* Featured */}
            <Link
              href={`/blog/${featured.slug}`}
              className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl overflow-hidden mb-8 transition-transform hover:-translate-y-1"
              style={{ boxShadow: '0 20px 60px -25px rgba(0,0,0,0.12)' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featured.coverImage} alt={featured.title} className="w-full h-full object-cover" />
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

            {/* Post grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map(p => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="bg-white rounded-2xl overflow-hidden flex flex-col transition-transform hover:-translate-y-1"
                  style={{ boxShadow: '0 20px 60px -25px rgba(0,0,0,0.12)' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.coverImage} alt={p.title} className="w-full h-[150px] object-cover" />
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

            {visible.length === 0 && (
              <p className="text-center py-16 text-[14px]" style={{ color: '#8f6f6e' }}>No posts match that search.</p>
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
                        <img src={p.coverImage} alt="" className="w-14 h-14 rounded-lg object-cover" />
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
              <ul className="space-y-3">
                {categories.map(c => (
                  <li key={c.name} className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                      <span className="text-[13px]" style={{ color: '#271717' }}>{c.name}</span>
                    </span>
                    <span className="text-[12px]" style={{ color: '#8f6f6e' }}>({c.count})</span>
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
              <div className="relative">
                <label htmlFor="sidebar-email" className="sr-only">Email address</label>
                <input
                  id="sidebar-email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-full bg-white pl-5 pr-14 py-3 text-[13px] outline-none"
                  style={{ color: '#271717' }}
                />
                <span className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#e63946' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff">
                    <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
                  </svg>
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
