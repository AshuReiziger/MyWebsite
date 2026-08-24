import Link from "next/link";

export function OfferingCard({
  tag,
  title,
  description,
  href,
}: {
  tag: string;
  title: string;
  description: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
        {tag}
      </span>
      <h3 className="mt-4 font-display text-xl font-bold tracking-tight">{title}</h3>
      <p className="mt-2 text-muted">{description}</p>
      {href && (
        <span className="mt-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent">
          Learn More →
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group block rounded-2xl border border-line p-8 transition-colors hover:border-accent/50"
      >
        {content}
      </Link>
    );
  }

  return <div className="rounded-2xl border border-line p-8">{content}</div>;
}
