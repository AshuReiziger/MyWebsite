"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { NewsletterForm } from "@/components/NewsletterForm";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/think", label: "Think" },
  { href: "/build", label: "Build" },
  { href: "/teach", label: "Teach" },
  { href: "/contact", label: "Contact" },
];

// Instagram and YouTube are pending real handles — add them here once supplied
// rather than linking out to a generic platform homepage.
const SOCIAL_LINKS = [
  { href: "https://www.behance.net/ReizigerAshu", label: "Behance" },
  { href: "https://www.linkedin.com/in/reizigerashu", label: "LinkedIn" },
  { href: "https://web.facebook.com/reiziger.ashu/", label: "Facebook" },
];

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="mt-32 bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="border-b border-paper/10 pb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-paper/60">
            Newsletter
          </p>
          <p className="mt-2 max-w-sm text-sm text-paper/60">
            Occasional notes on design, strategy, and creative leadership — no spam.
          </p>
          <div className="mt-4">
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-lg tracking-tight">Reiziger Ashu</p>
            <p className="mt-3 text-sm text-paper/60">
              © {new Date().getFullYear()} Reiziger Ashu. Architecting intentional growth.
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:gap-16">
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "text-sm transition-colors hover:text-paper",
                    pathname === link.href ? "text-accent" : "text-paper/60"
                  )}
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
                  className="text-sm text-paper/60 transition-colors hover:text-paper"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
