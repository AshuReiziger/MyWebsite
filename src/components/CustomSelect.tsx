"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * A styleable replacement for a native <select> — used where the popup itself
 * needs a specific look (translucent background, rounded corners) that native
 * select popups render as OS/browser chrome and largely ignore CSS for.
 */
export function CustomSelect({
  name,
  options,
  placeholder,
  required,
  className,
  error,
  onChange,
}: {
  name: string;
  options: string[];
  placeholder: string;
  required?: boolean;
  className?: string;
  error?: boolean;
  onChange?: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <input
        ref={inputRef}
        type="text"
        name={name}
        value={value}
        required={required}
        aria-required={required}
        readOnly
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen((v) => !v);
          }
        }}
        className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />

      <div
        aria-hidden
        className={`flex items-center justify-between ${className} ${error ? "border-accent" : "border-line"}`}
      >
        <span className={value ? "" : "text-muted"}>{value || placeholder}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M2.5 4.5L6 8L9.5 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {open && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute inset-x-0 top-full z-20 max-h-60 overflow-auto rounded-b-2xl border border-t-0 border-line bg-paper/80 shadow-xl backdrop-blur-sm"
        >
          {options.map((option) => (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={value === option}
              onClick={() => {
                setValue(option);
                setOpen(false);
                inputRef.current?.focus();
                onChange?.(option);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-ink transition-colors hover:bg-ink/10"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
