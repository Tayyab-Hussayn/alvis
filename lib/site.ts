/**
 * Single source of truth for site identity — URL, contact details and NAP.
 *
 * Everything that needs the canonical domain or a public-facing address reads it
 * from here. Previously these were duplicated as literals across layout, sitemap,
 * robots, mail and the legal pages, which is how `hello@alvis.agency` (a domain
 * the agency does not own) survived in four files at once.
 *
 * `siteUrl` is normalised with the trailing slash stripped. `NEXT_PUBLIC_SITE_URL`
 * is set by a human in `.env.local` and a trailing slash there previously produced
 * `https://alvismarketing.com//services` in every sitemap entry. Normalising here
 * means the env value can no longer break canonical URLs.
 */

const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://alvismarketing.com'

/** Canonical origin, guaranteed to have no trailing slash. */
export const siteUrl = RAW_SITE_URL.replace(/\/+$/, '')

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = '/'): string {
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}

export const siteName = 'Alvis Marketing Agency'
export const siteShortName = 'Alvis'

/** Public contact address. Shown on the site and used as the reply-to fallback. */
export const contactEmail = 'info@alvismarketing.com'
export const contactPhone = '(571) 207-8314'
/** E.164 form, for `tel:` links. */
export const contactPhoneHref = '+15712078314'

export const address = {
  locality: 'South Plainfield',
  region: 'NJ',
  postalCode: '07080',
  country: 'United States',
  countryCode: 'US',
} as const

/** "South Plainfield, NJ 07080" */
export const addressLine = `${address.locality}, ${address.region} ${address.postalCode}`

/** Google Maps search link, used by the contact page map. */
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${addressLine}, ${address.country}`,
)}`

/**
 * Canonical company stats.
 *
 * These were previously hardcoded in three separate stat blocks that disagreed
 * with each other — /about alone claimed both "250+ Projects Completed"
 * (WhoWeAre) and "120+ Projects Completed" (ImpactNumbers) on the same screen.
 * Any figure shown to visitors belongs here so the site tells one story.
 *
 * Note projects (120+) exceeds clients (90+): repeat engagements, not a typo.
 */
export const companyStats = {
  yearsExperience:    '10+',
  projectsCompleted:  '120+',
  happyClients:       '90+',
  clientSatisfaction: '95%',
  teamExperts:        '30+',
  averageRoi:         '420%',
} as const

export const socialLinks = {
  facebook: 'https://www.facebook.com/share/1Bwx3RM7pc/',
  instagram: 'https://www.instagram.com/alvisdigital?igsh=MWVhbWY4dXd6Y2Z5OA==',
  linkedin: 'https://www.linkedin.com/company/alvis-marketing-agency',
} as const
