/**
 * No analytics package is installed in this project yet. `track()` pushes
 * events to `window.dataLayer` — the de facto standard queue read by Google
 * Tag Manager, GA4, and most other tag managers — so wiring up real
 * analytics later (e.g. dropping the GTM snippet into layout.tsx) requires
 * no changes to call sites, just something listening on the other end.
 */
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...properties });
}
