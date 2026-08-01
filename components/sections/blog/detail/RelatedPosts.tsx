import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { blogPosts } from '@/data/blogPosts'

interface Props {
  currentSlug: string
  category: string
}

export function RelatedPosts({ currentSlug, category }: Props) {
  const related = blogPosts
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, 3)

  const fallback = blogPosts.filter((p) => p.slug !== currentSlug).slice(0, 3)
  const posts = related.length >= 2 ? related : fallback

  return (
    <section className="py-20 md:py-28 bg-subtle">
      <Container>
        <h2 className="text-display-lg font-display font-bold text-text mb-12">
          More From the Blog
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col">
              <div className="aspect-video rounded-2xl overflow-hidden relative mb-4 bg-subtle">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
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
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
