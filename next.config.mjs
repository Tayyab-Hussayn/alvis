/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',        value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection',       value: '1; mode=block' },
          { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
          // microphone=(self) is required by the Retell voice widget. With the
          // previous `microphone=()` the browser blocks getUserMedia outright,
          // even same-origin, and the assistant can never connect.
          { key: 'Permissions-Policy',             value: 'camera=(), microphone=(self), geolocation=(), payment=()' },
          { key: 'Cross-Origin-Opener-Policy',   value: 'same-origin-allow-popups' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              // Retell web calls: token exchange over the API, then signalling over
              // LiveKit Cloud. The SDK currently targets
              // wss://retell-ai-4ihahnq7.livekit.cloud — wildcarded so a subdomain
              // rotation on their side does not take the widget down.
              "connect-src 'self' https://api.retellai.com https://*.retellai.com wss://*.livekit.cloud https://*.livekit.cloud",
              // WebRTC audio playback is delivered as blob/MediaStream.
              "media-src 'self' blob:",
              "worker-src 'self' blob:",
              "frame-src 'none'",
              "object-src 'none'",
              "base-uri 'self'",
            ].join('; '),
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
      // Next.js handles /_next/static/ caching itself in production
      // (content-hashed filenames + immutable headers). No override needed.
    ]
  },
}

export default nextConfig
