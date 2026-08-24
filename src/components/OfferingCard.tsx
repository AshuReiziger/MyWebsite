export function OfferingCard({
  tag,
  title,
  description,
}: {
  tag: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-line p-8">
      <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
        {tag}
      </span>
      <h3 className="mt-4 font-display text-xl font-bold tracking-tight">{title}</h3>
      <p className="mt-2 text-muted">{description}</p>
    </div>
  );
}
