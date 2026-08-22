export interface TestimonialEntry {
  quote: string;
  name: string;
  role: string;
  project?: string;
}

export function Testimonial({ quote, name, role, project }: TestimonialEntry) {
  return (
    <figure className="rounded-2xl border border-line p-8">
      <blockquote className="text-lg leading-relaxed">&ldquo;{quote}&rdquo;</blockquote>
      <figcaption className="mt-6 text-sm text-muted">
        <span className="font-semibold text-ink">{name}</span> — {role}
        {project && <span className="block text-xs">{project}</span>}
      </figcaption>
    </figure>
  );
}
