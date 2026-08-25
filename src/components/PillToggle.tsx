"use client";

import clsx from "clsx";

const pillClass = (active: boolean) =>
  clsx(
    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
    active
      ? "bg-ink text-paper"
      : "border border-line text-muted hover:border-ink hover:text-ink"
  );

/** Single-select radio group rendered as pill buttons, matching the site's filter-pill pattern. */
export function PillToggle({
  options,
  value,
  onChange,
  name,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  name: string;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={name}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={value === option}
          onClick={() => onChange(option)}
          className={pillClass(value === option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

/** Multi-select checkbox group rendered as pill buttons. */
export function PillMultiToggle({
  options,
  values,
  onChange,
  name,
}: {
  options: string[];
  values: string[];
  onChange: (values: string[]) => void;
  name: string;
}) {
  function toggle(option: string) {
    onChange(values.includes(option) ? values.filter((v) => v !== option) : [...values, option]);
  }

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={name}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={values.includes(option)}
          onClick={() => toggle(option)}
          className={pillClass(values.includes(option))}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
