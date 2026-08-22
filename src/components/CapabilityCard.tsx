import type { ReactNode } from "react";
import { IconBadge } from "@/components/icons";

export interface Capability {
  title: string;
  description: string;
  icon: ReactNode;
}

export function CapabilityCard({
  title,
  description,
  icon,
  index,
}: Capability & { index: number }) {
  return (
    <div className="rounded-2xl border border-line bg-paper p-8 transition-colors hover:border-accent/50">
      <div className="flex items-start justify-between">
        <IconBadge>{icon}</IconBadge>
        <span className="text-xs font-semibold text-line">
          {String(index).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-6 font-display text-xl font-bold tracking-tight">{title}</h3>
      <p className="mt-3 text-muted">{description}</p>
    </div>
  );
}
