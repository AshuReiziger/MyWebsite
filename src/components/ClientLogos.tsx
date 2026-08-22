// Placeholder client slots — replace each with a real client name (or swap
// this component for real logo images) once available.
const CLIENT_COUNT = 6;

export function ClientLogos() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
      {Array.from({ length: CLIENT_COUNT }, (_, i) => (
        <span
          key={i}
          className="font-display text-lg font-bold tracking-tight text-muted transition-colors hover:text-ink"
        >
          Client Name
        </span>
      ))}
    </div>
  );
}
