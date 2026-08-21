# Reiziger Ashu — Personal Website Strategy & Spec

Status: Draft v1
Owner: Reiziger Ashu
Last updated: 2026-08-21

This document is the single source of truth for the site's positioning, content, information architecture, and technical build plan. It exists so that design and development decisions trace back to a clear narrative instead of drifting into a generic portfolio.

---

## 1. Positioning

**Core statement:** Reiziger Ashu is a designer, strategist, educator, and creative leader who uses design to help people and organizations clarify identity, communicate ideas, and build systems for meaningful impact.

The site must answer five questions within seconds of landing:

| Question | Answer |
|---|---|
| Who are you? | A designer, strategist, educator, and creative leader. |
| What do you do? | Use design and strategic thinking to solve problems and create clarity. |
| What have you built? | Sigma Studio, Sigma Studio Academy, and various design/media/education/community initiatives. |
| What do you believe? | Good design doesn't just make things look better — it helps people see, understand, organize, and act better. |
| How can someone engage you? | Design/strategy work, consulting, training, speaking, collaboration, partnerships. |

**Headline title to use everywhere (nav, meta, footer):** "Designer. Strategist. Educator. Creative Leader." — never "Graphic Designer" as the primary title.

**Hero copy — two variants to A/B or choose between:**

- *Straightforward:* "REIZIGER ASHU — Designer. Strategist. Educator. Creative Leader. I use design to spark identity, clarify ideas, and build systems that move people and organizations toward meaningful impact."
- *Provocative (preferred):* "I DON'T JUST DESIGN THINGS. I DESIGN WHAT THEY CAN BECOME." followed by the intro paragraph and two CTAs: `Explore my work →` / `Work with me →`

**Site-wide narrative arc** (used to sequence the homepage and overall flow):

```
01 WHO I AM        → Reiziger Ashu
02 WHAT I BELIEVE  → Design is a tool for transformation
03 WHAT I DO       → Design · Strategy · Education · Leadership
04 WHAT I'VE BUILT → Sigma Studio · Academy · Projects
05 WHAT I THINK    → Ideas, frameworks, writings
06 WHAT I CAN DO   → Consulting · Design · Training · Speaking
07 LET'S BUILD     → Contact / Collaboration
```

The site should feel like a journey (meet me → understand me → see my work → discover my ideas → see what I'm building → find a way to participate), not a browsable portfolio.

---

## 2. Information Architecture & Navigation

**Primary nav:**

```
HOME · ABOUT · WORK · THINK · BUILD · TEACH · CONTACT      [WORK WITH ME] (persistent CTA button)
```

**Route map (for implementation):**

| Route | Page | Content type |
|---|---|---|
| `/` | Home | Static, hero + all 4 capability areas + build/think teasers |
| `/about` | About | Static, story-driven timeline |
| `/work` | Work index | List of case studies |
| `/work/[slug]` | Case study | MDX (Challenge → Insight → Strategy → Design → Impact) |
| `/think` | Think index | Blog list, filterable by category |
| `/think/[slug]` | Article | MDX |
| `/build` | Build | Static — Sigma Studio, Academy, other initiatives |
| `/teach` | Teach | Static — training/workshops/mentorship, links into Academy |
| `/contact` | Contact | Form with project-type routing |

---

## 3. Page Content Specs

### 3.1 Home

**Hero**
- H1: `REIZIGER ASHU`
- Subhead: `Designer. Strategist. Educator. Creative Leader.`
- Body: `I use design to spark identity, clarify ideas, and build systems that move people and organizations toward meaningful impact.`
- CTAs: `EXPLORE MY WORK` (→ `/work`), `LET'S WORK TOGETHER` (→ `/contact`)

**What I Do** — four capability cards, each with a heading, one-paragraph description, and a tag list:

1. **DESIGN** — "I create visual identities, communication systems, digital experiences, and strategic design solutions that help ideas become clear, compelling, and memorable." Tags: Brand Identity, Graphic Design, Art Direction, Visual Communication, Digital Design.
2. **STRATEGY** — "I help individuals and organizations move from scattered ideas to clearer direction, stronger positioning, and practical systems." Tags: Brand Strategy, Creative Strategy, Design Strategy, Systems Thinking, Consultation.
3. **EDUCATION** — "I teach creatives how to move beyond software proficiency and develop the thinking, discipline, systems, and professional skills required to thrive." Tags: Design Training, Creative Development, Workshops, Mentorship, Professional Development. (Introduces Sigma Studio Academy.)
4. **LEADERSHIP** — "I develop creative teams, media units, and communities by building cultures that encourage excellence, growth, initiative, collaboration, and purpose." Tags: Creative Leadership, Team Development, Media Leadership, Volunteer Development, Organizational Culture.

Below that: a "Build" teaser (Sigma Studio + Academy cards linking to `/build`), a "Think" teaser (3 latest articles linking to `/think`), a testimonials strip, and the closing CTA block reused from Contact.

### 3.2 About

Heading: `THE DESIGNER BEHIND THE WORK`

Opening narrative (verbatim, to keep the voice):

> I didn't begin designing because I wanted to make things look good. I began because I became fascinated by the power of ideas. An idea can remain invisible until someone gives it language. A vision can remain confusing until someone gives it structure. An organization can struggle to communicate its value until someone helps it discover its identity. That's what design became for me. A way of making invisible things visible.

**Journey timeline:**

- **2021 — The Beginning** — Started design career.
- **2022–2023 — The Craft** — Developing technical excellence and a design voice.
- **2023–2024 — The Strategist** — Moving from producing graphics to understanding brands, people, communication, and systems.
- **2024–2025 — The Builder** — Developing Sigma Studio; expanding into training, consulting, and systems.
- **2026 → The Transformation** — Building a broader ecosystem around design, education, leadership, and national transformation.

**Philosophy block** (can live on About or its own section, cross-linked from Home):

Heading: `DESIGN IS MORE THAN AESTHETICS.`

> I believe design is a tool for understanding. It helps us discover identity, communicate vision, solve problems, organize complexity, and create experiences that move people. The best design doesn't simply attract attention. It creates clarity. It creates connection. It creates movement.

Framework (a strong visual/graphic treatment): `THINK → CREATE → DESIGN → LEAD → TRANSFORM`

**Values block** — `WHAT GUIDES MY WORK`: Purpose, Excellence, Curiosity, Integrity, Impact, Stewardship (one line each, as in the source brief).

### 3.3 Work

Heading: `SELECTED WORK`
Intro: "A collection of identities, campaigns, systems, experiences, and creative solutions built for people and organizations with something meaningful to communicate."

Each case study (MDX, frontmatter-driven) follows a fixed 5-part structure:

1. **The Challenge** — what problem existed
2. **The Insight** — what was discovered
3. **The Strategy** — what direction was established
4. **The Design** — what was created (image/gallery-heavy)
5. **The Impact** — what changed

Case study frontmatter fields: `title, client, year, category, coverImage, summary, challenge, insight, strategy, impact` (body content also allows embedded image galleries via MDX components).

### 3.4 Build

Heading: `I DON'T ONLY WORK ON PROJECTS. I BUILD PLATFORMS.`

- **Sigma Studio** — "Creative Consultancy & Design Studio. A design-driven creative studio helping organizations clarify their identity, communicate their vision, and build meaningful brands." CTA: `VISIT SIGMA STUDIO →`
- **Sigma Studio Academy** — "Developing the next generation of strategic designers. An educational platform equipping creatives with technical excellence, strategic thinking, entrepreneurial competence, ethical leadership, and purpose-driven character." CTA: `EXPLORE THE ACADEMY →`
- **Other Initiatives** — extensible grid/list: community projects, church media initiatives, design education projects, national development projects, fellowships, research, creative experiments.

### 3.5 Think

Heading: `THINGS I'M THINKING ABOUT`

Categories (used as filter tags on the index): Design, Identity, Systems, Leadership, Creativity, Transformation.

Standard blog index + article template (MDX): title, date, category, excerpt, cover image, body.

### 3.6 Teach

Heading: `I BELIEVE KNOWLEDGE SHOULD MULTIPLY.`

> Everything I learn shouldn't end with me. Part of my work is helping other creatives develop the thinking, skills, systems, and character required to use their gifts meaningfully.

Offerings grid: Design Training, Workshops, Mentorship, Speaking, Resources. CTA: `LEARN WITH ME →`

**Speaking/training sub-section** — `INVITE ME TO SPEAK`, topic list (Design & Visual Communication, Strategic Creativity, Building Systems Around Your Skill, Creative Leadership, The Thriving Designer, Designing for Transformation, Identity & Purpose, Building Creative Teams, Media & Creative Ministry). CTA: `BOOK A SESSION` (routes into Contact with "Speaking" pre-selected).

### 3.7 Testimonials (component, reused on Home/Work/Teach)

Heading: `WORDS FROM PEOPLE I'VE WORKED WITH`
Each entry: name, role/organization, project, quote — ideally linked to the relevant case study.

### 3.8 Contact

Heading: `HAVE AN IDEA WORTH BUILDING?`
Intro: "Whether you're developing a brand, solving a communication problem, building a creative team, or exploring an idea that needs structure, I'd love to hear about it."

Form fields: name, email, project type (select: Design Project / Strategy / Consulting / Training / Workshop / Speaking / Collaboration / Other), message. Submit CTA: `START A CONVERSATION →`

### 3.9 Footer

```
REIZIGER ASHU
Designer. Strategist. Educator. Creative Leader.
Designing ideas. Building systems. Creating impact.

About · Work · Think · Build · Teach · Contact
Behance · LinkedIn · Instagram · YouTube

© 2026 Reiziger Ashu. All rights reserved.
```

---

## 4. Technical Architecture

**Decision record:**

| Concern | Decision | Rationale |
|---|---|---|
| Framework | Next.js (App Router), TypeScript | Content-heavy today, but Build/Teach imply a future Academy platform (courses, auth, dashboards) — Next.js scales into that without a rewrite. |
| Styling | Tailwind CSS | Fast iteration, easy to encode a strict type/spacing system for the brand. |
| Content | MDX files in the repo (`/content/work/*.mdx`, `/content/think/*.mdx`) | Git-versioned, no CMS subscription, case studies and articles are structured enough for frontmatter + MDX body. |
| Motion | Framer Motion | Needed for the scroll-driven narrative arc (Section 1) and the THINK→CREATE→DESIGN→LEAD→TRANSFORM framework animation. |
| Forms | Next.js Route Handler → email provider (e.g. Resend) or a form service (Formspree) as a fallback | Keep contact form serverless-simple; no database needed at this stage. |
| Hosting | Vercel | Zero-config for Next.js, previews per branch/PR, free tier sufficient for launch. |
| Images | `next/image` + local `/public` assets initially | Revisit a media CDN only if the Work/Build galleries grow large. |

**Directory sketch:**

```
/app
  /(site)/page.tsx            → Home
  /(site)/about/page.tsx
  /(site)/work/page.tsx
  /(site)/work/[slug]/page.tsx
  /(site)/think/page.tsx
  /(site)/think/[slug]/page.tsx
  /(site)/build/page.tsx
  /(site)/teach/page.tsx
  /(site)/contact/page.tsx
  /api/contact/route.ts
/content
  /work/*.mdx
  /think/*.mdx
/components
  Hero, CapabilityCard, Timeline, FrameworkDiagram, CaseStudyLayout, Testimonial, ContactForm, Footer, Nav
/lib
  mdx.ts (content loading/parsing helpers)
```

**Not in scope for v1:** headless CMS, user auth, payments/courses for the Academy, multi-language support. These are natural v2+ additions once the Academy platform is scoped separately.

---

## 5. Build Roadmap (Phased)

1. **Scaffold** — Next.js + TypeScript + Tailwind project, base layout, nav, footer, design tokens (type scale, color, spacing) derived from the brand voice above.
2. **Static pages** — Home, About, Build, Teach, Contact (with working form) using placeholder copy from this doc.
3. **Content system** — MDX pipeline for Work case studies and Think articles; seed with 1–2 real or placeholder entries each.
4. **Polish** — Framer Motion transitions, the THINK→CREATE→DESIGN→LEAD→TRANSFORM framework visual, testimonials component, responsive/accessibility pass.
5. **Launch prep** — SEO metadata, OG images, analytics, custom domain on Vercel.

---

## 6. Open Items

- [ ] Confirm final hero variant (straightforward vs. provocative).
- [ ] Supply real project assets/case studies for `/work`.
- [ ] Supply real testimonials (name, role, project, quote).
- [ ] Confirm social links (Behance, LinkedIn, Instagram, YouTube handles).
- [ ] Confirm domain name for Vercel deployment.
