import type { Metadata } from 'next'
import { jakartaSans, inter, dmMono } from '@/lib/fonts'
import { Header }         from '@/components/layout/Header'
import { Footer }         from '@/components/layout/Footer'
import { CustomCursor }   from '@/components/ui/CustomCursor'
import { GSAPProvider }   from '@/components/animations/GSAPProvider'
import { PageTransition } from '@/components/animations/PageTransition'
import { Preloader }      from '@/components/ui/Preloader'
import { ImageProtection } from '@/components/ImageProtection'
import '@/styles/globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://alvis.agency'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:  'Alvis | Digital Marketing & IT Services Agency',
    template: '%s | Alvis',
  },
  description:
    'Alvis is a full-service digital marketing and IT agency. Web design, SEO, PPC, branding, social media, and IT consulting for ambitious businesses.',
  keywords: [
    'digital marketing agency',
    'IT services',
    'web design',
    'SEO',
    'branding',
    'social media marketing',
    'Google Ads',
    'UI UX design',
  ],
  authors:  [{ name: 'Alvis Agency' }],
  creator:  'Alvis',
  robots: {
    index:     true,
    follow:    true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         siteUrl,
    siteName:    'Alvis',
    title:       'Alvis | Digital Marketing & IT Services Agency',
    description: 'Strategy, design, and technology for ambitious businesses.',
    images: [{
      url:    '/images/alvisLogo.jpg',
      width:  1024,
      height: 1024,
      alt:    'Alvis Marketing Agency',
    }],
  },
  twitter: {
    card:        'summary',
    title:       'Alvis | Digital Marketing & IT Services Agency',
    description: 'Strategy, design, and technology for ambitious businesses.',
    images:      ['/images/alvisLogo.jpg'],
  },
  icons: {
    icon: [{ url: '/logo.svg', type: 'image/svg+xml' }],
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type':    'Organization',
  name:        'Alvis',
  url:         siteUrl,
  logo:        `${siteUrl}/images/alvisLogo.jpg`,
  description: 'Full-service digital marketing and IT agency specializing in growth strategies, branding, and technology solutions.',
  email:       'hello@alvis.agency',
  sameAs: [
    'https://www.facebook.com/share/1Bwx3RM7pc/',
    'https://www.instagram.com/alvisdigital?igsh=MWVhbWY4dXd6Y2Z5OA==',
    'https://www.linkedin.com/company/alvis-marketing-agency',
  ],
  offers: {
    '@type':   'AggregateOffer',
    category:  'Digital Marketing & IT Services',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${jakartaSans.variable} ${inter.variable} ${dmMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="bg-bg text-text antialiased">
        <Preloader />
        <ImageProtection />

        {/* Skip to main content — keyboard accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded focus:text-body-sm font-medium"
        >
          Skip to main content
        </a>

        <GSAPProvider>
          <CustomCursor />
          <Header />
          <main id="main-content">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
        </GSAPProvider>
      </body>
    </html>
  )
}
