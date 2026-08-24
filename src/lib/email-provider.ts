/**
 * Thin, provider-agnostic wrapper around adding a subscriber to an email
 * marketing platform's list/form. Which provider is live is controlled
 * entirely by environment variables so the frontend never hard-codes a
 * specific vendor:
 *
 *   EMAIL_PROVIDER  "kit" (formerly ConvertKit) | "convertkit" | "mailerlite" | "beehiiv"
 *   EMAIL_API_KEY   API key/secret for that provider
 *   EMAIL_FORM_ID   The provider's form/list/publication id to subscribe into
 *
 * If EMAIL_PROVIDER is unset, subscribeToList() is a no-op that reports
 * `skipped: true` rather than throwing — list-building is a nice-to-have
 * layered on top of resource delivery, not a hard requirement for the
 * lead-magnet flow to work. Swapping providers later (or adding a new one)
 * only touches this file, never the form or API route.
 */
export interface SubscribePayload {
  firstName: string;
  email: string;
  role?: string;
  resourceSlug: string;
  resourceTitle: string;
}

export type SubscribeResult =
  | { ok: true; skipped?: false }
  | { ok: false; skipped: true }
  | { ok: false; skipped?: false; error: string };

async function subscribeKit(payload: SubscribePayload, apiKey: string, formId: string): Promise<SubscribeResult> {
  const response = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      email: payload.email,
      first_name: payload.firstName,
      fields: { role: payload.role ?? "", resource: payload.resourceSlug },
    }),
  });
  if (!response.ok) return { ok: false, error: `Kit/ConvertKit responded ${response.status}` };
  return { ok: true };
}

async function subscribeMailerlite(payload: SubscribePayload, apiKey: string, groupId: string): Promise<SubscribeResult> {
  const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      email: payload.email,
      fields: { name: payload.firstName, role: payload.role ?? "" },
      groups: [groupId],
    }),
  });
  if (!response.ok) return { ok: false, error: `MailerLite responded ${response.status}` };
  return { ok: true };
}

async function subscribeBeehiiv(payload: SubscribePayload, apiKey: string, publicationId: string): Promise<SubscribeResult> {
  const response = await fetch(`https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      email: payload.email,
      reactivate_existing: false,
      utm_source: "resources",
      utm_campaign: payload.resourceSlug,
    }),
  });
  if (!response.ok) return { ok: false, error: `Beehiiv responded ${response.status}` };
  return { ok: true };
}

export async function subscribeToList(payload: SubscribePayload): Promise<SubscribeResult> {
  const provider = process.env.EMAIL_PROVIDER?.toLowerCase();
  const apiKey = process.env.EMAIL_API_KEY;
  const formId = process.env.EMAIL_FORM_ID;

  if (!provider) return { ok: false, skipped: true };
  if (!apiKey || !formId) {
    console.error(`EMAIL_PROVIDER is set to "${provider}" but EMAIL_API_KEY / EMAIL_FORM_ID is missing.`);
    return { ok: false, error: "Email provider is misconfigured." };
  }

  try {
    switch (provider) {
      case "kit":
      case "convertkit":
        return await subscribeKit(payload, apiKey, formId);
      case "mailerlite":
        return await subscribeMailerlite(payload, apiKey, formId);
      case "beehiiv":
        return await subscribeBeehiiv(payload, apiKey, formId);
      default:
        console.error(`Unknown EMAIL_PROVIDER "${provider}".`);
        return { ok: false, error: `Unknown email provider "${provider}".` };
    }
  } catch (error) {
    console.error("Email provider subscribe failed:", error);
    return { ok: false, error: "Email provider request failed." };
  }
}
