"use client";

import { useRef, useState } from "react";
import { Modal } from "@/components/Modal";
import { MentorshipApplicationForm } from "@/components/MentorshipApplicationForm";

const AUTO_CLOSE_DELAY_MS = 3000;

export function ApplyMentorshipButton({
  trackSlug,
  label = "Apply for Mentorship →",
  className,
}: {
  trackSlug?: string;
  label?: string;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function close() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setIsOpen(false);
  }

  function handleSuccess() {
    closeTimeout.current = setTimeout(close, AUTO_CLOSE_DELAY_MS);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={
          className ??
          "mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90"
        }
      >
        {label}
      </button>
      <Modal isOpen={isOpen} onClose={close} title="Apply for Mentorship">
        <MentorshipApplicationForm initialTrackSlug={trackSlug} onSuccess={handleSuccess} />
      </Modal>
    </>
  );
}
