import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import type { BlogPost } from '@/data/blogPosts'

interface Props { post: BlogPost }

export function PostHero({ post }: Props) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })

  return (
    <section className="bg-bg pt-36 pb-12">
      <Container>
        <div className="max-w-3xl mx-auto text-center hero-anim">
          <Badge className="mb-4">{post.category}</Badge>
          <h1 className="text-display-xl font-display font-bold text-text mt-4 mb-6">
            {post.title}
          </h1>
          <p className="text-body-lg text-text-muted mb-8">{post.excerpt}</p>

          <div className="flex items-center justify-center gap-3 text-body-sm text-text-faint">
            <span>{post.author}</span>
            <span>·</span>
            <span>{formattedDate}</span>
            <span>·</span>
            <span>{post.readTime} read</span>
          </div>

          {/* Cover image */}
          <div className="aspect-video rounded-3xl overflow-hidden mt-12 bg-subtle relative hero-anim-fade" style={{ animationDelay: '0.15s' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" loading="eager" fetchPriority="high" decoding="async" />
          </div>
        </div>
      </Container>
    </section>
  )
}
