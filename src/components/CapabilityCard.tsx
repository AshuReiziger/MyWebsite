export interface Capability {
  title: string;
  description: string;
  tags: string[];
}

export function CapabilityCard({ title, description, tags }: Capability) {
  return (
    <div className="rounded-2xl border border-line p-8 transition-colors hover:border-ink">
      <h3 className="font-display text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-3 text-muted">{description}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-line px-3 py-1 text-xs uppercase tracking-wide text-muted"
          >
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}
