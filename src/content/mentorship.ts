export interface MentorshipWorkPoint {
  title: string;
  description: string;
}

export interface MentorshipFormat {
  duration: string;
  format: string;
  cadence: string;
  delivery: string;
  investment: string;
}

export interface MentorshipDetail {
  slug: string;
  title: string;
  subhead: string;
  whyBody: string;
  whatWellWorkOn: MentorshipWorkPoint[];
  format: MentorshipFormat;
  whoItsFor: string;
  walkAwayWith: string;
}

export const MENTORSHIP_TRACKS: MentorshipDetail[] = [
  {
    slug: "career-development",
    title: "Career Development",
    subhead: "Guidance on where your creative career is headed — and how to get there with intention, not luck.",
    whyBody:
      "Most creative careers drift instead of being directed — designers take whatever work comes rather than building toward something specific. This track pairs you with a mentor to map out where you actually want to go, and make deliberate moves toward it.",
    whatWellWorkOn: [
      {
        title: "Where You Actually Stand",
        description: "An honest read of your current stage, strengths, and gaps.",
      },
      {
        title: "Setting a Real Direction",
        description: "Defining what \"next\" actually means for you, not a vague ambition.",
      },
      {
        title: "Closing the Gap",
        description:
          "The specific skills, experience, or relationships standing between you and that next stage.",
      },
      {
        title: "Accountability & Momentum",
        description: "Regular check-ins that keep the plan moving, not just discussed once and forgotten.",
      },
    ],
    format: {
      duration: "3-month track (renewable)",
      format: "1:1 sessions",
      cadence: "Biweekly, 60 minutes",
      delivery: "Virtual or in-person in Buea",
      investment: "50,000 FCFA for the full track",
    },
    whoItsFor:
      "Designers and creatives who feel stuck or directionless, even if they're busy; anyone facing a real decision point (specialize vs. generalize, employed vs. freelance, stay vs. move).",
    walkAwayWith:
      "A written, personalized career plan with concrete next steps, and a mentor relationship to hold you to it.",
  },
  {
    slug: "portfolio-building",
    title: "Portfolio Building",
    subhead: "Hands-on feedback to shape a portfolio that shows range, judgment, and results — not just pretty pictures.",
    whyBody:
      "A portfolio full of good individual pieces can still fail to get someone hired, because the story connecting the pieces is missing. This track works through your actual portfolio, project by project, until it's doing real work for you.",
    whatWellWorkOn: [
      {
        title: "Auditing What You Have",
        description: "An honest review against what hiring managers and clients actually look for.",
      },
      {
        title: "Choosing What Stays",
        description: "Deciding which projects earn a place, and which are quietly working against you.",
      },
      {
        title: "Building the Case Studies",
        description: "Turning finished visuals into case studies that show process, not just outcomes.",
      },
      {
        title: "Presentation & Positioning",
        description: "Tightening how the portfolio is framed, from homepage to first sentence.",
      },
    ],
    format: {
      duration: "6-week track",
      format: "1:1 sessions",
      cadence: "Weekly, 45 minutes",
      delivery: "Virtual or in-person",
      investment: "40,000 FCFA for the full track",
    },
    whoItsFor:
      "Designers actively job-hunting or pursuing new clients; students nearing the end of a design program who need one clear-eyed review.",
    walkAwayWith:
      "A finished, reviewed portfolio with real case studies, and a mentor's eye on the parts you couldn't see for yourself.",
  },
  {
    slug: "professional-practice",
    title: "Professional Practice",
    subhead: "Support in building the habits, workflows, and standards of a working professional.",
    whyBody:
      "The gap between \"talented\" and \"professional\" is rarely about skill — it's about the habits around the skill: deadlines, feedback, communication, follow-through. This track builds those habits deliberately, not by accident.",
    whatWellWorkOn: [
      {
        title: "Where the Gaps Are",
        description: "An honest look at where habits, not talent, are holding you back.",
      },
      {
        title: "Workflow & Reliability",
        description: "Simple systems for meeting deadlines and managing multiple projects.",
      },
      {
        title: "Communication Under Pressure",
        description: "Handling feedback, pushback, and difficult conversations professionally.",
      },
      {
        title: "Standards & Consistency",
        description: "Defining what \"professional quality\" means for your own work, consistently.",
      },
    ],
    format: {
      duration: "8-week track",
      format: "1:1, with an optional small-group option (up to 3)",
      cadence: "Biweekly, 60 minutes",
      delivery: "Virtual or in-person",
      investment: "35,000 FCFA per person (small-group rate: 25,000 FCFA per person)",
    },
    whoItsFor:
      "Early-career creatives whose talent outpaces their professional habits; freelancers whose reputation has taken a hit from missed deadlines or inconsistent communication.",
    walkAwayWith:
      "Concrete systems for managing your workload and client relationships, tested over 8 real weeks, not just discussed in theory.",
  },
  {
    slug: "creative-business",
    title: "Creative Business",
    subhead: "Guidance on pricing, contracts, and running a creative practice like a real business.",
    whyBody:
      "Most creatives learn to make things beautifully and never learn to run the business around it — which is why so many talented people struggle to earn a sustainable living from their skill. This track pairs you with a mentor to build the business side deliberately.",
    whatWellWorkOn: [
      {
        title: "Pricing With Confidence",
        description: "Moving from guesswork to a pricing model you can defend.",
      },
      {
        title: "Contracts & Protection",
        description: "Putting agreements in place that protect your time and your work.",
      },
      {
        title: "Client Systems",
        description: "A repeatable process for intake, delivery, and getting paid on time.",
      },
      {
        title: "Growing Sustainably",
        description: "Planning how the practice grows without you burning out to do it.",
      },
    ],
    format: {
      duration: "3-month track (renewable)",
      format: "1:1 sessions",
      cadence: "Biweekly, 60 minutes",
      delivery: "Virtual or in-person",
      investment: "75,000 FCFA for the full track",
    },
    whoItsFor:
      "Freelance and independent creatives pricing reactively or inconsistently; anyone ready to treat their creative practice as a real business, not a side hustle.",
    walkAwayWith:
      "A working pricing model, a contract you actually use, and a mentor who's checked your numbers against reality.",
  },
  {
    slug: "personal-positioning",
    title: "Personal Positioning",
    subhead: "Help defining your creative point of view — and how you want to be known in the industry.",
    whyBody:
      "Being talented and being known for something specific are different achievements. This track helps you find and articulate the creative point of view that makes you memorable, not just competent.",
    whatWellWorkOn: [
      {
        title: "Finding Your Throughline",
        description: "Identifying what actually connects your best work, even if it doesn't feel obvious yet.",
      },
      {
        title: "Naming Your Point of View",
        description: "Putting language to what makes your creative perspective distinct.",
      },
      {
        title: "Where It Shows Up",
        description: "Aligning your portfolio, bio, and public presence around that positioning.",
      },
      {
        title: "Saying It Out Loud",
        description: "Practicing how to talk about your work and yourself with confidence, not apology.",
      },
    ],
    format: {
      duration: "6-week track",
      format: "1:1 sessions",
      cadence: "Weekly, 45 minutes",
      delivery: "Virtual or in-person",
      investment: "45,000 FCFA for the full track",
    },
    whoItsFor:
      "Creatives who feel like \"a generalist who does a bit of everything\" and want a sharper identity; anyone preparing for a bigger stage — speaking, teaching, a personal brand launch.",
    walkAwayWith:
      "A clear personal positioning statement, and a consistent way of presenting yourself across portfolio, bio, and conversation.",
  },
  {
    slug: "building-systems",
    title: "Building Systems Around Your Skill",
    subhead: "Support turning individual talent into a structured, repeatable, and scalable way of working.",
    whyBody:
      "Talent alone doesn't scale — it depends entirely on your hours and your memory. This track works alongside you to design the systems (intake, delivery, pricing, growth) that let your practice run on more than willpower.",
    whatWellWorkOn: [
      {
        title: "Diagnosing the Bottleneck",
        description: "Finding exactly where inconsistency is costing you time, money, or quality.",
      },
      {
        title: "Designing the System",
        description: "Building a documented, repeatable process for the area that needs it most.",
      },
      {
        title: "Testing It Live",
        description: "Running the new system on a real project during the mentorship, not just on paper.",
      },
      {
        title: "Scaling It",
        description: "Adapting the system so it still works once you're not the only person running it.",
      },
    ],
    format: {
      duration: "8-week track",
      format: "1:1 sessions",
      cadence: "Biweekly, 60 minutes",
      delivery: "Virtual or in-person",
      investment: "50,000 FCFA for the full track",
    },
    whoItsFor:
      "Independent creatives and small studio owners whose quality still depends on who's having a good day; anyone using the Building a System Around Your Skill guide who wants a mentor to help implement it.",
    walkAwayWith:
      "At least one fully built and tested system for your practice, plus the habit of building the next one yourself.",
  },
];

export function getMentorshipTrackBySlug(slug: string): MentorshipDetail | null {
  return MENTORSHIP_TRACKS.find((track) => track.slug === slug) ?? null;
}
