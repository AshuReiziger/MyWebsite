"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, ReactNode } from "react";

export const WIP_RETURN_PATH_KEY = "wip-return-path";

export function WorkInProgressLink({
  children,
  className,
}: {
  children: ReactNode;
  className?: AnchorHTMLAttributes<HTMLAnchorElement>["className"];
}) {
  const pathname = usePathname();

  return (
    <Link
      href="/work-in-progress"
      className={className}
      onClick={() => {
        try {
          sessionStorage.setItem(WIP_RETURN_PATH_KEY, pathname);
        } catch {
          // sessionStorage unavailable (e.g. private mode) — the WIP page
          // falls back to the home page in that case.
        }
      }}
    >
      {children}
    </Link>
  );
}
