import Link from "next/link";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/think", label: "Think" },
  { href: "/build", label: "Build" },
  { href: "/teach", label: "Teach" },
  { href: "/contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  { href: "https://behance.net", label: "Behance" },
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://youtube.com", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="mt-32 border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-lg font-semibold tracking-tight">REIZIGER ASHU</p>
            <p className="mt-2 text-sm text-muted">Designer. Strategist. Educator. Creative Leader.</p>
            <p className="mt-1 text-sm text-muted">Designing ideas. Building systems. Creating impact.</p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:gap-16">
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <nav className="flex flex-col gap-2">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <p className="mt-16 text-xs text-muted">
          © {new Date().getFullYear()} Reiziger Ashu. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
