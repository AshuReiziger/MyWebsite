export interface TimelineEntry {
  period: string;
  title: string;
  description: string;
}

export function Timeline({
  entries,
  current,
}: {
  entries: TimelineEntry[];
  /** period of the entry to highlight as the current node (defaults to the first entry) */
  current?: string;
}) {
  const currentPeriod = current ?? entries[0]?.period;

  return (
    <ol className="relative border-l border-line pl-8">
      {entries.map((entry, i) => {
        const isCurrent = entry.period === currentPeriod;
        const isLast = i === entries.length - 1;
        return (
          <li key={entry.period} className="mb-12 last:mb-0">
            <span
              className={
                "absolute -left-[9px] mt-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 bg-paper " +
                (isCurrent ? "border-accent" : "border-line")
              }
            >
              <span
                className={"h-1.5 w-1.5 rounded-full " + (isCurrent ? "bg-accent" : "bg-line")}
              />
            </span>
            <p
              className={
                "text-sm font-semibold uppercase tracking-widest " +
                (isCurrent ? "text-accent" : "text-muted")
              }
            >
              {entry.period}
            </p>
            <h3 className="mt-1 font-display text-xl font-bold tracking-tight">{entry.title}</h3>
            <p className={"mt-2 " + (isLast ? "italic text-muted/80" : "text-muted")}>
              {entry.description}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
