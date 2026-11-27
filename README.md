# Programme Ambassadeur Pro — METCARE®

Next.js (App Router) site for https://ambassadorpro.metcare.fr/. App source lives in
`app/` and `signature-recovery-protocol/`. Environment variables are listed in `.env.example`.

## Meta tracking

Meta Pixel + Conversions API (CAPI). Each event is sent by the browser Pixel and by the
server relay `app/api/meta/capi/route.ts` with the same `event_id`, so Meta dedupes them.

| Variable | Read | Purpose |
|---|---|---|
| `NEXT_PUBLIC_META_PIXEL_ID` | browser (build time) | Pixel / dataset id. Empty = no Pixel, no tracking calls. |
| `META_PIXEL_ID` | server | Dataset id for CAPI; falls back to `NEXT_PUBLIC_META_PIXEL_ID`. |
| `META_CAPI_ACCESS_TOKEN` | server only | CAPI token. Empty = the CAPI route answers 503, the page is unaffected. |
| `META_TEST_EVENT_CODE` | server, optional | Routes events to Events Manager › Test events. |

Events: `PageView` (every page and route change), `ViewContent` (landing page),
`InitiateCheckout` (registration form opened, once per session), `Lead` (registration
API answered OK, once per session; email, phone, first and last name are SHA-256 hashed
on the server and never sent to the Pixel).
