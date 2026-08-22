import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function DesignIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}

export function StrategyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  );
}

export function EducationIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l10 5-10 5L2 8l10-5z" />
      <path d="M6 10.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-5.5" />
    </svg>
  );
}

export function LeadershipIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" />
      <circle cx="17" cy="7" r="2.5" />
      <path d="M16 12.5c2.7 0.3 5 2.5 5 5.5" />
    </svg>
  );
}

export function CompassIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9l-2 6-6 2 2-6 6-2z" />
    </svg>
  );
}

export function WorkshopIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="8" cy="9" r="2.5" />
      <circle cx="16" cy="9" r="2.5" />
      <path d="M3 19c0-2.8 2.2-5 5-5s5 2.2 5 5" />
      <path d="M11 19c0-2.8 2.2-5 5-5s5 2.2 5 5" />
    </svg>
  );
}

export function MentorshipIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l9 4.5-9 4.5-9-4.5L12 3z" />
      <path d="M7 9.7V15c0 1.7 2.2 3 5 3s5-1.3 5-3V9.7" />
      <path d="M21 7.5V13" />
    </svg>
  );
}

export function ResourcesIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 2h9l3 3v17H6z" />
      <path d="M15 2v3h3" />
      <path d="M9 12h6M9 16h6" />
    </svg>
  );
}

export function PurposeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function ExcellenceIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.3 6.8 19l1-5.8-4.3-4.1 5.9-.9L12 3z" />
    </svg>
  );
}

export function CuriosityIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M21 21l-5.2-5.2" />
    </svg>
  );
}

export function IntegrityIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
    </svg>
  );
}

export function ImpactIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  );
}

export function StewardshipIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s-7-4.4-7-10V5l7-2 7 2v6c0 5.6-7 10-7 10z" />
      <path d="M9 11l2 2 4-4" />
    </svg>
  );
}

export function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
      {children}
    </span>
  );
}
