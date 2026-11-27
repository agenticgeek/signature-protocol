import { NextResponse, type NextRequest } from "next/server";
import {
  ALLOWED_META_EVENTS,
  META_GRAPH_API_VERSION,
  buildCapiPayload,
  type CapiRequestBody,
} from "@/signature-recovery-protocol/lib/metaCapiServer";

/**
 * Meta Conversions API relay. Receives events from the browser, adds the
 * server-only data (client IP, user agent, access token), hashes PII and
 * forwards to the Graph API. The browser Pixel uses the same `event_id`, so
 * Meta dedupes the two copies.
 *
 *   META_PIXEL_ID           dataset id (falls back to NEXT_PUBLIC_META_PIXEL_ID)
 *   META_CAPI_ACCESS_TOKEN  server only; without it this route answers 503
 *   META_TEST_EVENT_CODE    optional, routes events to Events Manager › Test events
 */
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const pixelId = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !accessToken) {
    return NextResponse.json({ ok: false, error: "capi_not_configured" }, { status: 503 });
  }

  let body: CapiRequestBody;
  try {
    body = (await request.json()) as CapiRequestBody;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }
  if (
    !body ||
    typeof body.eventName !== "string" ||
    !ALLOWED_META_EVENTS.has(body.eventName) ||
    typeof body.eventId !== "string" ||
    !body.eventId ||
    body.eventId.length > 100
  ) {
    return NextResponse.json({ ok: false, error: "bad_event" }, { status: 400 });
  }

  const forwarded = request.headers.get("x-forwarded-for");
  const payload = buildCapiPayload(body, {
    ip: forwarded?.split(",")[0]?.trim() || undefined,
    userAgent: request.headers.get("user-agent") || undefined,
    testEventCode: process.env.META_TEST_EVENT_CODE || undefined,
  });

  try {
    const res = await fetch(
      `https://graph.facebook.com/${META_GRAPH_API_VERSION}/${encodeURIComponent(pixelId)}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Token in the body, never in logs.
        body: JSON.stringify({ ...payload, access_token: accessToken }),
        signal: AbortSignal.timeout(8_000),
      },
    );
    const json = (await res.json().catch(() => ({}))) as {
      events_received?: number;
      error?: { message?: string; code?: number };
    };
    if (!res.ok) {
      console.error("[meta-capi] Graph API error", res.status, json.error?.code, json.error?.message);
      return NextResponse.json({ ok: false, error: "meta_error" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, events_received: json.events_received });
  } catch (error) {
    console.error("[meta-capi] request failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ ok: false, error: "network" }, { status: 502 });
  }
}
