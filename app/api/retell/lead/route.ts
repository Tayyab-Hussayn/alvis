import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { verifyRetellSignature } from '@/lib/retell'
import { sendVoiceLeadEmail } from '@/lib/mail'

export const dynamic = 'force-dynamic'

export interface VoiceLead {
  receivedAt: string
  callId: string
  name: string
  email: string
  phone: string
  company: string
  serviceInterest: string
  summary: string
  pagePath: string
}

/**
 * Durable lead storage.
 *
 * Written to disk *before* email is attempted, deliberately. Outbound SMTP has
 * failed before on this account, and a lead that only exists in an email that
 * never sent is a lost lead. The file is append-only JSONL and survives deploys
 * (deploy.py unzips over the app dir, it does not clean it).
 */
const LEADS_DIR = process.env.LEADS_DIR ?? path.join(process.cwd(), '.leads')
const LEADS_FILE = path.join(LEADS_DIR, 'voice-leads.jsonl')

async function persistLead(lead: VoiceLead): Promise<boolean> {
  try {
    await fs.mkdir(LEADS_DIR, { recursive: true })
    await fs.appendFile(LEADS_FILE, JSON.stringify(lead) + '\n', 'utf8')
    return true
  } catch (err) {
    console.error('[Retell lead] Failed to persist to disk:', err)
    return false
  }
}

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : ''
}

/** Called by the agent's `capture_lead` custom function. */
export async function POST(req: NextRequest) {
  // Read the raw body: the signature is over these exact bytes.
  const raw = await req.text()
  const signature = req.headers.get('x-retell-signature')

  if (!verifyRetellSignature(raw, signature)) {
    console.warn('[Retell lead] Rejected request with invalid signature')
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = JSON.parse(raw)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  // Retell sends { name, call, args } unless "payload: args only" is enabled.
  // Accept either shape so a dashboard toggle can't silently break this.
  const args = (body.args ?? body) as Record<string, unknown>
  const call = (body.call ?? {}) as Record<string, unknown>
  const metadata = (call.metadata ?? {}) as Record<string, unknown>

  const name = str(args.name)
  const email = str(args.email)

  if (!name || !email) {
    // 200 with a spoken-friendly message: a 4xx makes the agent apologise for a
    // system error when the real problem is that it skipped a question.
    return NextResponse.json({
      success: false,
      message: 'I still need your name and email address before I can save this.',
    })
  }

  const lead: VoiceLead = {
    receivedAt: new Date().toISOString(),
    callId: str(call.call_id),
    name,
    email,
    phone: str(args.phone),
    company: str(args.company),
    serviceInterest: str(args.service_interest),
    summary: str(args.summary),
    pagePath: str(metadata.page_path) || '/',
  }

  const stored = await persistLead(lead)

  let emailed = false
  try {
    await sendVoiceLeadEmail(lead)
    emailed = true
  } catch (err) {
    // Never fail the call over this — the lead is already on disk.
    console.error('[Retell lead] Email delivery failed (lead is saved):', err)
  }

  console.log(
    `[Retell lead] ${lead.email} | stored=${stored} emailed=${emailed} | ${lead.serviceInterest}`,
  )

  // The string the agent will speak from.
  return NextResponse.json({
    success: true,
    message:
      'Saved. The team will reach out within one business day to book the free consultation.',
  })
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
