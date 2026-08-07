import { verify as retellVerify } from 'retell-sdk'

/**
 * Server-side Retell helpers.
 *
 * The API key never reaches the browser. The widget asks our own route for a
 * short-lived access token, and that route is the only thing that talks to Retell
 * with the key.
 */

export const RETELL_API_BASE = 'https://api.retellai.com'

export function getRetellConfig() {
  const apiKey = process.env.RETELL_API_KEY
  const agentId = process.env.RETELL_AGENT_ID
  // Optional. Pin only when you want the site held on a known-good version while
  // you edit a draft in the dashboard; otherwise Retell serves the live version.
  const agentVersion = process.env.RETELL_AGENT_VERSION

  return { apiKey, agentId, agentVersion }
}

export function isRetellConfigured(): boolean {
  const { apiKey, agentId } = getRetellConfig()
  return Boolean(apiKey && agentId)
}

/**
 * Verify the `X-Retell-Signature` header on inbound function/webhook requests.
 *
 * Delegates to the official SDK. Retell's scheme is not merely
 * `HMAC-SHA256(apiKey, body)` — the header is `v=<timestamp>,d=<hex>` and the
 * digest covers `body + timestamp`, with a five-minute replay window. A
 * hand-rolled HMAC over the body alone silently rejects every genuine request,
 * which is exactly what happened here before this was switched to the SDK.
 *
 * Always pass the *raw* body: re-serialising parsed JSON changes the bytes and
 * the digest will not match.
 */
export async function verifyRetellSignature(
  rawBody: string,
  signature: string | null,
): Promise<boolean> {
  const { apiKey } = getRetellConfig()
  if (!apiKey || !signature) return false

  try {
    return await retellVerify(rawBody, apiKey, signature)
  } catch {
    return false
  }
}

/** Fixed-window in-memory rate limiter. Web calls cost money — throttle them. */
const buckets = new Map<string, { count: number; resetAt: number }>()

export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now()

  if (buckets.size > 1000) {
    Array.from(buckets.entries()).forEach(([k, v]) => {
      if (now > v.resetAt) buckets.delete(k)
    })
  }

  const entry = buckets.get(key)
  if (!entry || now > entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (entry.count >= max) return false
  entry.count++
  return true
}

export function clientIp(headers: Headers): string {
  return headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? headers.get('x-real-ip')?.trim()
    ?? 'unknown'
}
