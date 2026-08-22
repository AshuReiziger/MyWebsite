# Reiziger Ashu — User Flow & Interaction Map

Status: Draft v1 (for review)
Companion to: `docs/WEBSITE-STRATEGY.md` (positioning/copy) and `CLAUDE.md` (technical
conventions)
Purpose: map what a visitor actually *does* on each section of the built site today —
entry points, on-page interactions, and where each section sends them next — so we can
spot dead ends, redundant paths, and sections whose design doesn't yet match the job
it's supposed to do, before doing any more visual work.

This describes the site **as currently built**, not the aspirational spec. Where the
build has drifted from the strategy doc, or has a gap worth a decision, it's called out
inline as a `flag`.

---

## 1. Global structure (present on every page)

| Element | Behavior |
|---|---|
| **Nav** (`Nav.tsx`) | Sticky header. Logo → `/`. Centered link group: About, Work, Think, Build, Teach, Contact — active route in accent color. Separate "Work With Me" button → `/contact`. Mobile: hamburger toggles a dropdown with the same links. |
| **Footer** (`Footer.tsx`) | Full-bleed dark band. Repeats nav links (plus Home), active route highlighted. Social links (Behance/LinkedIn/Instagram/YouTube) open in a new tab. |
| **WhatsApp button** (`WhatsAppButton.tsx`) | Fixed bottom-right, every page. Opens `wa.me` in a new tab with a prefilled greeting. |
| **Scroll/entrance motion** (`Reveal`, `HeroReveal`) | Section headings fade+slide in on scroll; hero content fades+slides in on load. Decorative, not interactive. |

`flag` — **"Work With Me" button + "Contact" nav link both go to `/contact`.** Deliberate
emphasis (matches the strategy doc's persistent-CTA pattern), but worth confirming
that's still the intent now that Contact is also in the main link group — previously
"Work With Me" was the *only* way to Contact from the nav.

---

## 2. Primary journeys the site is designed to support

Per the strategy doc's narrative arc (Who I Am → What I Believe → What I Do → What I've
Built → What I Think → What I Can Do For You → Let's Build), Home is built as a single
scroll that previews all seven beats, and each other page is the "full version" of one
beat. Two journeys matter most:

**A. Evaluate fit, then convert** (prospective client/collaborator)
`/` (hero + capabilities + ventures) → `/work` (proof) → `/work/[slug]` (depth) →
`/contact` — or short-circuit to WhatsApp/`/contact` straight from the Home hero.

**B. Evaluate credibility as a thinker/educator** (event organizer, student, press)
`/` or `/think` → `/think/[slug]` → `/teach` (training/speaking) → `/contact`.

Both journeys currently have friction points — see the per-page notes below, especially
§3.1 (Home's "Recent Writing" has no link to the Think index) and §3.5/§3.6 (article and
case-study pages don't route the reader anywhere once they finish reading).

---

## 3. Section-by-section breakdown

### 3.1 Home (`/`)

| Section | Interaction | Sends the user to |
|---|---|---|
| Hero | Two CTAs | `/work`, `/contact` |
| "Trusted by teams…" client logos | None (decorative placeholders) | — |
| "Design is more than aesthetics" + process stepper | None | — |
| "What I do" capability cards (Design/Strategy/Education/Leadership) | None | — |
| Ventures band (Sigma Studio / Academy) | Two links | `/build` (both) |
| "Recent writing" (3 latest articles) | Article cards | `/think/[slug]` |
| Testimonials | None (decorative placeholders) | — |
| Closing "Have an idea worth building?" | One CTA | `/contact` |

`flag` — **No "View all articles →" link from the Recent Writing section to `/think`.**
A reader interested in one article currently has no on-page path to the full index; they'd
have to use the top nav.

`flag` — **Capability cards (Design/Strategy/Education/Leadership) are dead ends.** Each
names a practice area but doesn't link anywhere — Education, for instance, is exactly
where a link to `/teach` or the Academy would make sense.

`flag` — **The "Design is more than aesthetics" philosophy block duplicates About's
content** (same heading/copy is in `about/page.tsx`'s intended philosophy section per the
strategy doc) but isn't currently linked to `/about` from here, so a visitor who resonates
with it has no obvious next click toward "learn more about who's telling me this."

`flag` — **Ventures band CTAs both point internally to `/build`**, not to a live Sigma
Studio / Academy site. Reasonable today (those may not exist as separate destinations
yet) — worth confirming whether that's permanent or a placeholder for future external
links, since the copy ("Visit Sigma Studio →") reads as if it leaves the site.

### 3.2 About (`/about`)

| Section | Interaction | Sends the user to |
|---|---|---|
| Hero quote | None | — |
| Journey timeline (dot markers, 2021 → 2026) | Visual only, `current` node highlighted | — |
| Values grid (Purpose/Excellence/Curiosity/Integrity/Impact/Stewardship) | None | — |

`flag` — **About has no exit CTA.** Every other content page (Work, Build, Teach, even
Think's quote card) ends by pointing somewhere — About just stops after the values grid.
For a page whose narrative job is "Who I Am / What I Believe" (step 1–2 of the arc), the
natural next beat is "What I Do" or "What I've Built" — a closing link to `/work` or
`/build` would close that loop.

### 3.3 Work index (`/work`) → Case study (`/work/[slug]`)

| Section | Interaction | Sends the user to |
|---|---|---|
| Work index | Feature-card list (thumbnail, tags, Challenge/Strategy/Impact teaser) | `/work/[slug]` per card |
| Case study detail | Fixed Challenge/Insight/Strategy/Design/Impact grid + MDX body | — |

`flag` — **Case study pages are a dead end.** No "back to Work," no related case studies,
no closing CTA to Contact. A reader who's just seen the strongest social proof on the
site (a finished case study) has nowhere obvious to act on that momentum except the
persistent nav/WhatsApp button.

### 3.4 Think index (`/think`) → Article (`/think/[slug]`)

| Section | Interaction | Sends the user to |
|---|---|---|
| Category filter pills | Client-side filter, resets "load more" count | — |
| Featured article + quote card (All view only) | Featured card links out; quote card is decorative | `/think/[slug]` |
| Article grid | Cards, one styled dark via `accent` | `/think/[slug]` per card |
| "Load More Thoughts" | Reveals `LOAD_MORE_STEP` more cards, client-side only | — |
| Article detail | Title/date/category + MDX body | — |

`flag` — **Same dead-end issue as Work:** article pages have no back-link, no related
articles, no CTA. Given Think's role in Journey B (credibility → Teach → Contact), a
closing nudge toward `/teach` or `/contact` would matter more here than almost anywhere
else on the site.

### 3.5 Build (`/build`)

| Section | Interaction | Sends the user to |
|---|---|---|
| Sidebar (`BuildSidebar`, page-specific) | Icon nav (Home/About/Work/Think/Build/Teach) + Contact button | Respective routes, `/contact` |
| Flagship Venture (Sigma Studio) | "Visit Sigma Studio →" | `href="#"` — placeholder |
| Educational Platform (Academy) | "Explore the Academy" + bullet list | `href="#"` — placeholder |
| Community & Ecosystem grid (7 initiatives) | Static icon cards | None |

`flag` — **Both primary CTAs on this page (`#`) go nowhere.** This is the one page whose
entire job is "here's what I've built, go look at it," and neither link is wired to a
real destination yet — worth prioritizing over the community grid, which is inherently
non-interactive by design (there's nothing to click through to for those).

### 3.6 Teach (`/teach`)

| Section | Interaction | Sends the user to |
|---|---|---|
| Hero | One CTA | `/contact` |
| Offerings grid (Training/Workshops/Mentorship/Resources) | Static cards | None |
| "Invite Me to Speak" panel | Topic list + CTA | `/contact` |

`flag` — **Offerings grid is static**, same pattern as Build's community grid and Home's
capability cards. Three separate places on the site now use "informational card, no
link" as a pattern — worth deciding once whether that's the permanent design language
for enumerating things, or whether some of these should route somewhere (e.g. "Mentorship"
→ a dedicated inquiry path distinct from the general contact form).

### 3.7 Contact (`/contact`)

| Section | Interaction | Sends the user to |
|---|---|---|
| Copy + image placeholder | None | — |
| Form (name, email, project type, message) | Submits to `/api/contact`, shows inline success/error state, resets on success | Stays on page |

`flag` — **`/api/contact` logs server-side but doesn't send an email yet** (documented
already in `CLAUDE.md`) — a real submission today has no notification path to Reiziger
beyond the server log. This is the one gap that blocks the site from being genuinely
"live" for its main conversion action.

`flag` — **WhatsApp button floats over the bottom-right of this page too**, directly
above/near the form's submit button on narrow viewports — worth a mobile check once real
copy/images are in, since Contact is the one page where a duplicate "talk to me" channel
sitting on top of the primary one could visually compete rather than complement.

---

## 4. Cross-cutting open questions

1. **Dead-end detail pages.** Work case studies and Think articles are both terminal —
   should every detail page end with a small "Next steps" block (related content +
   a Contact/WhatsApp nudge), or is that intentionally left to the persistent nav?
2. **Static vs. linked cards.** Home's capabilities, Build's community grid, and Teach's
   offerings all use the same "icon + title + description, no link" pattern. Decide once
   whether informational cards should stay non-interactive everywhere, or whether some
   (Education → Teach, Mentorship → a specific path) should become links.
3. **Ventures band → `/build` vs. external.** Confirm whether Sigma Studio / Academy will
   ever be separate destinations (own domain, own site) or are permanently sub-sections
   of this site — determines whether "Visit Sigma Studio →" should stay internal.
4. **About's missing exit.** Decide what About should hand the reader off to.
5. **Home → Think/About linking gaps.** Add "View all articles" from Home's writing
   section; decide whether the philosophy block on Home should link to About.
6. **Contact form → email.** Prioritize wiring `/api/contact` to a real provider once the
   above flow gaps are settled, since none of the upstream fixes matter if the final step
   doesn't reach anyone.

---

## 5. How to use this doc

Treat each `flag` as a discussion item, not a to-do list — mark each as **fix now**,
**intentional, leave as-is**, or **revisit later** and we'll turn the "fix now" set into
actual changes next.
