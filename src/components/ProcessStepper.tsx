const STEPS = ["Think", "Create", "Design", "Lead", "Transform"];

export function ProcessStepper({ current = "Design" }: { current?: string }) {
  return (
    <div className="rounded-2xl border border-line bg-paper p-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">The Process</p>
      <hr className="mt-4 border-line" />
      <ul className="mt-6 flex flex-col gap-5">
        {STEPS.map((step) => {
          const isCurrent = step === current;
          return (
            <li key={step} className="flex items-center gap-3">
              <span
                className={
                  "flex h-3 w-3 items-center justify-center rounded-full border-2 " +
                  (isCurrent ? "border-accent" : "border-line")
                }
              >
                <span
                  className={
                    "h-1.5 w-1.5 rounded-full " + (isCurrent ? "bg-accent" : "bg-line")
                  }
                />
              </span>
              <span className={isCurrent ? "font-semibold text-ink" : "text-muted"}>
                {step}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
