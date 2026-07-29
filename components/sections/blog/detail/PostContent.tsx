'use client'

import { Linkedin, Twitter, Link2 } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { extractToc, renderMarkdown } from '@/lib/markdown'
import type { BlogPost } from '@/data/blogPosts'

interface Props { post: BlogPost }

export function PostContent({ post }: Props) {
  const toc  = extractToc(post.content)
  const html = renderMarkdown(post.content)

  const copyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <section className="bg-bg py-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main content */}
          <article
            className="lg:col-span-3"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-subtle rounded-2xl p-6 border border-border sticky top-24 space-y-8">
              {/* Author */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-accent-soft flex items-center justify-center flex-shrink-0">
                    <span className="text-body-sm font-bold text-accent">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-body-sm font-semibold font-display text-text">{post.author}</p>
                    <p className="text-label text-text-faint">Alvis Team</p>
                  </div>
                </div>
              </div>

              {/* TOC */}
              {toc.length > 0 && (
                <div>
                  <p className="text-label uppercase tracking-widest text-text-faint mb-3">
                    In This Article
                  </p>
                  <ul className="space-y-2">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="text-body-sm text-text-muted hover:text-accent transition-colors duration-200 leading-snug block"
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Share */}
              <div>
                <p className="text-label uppercase tracking-widest text-text-faint mb-3">
                  Share
                </p>
                <div className="flex gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Twitter"
                    className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-all duration-200"
                  >
                    <Twitter size={15} />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                    className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-all duration-200"
                  >
                    <Linkedin size={15} />
                  </a>
                  <button
                    onClick={copyLink}
                    aria-label="Copy link"
                    className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-all duration-200"
                  >
                    <Link2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  )
}
