const STEPS = ["Think", "Create", "Design", "Lead", "Transform"];

export function ProcessStepper({ current = "Design" }: { current?: string }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4">
      {STEPS.map((step, i) => {
        const isCurrent = step === current;
        return (
          <div key={step} className="flex items-center gap-2">
            <span
              className={
                "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest " +
                (isCurrent
                  ? "bg-accent text-paper"
                  : "border border-line text-muted")
              }
            >
              {step}
            </span>
            {i < STEPS.length - 1 && (
              <span aria-hidden className="text-line">
                &rarr;
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
