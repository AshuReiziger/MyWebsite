export interface TimelineEntry {
  period: string;
  title: string;
  description: string;
}

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative border-l border-line pl-8">
      {entries.map((entry) => (
        <li key={entry.period} className="mb-12 last:mb-0">
          <span className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            {entry.period}
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold tracking-tight">
            {entry.title}
          </h3>
          <p className="mt-2 text-muted">{entry.description}</p>
        </li>
      ))}
    </ol>
  );
}
