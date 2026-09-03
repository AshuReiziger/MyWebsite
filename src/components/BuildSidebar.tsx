"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  HomeIcon,
  PersonIcon,
  BriefcaseIcon,
  LightbulbIcon,
  BuildingIcon,
  EducationIcon,
} from "@/components/icons";

const SIDEBAR_LINKS = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/about", label: "About", icon: PersonIcon },
  { href: "/work", label: "Work", icon: BriefcaseIcon },
  { href: "/think", label: "Think", icon: LightbulbIcon },
  { href: "/build", label: "Build", icon: BuildingIcon },
  { href: "/teach", label: "Teach", icon: EducationIcon },
];

export function BuildSidebar() {
  const pathname = usePathname();

  return (
    <aside className="md:sticky md:top-24 md:self-start">
      <div className="flex items-center gap-3">
        <div className="h-14 w-14 shrink-0 rounded-xl bg-gradient-to-br from-accent/60 to-paper" />
        <div>
          <p className="font-display text-base tracking-tight">Reiziger Ashu</p>
          <p className="text-sm text-muted">Designer &amp; Strategist</p>
        </div>
      </div>

      <nav className="mt-8 flex flex-col gap-1">
        {SIDEBAR_LINKS.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                active ? "bg-accent/10 font-semibold text-ink" : "text-muted hover:text-ink"
              )}
            >
              <Icon className="h-5 w-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/contact"
        className="mt-8 block rounded-lg bg-accent/10 px-4 py-3 text-center text-sm font-semibold text-ink transition-colors hover:bg-accent/20"
      >
        Contact
      </Link>
    </aside>
  );
}
