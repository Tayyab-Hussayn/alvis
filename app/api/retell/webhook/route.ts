import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { verifyRetellSignature } from '@/lib/retell'

export const dynamic = 'force-dynamic'

/**
 * Retell call lifecycle webhook.
 *
 * Subscribed to `call_analyzed`, which fires after post-call analysis completes and
 * carries the extracted fields (lead_captured, caller_intent, sentiment, …).
 * `call_started` / `call_ended` are accepted but only logged.
 */
const LOG_DIR = process.env.LEADS_DIR ?? path.join(process.cwd(), '.leads')
const CALLS_FILE = path.join(LOG_DIR, 'voice-calls.jsonl')

export async function POST(req: NextRequest) {
  const raw = await req.text()
  const signature = req.headers.get('x-retell-signature')

  if (!(await verifyRetellSignature(raw, signature))) {
    console.warn('[Retell webhook] Rejected request with invalid signature')
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = JSON.parse(raw)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const event = typeof body.event === 'string' ? body.event : 'unknown'
  const call = (body.call ?? {}) as Record<string, unknown>

  if (event !== 'call_analyzed') {
    console.log(`[Retell webhook] ${event} — call ${call.call_id ?? 'n/a'}`)
    // Always 200: non-2xx makes Retell retry a webhook we do not act on.
    return NextResponse.json({ received: true })
  }

  const analysis = (call.call_analysis ?? {}) as Record<string, unknown>
  const custom = (analysis.custom_analysis_data ?? {}) as Record<string, unknown>

  const record = {
    receivedAt: new Date().toISOString(),
    callId: call.call_id ?? '',
    durationMs: call.duration_ms ?? call.end_timestamp ?? null,
    disconnectReason: call.disconnection_reason ?? '',
    // Retell's own analysis
    summary: analysis.call_summary ?? '',
    userSentiment: analysis.user_sentiment ?? '',
    callSuccessful: analysis.call_successful ?? null,
    // The fields configured under Post-Call Data Extraction
    custom,
    metadata: call.metadata ?? {},
  }

  try {
    await fs.mkdir(LOG_DIR, { recursive: true })
    await fs.appendFile(CALLS_FILE, JSON.stringify(record) + '\n', 'utf8')
  } catch (err) {
    console.error('[Retell webhook] Failed to write call record:', err)
  }

  console.log(
    `[Retell webhook] call_analyzed ${record.callId} | sentiment=${record.userSentiment} | lead=${custom.lead_captured ?? 'n/a'}`,
  )

  return NextResponse.json({ received: true })
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
