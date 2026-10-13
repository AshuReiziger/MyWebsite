export function StepProgress({ step, totalSteps, label }: { step: number; totalSteps: number; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-widest text-muted">
        Step {step} of {totalSteps} — {label}
      </span>
      <div className="h-1 flex-1 rounded-full bg-line">
        <div
          className="h-1 rounded-full bg-accent transition-all"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
}
