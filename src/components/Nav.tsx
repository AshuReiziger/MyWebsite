"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/think", label: "Think" },
  { href: "/build", label: "Build" },
  { href: "/teach", label: "Teach" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (href: string) =>
    clsx(
      "text-sm font-medium uppercase tracking-wide transition-colors hover:text-ink",
      pathname === href ? "text-accent" : "text-muted"
    );

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg tracking-tight">
          Reiziger Ashu
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-full bg-ink px-5 py-2 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90 md:inline-block"
        >
          Work With Me
        </Link>

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
              className={clsx("py-2", linkClass(link.href))}
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
