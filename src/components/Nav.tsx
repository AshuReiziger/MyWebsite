"use client";

import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/think", label: "Think" },
  { href: "/build", label: "Build" },
  { href: "/teach", label: "Teach" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight">
          REIZIGER ASHU
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-wide text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-ink px-5 py-2 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
          >
            Work With Me
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-sm font-medium uppercase tracking-wide md:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-line px-6 py-4 md:hidden">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium uppercase tracking-wide text-muted"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-ink px-5 py-2 text-center text-sm font-semibold uppercase tracking-wide text-paper"
          >
            Work With Me
          </Link>
        </nav>
      )}
    </header>
  );
}
