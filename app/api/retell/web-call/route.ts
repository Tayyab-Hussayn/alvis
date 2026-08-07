import { NextRequest, NextResponse } from 'next/server'
import {
  RETELL_API_BASE, getRetellConfig, isRetellConfigured, rateLimit, clientIp,
} from '@/lib/retell'

export const dynamic = 'force-dynamic'

/**
 * Mint a short-lived Retell web-call access token.
 *
 * The token is only valid for 30 seconds, so this must be called at the moment the
 * visitor clicks to talk — never prefetched on page load.
 *
 * Rate limited because every successful call bills per minute against the account.
 */
export async function POST(req: NextRequest) {
  if (!isRetellConfigured()) {
    console.error('[Retell] RETELL_API_KEY or RETELL_AGENT_ID is not set')
    return NextResponse.json(
      { error: 'Voice assistant is not available right now.' },
      { status: 503 },
    )
  }

  const ip = clientIp(req.headers)
  // 5 calls per 10 minutes per IP is generous for real use and cheap to abuse-proof.
  if (!rateLimit(`webcall:${ip}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: 'Too many calls started. Please wait a few minutes.' },
      { status: 429 },
    )
  }

  const { apiKey, agentId, agentVersion } = getRetellConfig()

  let context: Record<string, unknown> = {}
  try {
    context = (await req.json()) ?? {}
  } catch {
    /* body is optional */
  }

  const pagePath = typeof context.pagePath === 'string' ? context.pagePath : '/'

  try {
    const res = await fetch(`${RETELL_API_BASE}/v2/create-web-call`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: agentId,
        ...(agentVersion ? { agent_version: Number(agentVersion) } : {}),
        // Available inside the prompt as {{page_path}} / {{referrer}} if you want the
        // agent to acknowledge what the visitor was reading.
        retell_llm_dynamic_variables: {
          page_path: pagePath,
          referrer: typeof context.referrer === 'string' ? context.referrer : '',
        },
        metadata: {
          source: 'website-widget',
          page_path: pagePath,
        },
      }),
    })

    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      console.error('[Retell] create-web-call failed:', res.status, detail.slice(0, 400))
      return NextResponse.json(
        { error: 'Could not start the call. Please try again.' },
        { status: 502 },
      )
    }

    const data = await res.json()

    // Only the access token goes to the browser.
    return NextResponse.json({
      accessToken: data.access_token,
      callId: data.call_id,
    })
  } catch (err) {
    console.error('[Retell] create-web-call threw:', err)
    return NextResponse.json(
      { error: 'Could not start the call. Please try again.' },
      { status: 502 },
    )
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
