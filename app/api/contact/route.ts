import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validations'
import { sendContactEmail } from '@/lib/mail'

// Simple in-memory rate limiter — sufficient for shared hosting traffic
const rateLimit = new Map<string, { count: number; resetAt: number }>()
const RATE_WINDOW = 60 * 1000  // 1 minute
const RATE_MAX    = 3           // 3 submissions per minute per IP

function checkRateLimit(ip: string): boolean {
  const now   = Date.now()
  const entry = rateLimit.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return true
  }
  if (entry.count >= RATE_MAX) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  // 1. Rate limit
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment.' },
      { status: 429 },
    )
  }

  // 2. Parse body
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  // 3. Honeypot — bots fill hidden fields, humans don't
  if ((body as Record<string, unknown>)._gotcha) {
    return NextResponse.json({ success: true }) // silently succeed
  }

  // 4. Newsletter signup shortcut (no Zod, just store/forward email)
  const bodyRecord = body as Record<string, unknown>
  if (bodyRecord.type === 'newsletter') {
    const email = bodyRecord.email
    if (typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 422 })
    }
    // Log to console — integrate with Mailchimp/ConvertKit later
    console.log('[Newsletter signup]', email)
    return NextResponse.json({ success: true })
  }

  // 5. Validate contact form with Zod
  const result = contactSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed.', details: result.error.flatten() },
      { status: 422 },
    )
  }

  // 6. Send emails
  try {
    await sendContactEmail(result.data)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[Contact API] Email send failed:', err)
    return NextResponse.json(
      { error: 'Failed to send message. Please email us directly at hello@alvis.agency.' },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
