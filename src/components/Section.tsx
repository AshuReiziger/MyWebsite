import type { ReactNode } from "react";
import clsx from "clsx";
import { Reveal } from "@/components/Reveal";

export function Section({
  children,
  className,
  outerClassName,
  id,
}: {
  children: ReactNode;
  className?: string;
  /** Applied to a full-bleed outer wrapper (e.g. a background color that should span the viewport). */
  outerClassName?: string;
  id?: string;
}) {
  const inner = (
    <div
      className={clsx(
        "mx-auto max-w-[min(90%,1440px)] px-6 py-20 md:px-20 md:py-40",
        className
      )}
    >
      {children}
    </div>
  );

  if (outerClassName) {
    return (
      <section id={id} className={outerClassName}>
        {inner}
      </section>
    );
  }

  return (
    <section
      id={id}
      className={clsx("mx-auto max-w-[min(90%,1440px)] px-6 py-20 md:px-20 md:py-40", className)}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  divider = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  divider?: boolean;
}) {
  return (
    <Reveal className={clsx("max-w-2xl", centered && "mx-auto text-center")}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {divider && (
        <hr className={clsx("mt-6 w-16 border-line", centered && "mx-auto")} />
      )}
      {description && <p className="mt-4 text-lg text-muted">{description}</p>}
    </Reveal>
  );
}
