import { createHash } from "node:crypto";

// Server-only: builds the Conversions API payload. PII is normalised then
// SHA-256 hashed here; it never leaves the server in clear text.

export const META_GRAPH_API_VERSION = "v21.0";

export const ALLOWED_META_EVENTS = new Set([
  "PageView",
  "ViewContent",
  "InitiateCheckout",
  "Lead",
  "CompleteRegistration",
  "Schedule",
  "Contact",
]);

export type CapiRequestBody = {
  eventName?: string;
  eventId?: string;
  eventSourceUrl?: string;
  fbp?: string;
  fbc?: string;
  customData?: Record<string, unknown>;
  user?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    /** ISO 3166-1 alpha-2 ("fr"). */
    country?: string;
  };
};

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

function hashed(value: unknown, normalise: (v: string) => string) {
  const v = typeof value === "string" ? normalise(value) : "";
  return v ? [sha256(v)] : undefined;
}

const lowerTrim = (v: string) => v.trim().toLowerCase();
const str = (v: unknown, max: number) =>
  typeof v === "string" && v.length > 0 ? v.slice(0, max) : undefined;

export function buildCapiPayload(
  body: CapiRequestBody,
  context: { ip?: string; userAgent?: string; testEventCode?: string; now?: number },
) {
  const user = body.user && typeof body.user === "object" ? body.user : {};
  const userData = {
    em: hashed(user.email, lowerTrim),
    // E.164 → digits only, country code included.
    ph: hashed(user.phone, (v) => v.replace(/\D/g, "")),
    fn: hashed(user.firstName, lowerTrim),
    ln: hashed(user.lastName, lowerTrim),
    country: hashed(user.country, (v) => (/^[a-z]{2}$/.test(lowerTrim(v)) ? lowerTrim(v) : "")),
    client_ip_address: context.ip || undefined,
    client_user_agent: context.userAgent || undefined,
    fbp: str(body.fbp, 200),
    fbc: str(body.fbc, 500),
  };

  const customData =
    body.customData && typeof body.customData === "object" && !Array.isArray(body.customData)
      ? body.customData
      : undefined;

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: body.eventName,
        event_time: Math.floor((context.now ?? Date.now()) / 1000),
        event_id: body.eventId,
        event_source_url: str(body.eventSourceUrl, 1000),
        action_source: "website",
        user_data: userData,
        custom_data: customData,
      },
    ],
  };
  if (context.testEventCode) payload.test_event_code = context.testEventCode;
  return payload;
}
