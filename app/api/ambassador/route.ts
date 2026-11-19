import { NextResponse } from "next/server";
import { ACTIVITY_CRM_LABELS } from "@/signature-recovery-protocol/content/ambassador-form";
import {
  parseAmbassadorValues,
  toInstagramHandle,
  toInternationalPhone,
  validateAmbassadorForm,
} from "@/signature-recovery-protocol/lib/ambassador-form";

/**
 * Ambassador Pro registration → GoHighLevel.
 *
 * Forwards the form to the GHL workflow "AMBASSADEUR PRO METCARE® — INSCRIPTION"
 * through its Inbound Webhook trigger. The URL stays on the server:
 *
 *   GHL_AMBASSADOR_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/…
 *
 * The workflow then creates/updates the contact, adds the tag and sends the
 * welcome e-mail. Field keys below are what to map in the workflow.
 */
const GHL_TAG = "AMBASSADEUR PRO METCARE";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field. Pretend it worked.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const values = parseAmbassadorValues(body);
  const errors = validateAmbassadorForm(values);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "invalid", fields: errors }, { status: 422 });
  }

  const activityLabels = values.activities.map((id) =>
    id === "other" ? `Autre : ${values.activityOther.trim()}` : ACTIVITY_CRM_LABELS[id],
  );

  const payload = {
    first_name: values.firstName.trim(),
    last_name: values.lastName.trim(),
    email: values.email.trim().toLowerCase(),
    phone: toInternationalPhone(values.dialIso, values.phone),
    company_name: values.businessName.trim(),
    activity: activityLabels.join(", "),
    activities: activityLabels,
    city: values.city.trim(),
    country: values.country.trim(),
    instagram: toInstagramHandle(values.instagram),
    consent: true,
    consent_at: new Date().toISOString(),
    tags: [GHL_TAG],
    form_name: "AMBASSADEUR PRO METCARE®",
    language: body.locale === "en" ? "en" : "fr",
    source: "Tunnel Ambassadeur Pro",
    page_url: typeof body.pageUrl === "string" ? body.pageUrl.slice(0, 500) : "",
  };

  const webhookUrl = process.env.GHL_AMBASSADOR_WEBHOOK_URL;
  if (!webhookUrl) {
    if (process.env.NODE_ENV !== "production") {
      // Local development without GHL: log the payload so the flow can be tested.
      console.info("[ambassador] GHL_AMBASSADOR_WEBHOOK_URL not set — payload:", payload);
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[ambassador] GHL_AMBASSADOR_WEBHOOK_URL is not set");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error("[ambassador] GHL webhook answered", response.status);
      return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
    }
  } catch (error) {
    console.error("[ambassador] GHL webhook failed", error);
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
