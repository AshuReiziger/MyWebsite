"use client";

import { useEffect } from "react";

export function Modal({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-16"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="absolute inset-0 bg-black/55" onClick={onClose} aria-hidden />
      <div className="relative max-h-full w-full max-w-2xl overflow-y-auto rounded-[32px] bg-paper p-8 shadow-2xl md:p-10">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-6 top-6 text-2xl leading-none text-muted transition-colors hover:text-ink"
        >
          ×
        </button>
        <h2 className="font-display text-xl font-bold tracking-tight">{title}</h2>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
