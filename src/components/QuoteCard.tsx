import { QuoteIcon } from "@/components/icons";

export function QuoteCard({ quote, attribution }: { quote: string; attribution: string }) {
  return (
    <figure className="flex flex-col justify-center rounded-2xl border-l-2 border-accent bg-paper p-8">
      <QuoteIcon className="h-8 w-8 text-accent" />
      <blockquote className="mt-6 font-display text-2xl italic leading-snug">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 text-muted">— {attribution}</figcaption>
    </figure>
  );
}
