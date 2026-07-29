import type { Metadata } from 'next'
import { Button }    from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
}

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-bg text-center px-4">
      <Container>
        <p className="text-label font-mono uppercase tracking-widest text-accent mb-4">
          404
        </p>
        <h1 className="text-display-xl font-display font-bold text-text mb-4">
          This page doesn&apos;t exist.
        </h1>
        <p className="text-body-lg text-text-muted mb-10">
          Our services do, though.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/" variant="primary" withArrow>
            Back to Home
          </Button>
          <Button href="/contact" variant="secondary">
            Start a Project
          </Button>
        </div>
      </Container>
    </section>
  )
}
