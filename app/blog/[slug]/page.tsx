import { notFound }     from 'next/navigation'
import type { Metadata } from 'next'
import { blogPosts }     from '@/data/blogPosts'
import { PostHero }      from '@/components/sections/blog/detail/PostHero'
import { PostContent }   from '@/components/sections/blog/detail/PostContent'
import { RelatedPosts }  from '@/components/sections/blog/detail/RelatedPosts'
import { BlogPostCTA }   from '@/components/sections/blog/detail/BlogPostCTA'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | Alvis Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export default function BlogPostPage({ params }: PageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) notFound()

  return (
    <>
      <PostHero     post={post} />
      <PostContent  post={post} />
      <RelatedPosts currentSlug={post.slug} category={post.category} />
      <BlogPostCTA />
    </>
  )
}
