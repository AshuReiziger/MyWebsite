"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Fires a single tracked pageview on mount. Kept as its own tiny client component so pages that render it can stay server components. */
export function AnalyticsPageView({ event, properties }: { event: string; properties?: Record<string, unknown> }) {
  useEffect(() => {
    track(event, properties);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  return null;
}
