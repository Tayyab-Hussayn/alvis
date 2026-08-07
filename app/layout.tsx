import type { Metadata } from 'next'
import { jakartaSans, inter, dmMono } from '@/lib/fonts'
import { Header }         from '@/components/layout/Header'
import { Footer }         from '@/components/layout/Footer'
import { CustomCursor }   from '@/components/ui/CustomCursor'
import { GSAPProvider }   from '@/components/animations/GSAPProvider'
import { PageTransition } from '@/components/animations/PageTransition'
import { Preloader }      from '@/components/ui/Preloader'
import { VoiceAgent }     from '@/components/ui/VoiceAgent'
import { ImageProtection } from '@/components/ImageProtection'
import {
  siteUrl, siteName, contactEmail, contactPhone, address, socialLinks,
} from '@/lib/site'
import { services } from '@/data/services'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:  'Alvis | Digital Marketing & Technology Agency',
    template: '%s | Alvis',
  },
  description:
    'Alvis is a full-service digital marketing and technology agency. SEO, social media, reputation management, web and app development, AI automation, design and video for growing businesses.',
  keywords: [
    'digital marketing agency',
    'SEO agency',
    'social media marketing',
    'online reputation management',
    'web development',
    'app development',
    'AI automation',
    'graphic design',
    'video editing and animation',
    'Google Ads',
    'digital marketing agency New Jersey',
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
    title:       'Alvis | Digital Marketing & Technology Agency',
    description: 'Strategy, design, and technology for ambitious businesses.',
    images: [{
      url:    '/images/og-image.png',
      width:  1200,
      height: 630,
      alt:    'Alvis Marketing Agency',
    }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Alvis | Digital Marketing & Technology Agency',
    description: 'Strategy, design, and technology for ambitious businesses.',
    images:      ['/images/og-image.png'],
  },
  icons: {
    icon: [{ url: '/logo.svg', type: 'image/svg+xml' }],
  },
}

/**
 * ProfessionalService extends LocalBusiness, so this carries the NAP (name,
 * address, phone) that Google needs to associate the site with a real US
 * business. The previous Organization node had no address or phone at all.
 */
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type':    'ProfessionalService',
  '@id':      `${siteUrl}/#organization`,
  name:        siteName,
  alternateName: 'Alvis',
  url:         siteUrl,
  logo:        `${siteUrl}/images/alvisLogo.jpg`,
  image:       `${siteUrl}/images/alvisLogo.jpg`,
  description: 'Full-service digital marketing and technology agency specializing in SEO, social media, reputation management, web and app development, AI automation and creative production.',
  email:       contactEmail,
  telephone:   contactPhone,
  priceRange:  '$$',
  address: {
    '@type':          'PostalAddress',
    addressLocality:  address.locality,
    addressRegion:    address.region,
    postalCode:       address.postalCode,
    addressCountry:   address.countryCode,
  },
  areaServed: [
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'Canada' },
  ],
  sameAs: [socialLinks.facebook, socialLinks.instagram, socialLinks.linkedin],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name:    'Digital Marketing & Technology Services',
    itemListElement: services.map(s => ({
      '@type': 'Offer',
      itemOffered: {
        '@type':      'Service',
        name:         s.title,
        description:  s.shortDesc,
        url:          `${siteUrl}/services`,
      },
    })),
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
          <VoiceAgent />
        </GSAPProvider>
      </body>
    </html>
  )
}
