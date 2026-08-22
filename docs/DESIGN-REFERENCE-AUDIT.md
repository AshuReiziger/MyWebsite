# Reference Site Audit — Iknite Studio, Ulevus, studio.design

Status: Partial — see "Coverage" below
Source material: user-saved HTML page sources (View Source / Save Page),
uploaded directly. No live network access to any of the three sites was
available in this session (sandboxed egress policy blocks arbitrary web
hosts) — everything below is derived only from the uploaded files.

## Coverage — read this first

| Site | What we have | What that gives us |
|---|---|---|
| **Iknite Studio** (`iknite.studio`) | Full "Webpage, HTML only" save of the homepage, with **all `<style>` blocks inlined** (WordPress/Elementor writes computed CSS directly into `<head>` and per-section `<style>` tags) | Strong — real hex colors, real font names, real responsive type scale, real component markup |
| **Ulevus** (`ulevus.com/about`) | HTML-only save of the About page. The actual stylesheet (`main.a8bc8cfd.css`) is referenced but was **not** included — browsers don't inline external CSS on a plain "Save As → Webpage, HTML only" | Structural/technical only — confirmed framework, libraries, class names, copy. **No real colors, fonts, spacing, or radii** — anything visual for Ulevus below is unverified |
| **studio.design** | Nothing provided | Not analyzed. Send a saved HTML file (or screenshots) if you want it covered |

Per your instruction not to guess and to label confidence, every claim below
is tagged:
- **CONFIRMED** — read directly out of the source you provided
- **STRONG INFERENCE** — not stated outright, but the evidence points at one clear answer
- **UNVERIFIED** — genuinely don't know; flagged so you don't design around a guess

---

## 1. Iknite Studio — Full Audit

### 1.1 Technical stack (CONFIRMED)

- **CMS:** WordPress (`meta name="generator" content="WordPress 7.1"`), with **WooCommerce** active (`WooCommerce 10.9.4` — cart/shop CSS is loaded even though the homepage shows no shop UI; likely used elsewhere on the site, e.g. a digital-product store)
- **Page builder:** **Elementor Pro** (`meta generator: "Elementor 4.0.0; features: e_font_icon_svg, additional_custom_breakpoints"`) — every section is `data-widget_type="..."` Elementor widgets (`int-hero-one`, `int-service-v6`, `int-testimonial-v3`, `int-marquee-v4`, `int-brand`, `int-logo`, `int-social`), not hand-rolled HTML
- **Theme:** A purchased theme called **"Auxa"** (`page-template-auxa-template`, `theme-auxa`, `auxa-core.css`, `auxa-main.css`, `auxa-style.css`) — this is a ThemeForest-style Elementor creative-agency theme, not a custom build
- **Analytics:** Google Analytics 4 via **Site Kit by Google** plugin (`meta generator: "Site Kit by Google 1.185.0"`, GA4 stream `GT-NGKV7FHL`)
- **Live chat:** **GoHighLevel / LeadConnectorHQ** chat widget (`<chat-widget>` custom element, `widgets.leadconnectorhq.com`) — a Stencil.js/Ionic-based web component, shadow-DOM encapsulated
- **Icons:** Font Awesome 5 Pro (`far fa-*` classes), rendered as **inlined SVG** rather than icon-font glyphs (Elementor's "Font Icon SVG" feature — better for accessibility/performance than icon fonts)
- **Smooth scroll:** **Lenis** (`<html class="lenis lenis-smooth ...">` — this class is written by the Lenis library itself at runtime, so its presence is direct proof, not inference)
- **Scroll-entrance animations:** **WOW.js + animate.css** — elements carry literal `class="wow fadeInUp" data-wow-delay="350ms" data-wow-duration=".7s"`, which is WOW.js's exact API signature
- **Carousels/sliders:** **Swiper.js** (`swiper-container`, `swiper-slide`, `swiper-wrapper` — brand-logo strip and services carousel both use it)
- **Marquee ticker:** **jquery.marquee** plugin (`js-marquee-wrapper` / `js-marquee` classes are that library's signature), computed inline as `animation: 28.36s linear 0s infinite normal none running`
- **Lightbox:** Magnific Popup (`magnific-popup.css` loaded)
- **Image hover-reveal effect:** a bundled `imageRevealHover.css` (part of the Auxa theme, not a generic library)
- **Grid/utility base:** Bootstrap (`bootstrap.min.css`) underlies the header/nav alongside Elementor's own container system
- **Fonts loaded:** Roboto, Roboto Slab, Mulish, Outfit, Inter, Cardo (self-hosted via Elementor's "local Google Fonts" feature — no `fonts.googleapis.com` request at runtime, all served from the WP site itself)

### 1.2 Confirmed color palette

```
Body/page background:     #1B011D   (very dark aubergine/near-black purple)
Footer background:        #2B012F   (a slightly lighter dark purple — footer is NOT the same flat color as body)
Primary accent (CTAs):     #FF015B   (vivid pink/magenta — used on every button, the marquee bg, testimonial quote mark)
Secondary/gradient stop:   #37003C   (deep plum — used as one stop in a hover-overlay gradient)
Gradient partner:          #FF815B   (warm coral/orange — the OTHER stop of that same gradient, #37003C → #FF815B, 180deg)
Footer link hover:         #C4EF17   (lime/chartreuse — a THIRD accent, used only on footer nav-link hover)
Heading/title text:        #FFFFFF
Body/paragraph text:       #A9A9A9 / #A8A8A8  (two near-identical grays used interchangeably)
Divider lines:             #FFFFFF33  (white at ~20% opacity)
```

Elementor's *default* kit also defines `#6EC1E4`, `#54595F`, `#7A7A7A`,
`#61CE70` — these are the theme's unused stock colors and do **not** appear
applied anywhere in the actual page; don't mistake them for the brand
palette.

**What this tells you about the brand's visual philosophy:** a dark,
near-black purple canvas with one loud, saturated accent (hot pink) — not a
multi-color palette. The lime-green footer-hover is a small surprise accent,
used exactly once as a category, which is a good pattern to borrow:
*one dominant dark neutral + one loud brand accent + one small "delight"
accent used sparingly*.

### 1.3 Confirmed typography

```
Body font:      "Outfit"      font-weight: normal      (a modern geometric-grotesk sans)
Heading font:   "Marcellus"   font-weight: normal      (an elegant, high-contrast serif — display use only)
Button font:    "Mulish"      (sans — used specifically on buttons/CTAs and the entire footer, distinct from body copy)
```

This is a **serif-display + sans-body** pairing — a fairly premium/editorial
choice for a "product design studio," not a generic all-sans SaaS look.

**Confirmed responsive type scale for the hero H1** (`.xb-item--title`,
the biggest, most important heading on the page):

| Breakpoint | font-size | line-height | letter-spacing |
|---|---|---|---|
| Desktop (default) | **103px** | 100px | 0.3px |
| ≤1024px (tablet) | **43px** | 1.5em | (unset) |
| ≤767px (mobile) | **24px** | (unset) | **-1.4px** |

That's a real, confirmed 4.3× reduction from desktop to mobile on the hero
headline — a much more aggressive scale-down than most type systems use,
and worth noting if you want that same "huge on desktop, tight on mobile"
drama.

Section titles (`.section-title .title`): **32px / line-height 47px**,
no text-transform.

Body copy width constraint: text blocks are capped to **87.937%** of their
column with a 40px bottom margin — an odd, very specific percentage that's
almost certainly Elementor's auto-generated inline width from a
drag-resized text box, not an intentional design token. Round it to
~88% / `max-width: 40ch`-ish in your own system rather than copying the
number literally.

Footer heading style: Mulish, 13px, weight 700, uppercase, letter-spacing
1.3px, white.

### 1.4 Layout

- **Boxed section max-width:** 1140px (default), stepping down to 1024px
  and 767px at those same breakpoints (Elementor's container system)
- **Breakpoints confirmed in use:** 1024px, 767px (theme also advertises
  "additional custom breakpoints" in its generator meta, so there may be
  more not exercised on this specific page)
- **Footer grid:** 4 columns at ≥768px with **unequal** widths —
  33.862% / 20.076% / 21.024% / (repeats) — i.e. a wide "About us" column
  first, then three narrower nav-link columns. These are Elementor's
  auto-computed flex-basis percentages from a drag-and-drop column resize,
  not round design-system numbers (roughly a 5:3:3:3-ish visual ratio if
  you want to reproduce the *feel* rather than the exact percentages)

### 1.5 Confirmed interactions

- **Image grayscale→color on hover:** applied independently to **services,
  portfolio, team, and Instagram-feed images** — `filter: grayscale(100%)`
  by default, `grayscale(0%)` on `:hover`. This is the single most
  distinctive, repeated interaction pattern on the page — a strong signal
  of the site's overall "restrained until you engage" personality.
- **Circle button hover:** buttons have a `.button__bg` pseudo-element
  structure (`::before`/`::after`) that changes background color on
  hover — confirmed structurally; the exact fill/expand animation is
  **STRONG INFERENCE** (very likely a CSS `transform: scale()` transition
  on the pseudo-element, standard for this "circle-btn" pattern family,
  but the actual transition rule wasn't in the captured CSS)
- **Universal 0.3s transitions:** nearly every interactive container has
  `transition: background 0.3s, border 0.3s, border-radius 0.3s,
  box-shadow 0.3s` — a site-wide default hover timing of 300ms
- **Marquee ticker:** auto-scrolling brand strip, computed at 28.36s per
  loop, linear, infinite
- **Smooth momentum scroll:** Lenis is active site-wide (confirmed by the
  `lenis` class on `<html>`)
- **Scroll-triggered entrances:** WOW.js watches scroll position and adds
  `animate.css` classes (`fadeInUp`, `skewIn`, `fadeInRight`) as elements
  enter the viewport — hero content staggers in with delays of 250ms →
  350ms → 450ms

### 1.6 Page hierarchy (homepage, as captured)

```
Page (WordPress + Elementor)
├── Header (sticky, "is-sticky" class)
│   ├── Logo (img, max-width 181px)
│   ├── Nav: Home · About (▸Team) · Service (▸5 sub-items) · Portfolio · Blog · Contact
│   └── "Get In Touch" CTA button + burger-menu icon
├── Hero ("hero-digital-marketing")
│   ├── Decorative floating images (skewIn entrance)
│   ├── H1: "Crafting winning UX & Design for Startups" (103px→24px responsive)
│   ├── Supporting paragraph
│   └── Circle CTA button: "Show PROJECTS"
├── Brand logo strip (Swiper carousel, ~12 logos looping)
├── Services section
│   ├── Eyebrow: "services"
│   ├── H2: "Your Success with our Unmatched Experience"
│   └── 5-card Swiper carousel: Software Development · Brand Design ·
│       UX|UI Design · App and Website Design · Digital Marketing
│       (each: numbered title ".01"–".05", description, grayscale→color image, "Learn More" link)
├── Marquee ticker (6 looping capability tags)
├── Portfolio grid (3+ projects: Kryztalyn, Cliqkets, Cameroon Fintech Alliance CFIA)
├── Testimonials (Swiper carousel, quote-mark icon, avatar + name/role)
├── Team grid (Ryan J. Yoder, Ayuk Etta, Bermond Yange, Berlinda Esoh — grayscale→color photos)
├── Instagram feed strip (grayscale→color)
└── Footer (#2B012F background)
    ├── Logo + description + social icons (FB/LinkedIn/Instagram/X, inline SVG)
    ├── "About US" link column
    ├── "MORE INFO" link column
    ├── "Contact US" column
    └── Bottom bar (centered, Outfit font)
```

### 1.7 Assets

- Icons: Font Awesome 5, inlined as SVG at build time
- Social icons: hand-placed inline SVGs (not an icon font) in the footer
- Fonts: self-hosted WOFF2 files served from `iknite.studio/wp-content/...`
  (not Google Fonts CDN, despite using Google-Fonts-sourced font families —
  a `dns-prefetch` to `fonts.googleapis.com` exists but the fonts actually
  load from the local `wp-fonts-local` `@font-face` block, i.e. Elementor's
  "host Google Fonts locally" privacy feature)
- Images: WordPress media library, standard responsive `srcset` sizes
  (300w/600w/full), plus PNGs with transparency for decorative hero graphics

---

## 2. Ulevus — What's Actually Verifiable

The saved file is the HTML shell only; the real stylesheet
(`main.a8bc8cfd.css`) wasn't captured, so **all colors, fonts, spacing,
radii, and shadows for Ulevus are UNVERIFIED** — don't use anything below
as ground truth for those. What follows is what the markup and script tags
do prove.

### 2.1 Technical stack (CONFIRMED / STRONG INFERENCE)

- **Framework: React**, built with **Create React App** (`react-scripts`) —
  **STRONG INFERENCE** from the exact build-output naming convention:
  `main.66edd5b7.js.download` / `main.a8bc8cfd.css`, a single non-`module`
  `<script defer>` tag. This is CRA/webpack's signature output pattern; a
  Vite build would use `type="module"` and different hash/naming
  conventions. `id="root"` + `class="App"` also matches CRA's default
  `index.html` template exactly.
- **Client-side routing:** confirmed via `activeclassname="active"` props
  on nav links — that prop name is specific to **React Router v5**'s
  `NavLink` component (`activeClassName`, lowercased here because it's
  rendered into the DOM as a literal attribute) — **STRONG INFERENCE** of
  React Router v5.
- **Analytics:** Google Analytics 4 via raw `gtag.js` (`G-GQE2TFY87X`),
  hand-added rather than via a tag-management plugin (no Site Kit-style
  generator meta, unlike Iknite)
- **Scroll header behavior:** **Headroom.js** — confirmed by the exact
  class names `headroom-wrapper`, `headroom headroom--pinned
  headroom--scrolled`, which that library writes verbatim
- **Lazy-loading images:** **react-lazyload** — confirmed by the
  `lazyload-wrapper` wrapper class, which is that package's literal output
- **Icons:** mixed — Semantic UI-style icon markup (`<i class="home
  icon">`) for the nav home icon, plus an inline SVG (Material Design
  "menu" glyph path) for the hamburger — **STRONG INFERENCE**: Semantic UI
  React (or Fomantic UI CSS) for one icon, `react-icons` (or hand-copied
  Material Symbols SVG) for the other. Not a single consistent icon system.
- **Booking:** Calendly embed (confirmed — the widget's own CSS comment
  block is inlined: *"code is extracted from Calendly's embed
  stylesheet"*), likely via `react-calendly`
- **SEO:** structured data (`application/ld+json`, `ProfessionalService`
  schema) present but with a placeholder phone number
  (`+237XXXXXXXX`) left in — **CONFIRMED**, worth noting since it means
  the live schema markup is currently broken/fake data if unchanged
- **Interesting build artifact:** many block class names are prefixed
  `gpt__` (`gpt__blog`, `gpt__whatgpt-heading`, `gpt__brand`) alongside
  the site's own `ulev__` classes. This naming (`gpt__navbar`,
  `gpt__whatgpt`, `gpt__blog`, `gpt__brand`, etc.) is a very recognizable
  signature of a specific, widely-used React landing-page tutorial
  template ("GPT-3 landing page" boilerplate, popular in
  freeCodeCamp/JavaScript-Mastery-style tutorials). **STRONG INFERENCE**:
  Ulevus's site was very likely bootstrapped from that public tutorial
  template and then reskinned/renamed with `ulev__`-prefixed classes on
  top, rather than built from a from-scratch component system.

### 2.2 Page hierarchy (About page, as captured)

```
Page (React SPA)
├── Header (Headroom.js sticky/pinned nav)
│   ├── Logo
│   ├── Nav: Home(icon) · About · Work · Ideas · Contact
│   └── Hamburger icon (mobile)
├── "We believe in the quiet power of extraordinary design" (feature statement)
├── Full-width image (lazy-loaded, .avif format)
├── "Our Story" section (2 paragraphs)
├── divider
├── "FOUNDED IN" / brand-process statement
├── divider
├── "Our Values" section (2 paragraphs)
├── divider
├── 3-image row (about1/about2/about3, .jpg)
├── Feature statement ("Exceptional work is always intentional...")
├── "Our Creative Process" section (2 paragraphs)
├── divider
├── Team/mission statement
├── "Connect with us" / social CTA row
└── Footer
    ├── Address block (Terminus, Bonamoussadi, Douala, Cameroon)
    ├── Email (info@ulevus.com)
    ├── Social links: YouTube, Instagram, Twitter/X, Facebook, LinkedIn
    ├── Copyright bar (@2025)
    └── Large "ULEVUS" wordmark image (full-width footer signature)
```

Notably **no visible pricing, testimonials, or team-member grid on this
page** — this About page is copy-led (five short manifesto-style sections
separated by dividers and one feature image), not a component-heavy
layout. That's a real, confirmed structural observation independent of
styling.

### 2.3 What's genuinely unknown for Ulevus

Colors, exact fonts, spacing scale, border-radius, shadows, breakpoints,
and any hover/scroll animation *implementation* (beyond Headroom's
pin/unpin behavior) — none of this was in the captured file. If you want
Ulevus's actual visual system, the fastest fix is either (a) a fresh page
save using "Webpage, Complete" instead of "HTML only" so the browser pulls
down `main.a8bc8cfd.css` alongside it, or (b) a few screenshots.

---

## 3. studio.design

Not analyzed — no source was provided for this one and it's still blocked
by this session's network policy. Send a saved HTML (ideally "Webpage,
Complete", not "HTML only") or screenshots if you want it covered with the
same rigor as Iknite above.

---

## 4. What This Means For Your Site

A few evidence-backed takeaways worth carrying into your own design
tokens, given what's actually confirmed above:

1. **Dark-canvas-plus-one-loud-accent** (Iknite's `#1B011D` + `#FF015B`)
   reads as premium/confident in a way a light background rarely does for
   a "studio" brand — worth considering if "Designer. Strategist.
   Educator. Creative Leader." wants a bolder register than the current
   warm-neutral palette in `docs/WEBSITE-STRATEGY.md`.
2. **Serif display + sans body** (Marcellus + Outfit) is a distinctive,
   editorial pairing that a lot of design-studio sites use to feel less
   "SaaS." Your current system uses Space Grotesk for both — a geometric
   sans/serif split is a cheap, high-impact change if you want more
   distinction from generic portfolio sites.
3. **Grayscale→color image hover**, applied consistently across every
   image grid (services/portfolio/team), is a small CSS-only trick
   (`filter: grayscale()` + transition) that reads as much more
   deliberate than it is to build — a good, low-cost pattern to borrow.
4. **One accent color used exactly once, differently** (Iknite's lime
   `#C4EF17` footer-hover, distinct from the primary pink) is a
   restraint pattern worth copying: don't spread a secondary accent
   everywhere, save it for exactly one small, repeated moment.
5. Ulevus's confirmed structure (manifesto-style About page, short
   sections separated by dividers, no dense component grid) is a useful
   counter-example to Iknite's dense, widget-heavy homepage — if your
   own About page (already drafted per the strategy doc) feels too
   sparse or too busy, these two sit at opposite ends of a real spectrum
   to calibrate against.
