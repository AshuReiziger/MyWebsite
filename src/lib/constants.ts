/** Single recipient for every inbound form on the site (contact, speaking, mentorship, workshops) — not an env var since there's only ever one. */
export const CONTACT_EMAIL = "ashu.reiziger45@gmail.com";

/**
 * Canonical production domain, used to build absolute links (e.g. resource
 * PDF downloads) sent in outbound email. Must be a fixed constant rather
 * than derived from the incoming request's URL — a request handled by a
 * Vercel preview deployment would otherwise produce a download link on that
 * preview's *.vercel.app domain, which sits behind Vercel's Deployment
 * Protection and requires the recipient to log into Vercel to open it.
 */
export const SITE_URL = "https://reizigerashu.com";
