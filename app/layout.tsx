import type { Metadata } from 'next'
import { jakartaSans, inter, dmMono } from '@/lib/fonts'
import { Header }         from '@/components/layout/Header'
import { Footer }         from '@/components/layout/Footer'
import { CustomCursor }   from '@/components/ui/CustomCursor'
import { GSAPProvider }   from '@/components/animations/GSAPProvider'
import { PageTransition } from '@/components/animations/PageTransition'
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
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         siteUrl,
    siteName:    'Alvis',
    title:       'Alvis | Digital Marketing & IT Services Agency',
    description: 'Strategy, design, and technology for ambitious businesses.',
    images: [{
      url:    '/images/og-image.jpg',
      width:  1200,
      height: 630,
      alt:    'Alvis Digital Agency',
    }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Alvis | Digital Marketing & IT Services Agency',
    description: 'Strategy, design, and technology for ambitious businesses.',
    images:      ['/images/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type':    'Organization',
  name:        'Alvis',
  url:         siteUrl,
  logo:        `${siteUrl}/logo.svg`,
  description: 'Full-service digital marketing and IT agency.',
  email:       'hello@alvis.agency',
  sameAs: [
    'https://www.linkedin.com/company/alvis-agency',
    'https://www.instagram.com/alvisagency',
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
