const STEPS = ["Think", "Create", "Design", "Lead", "Transform"];

export function FrameworkDiagram() {
  return (
    <div className="flex flex-wrap items-center gap-3 md:gap-4">
      {STEPS.map((step, index) => (
        <div key={step} className="flex items-center gap-3 md:gap-4">
          <span className="font-display text-2xl font-semibold tracking-tight md:text-4xl">
            {step.toUpperCase()}
          </span>
          {index < STEPS.length - 1 && (
            <span aria-hidden className="text-2xl text-accent md:text-4xl">
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
