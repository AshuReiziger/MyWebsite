"use client";

import { useState, type FormEvent } from "react";
import { WORKSHOPS } from "@/content/workshops";
import { PillToggle, PillMultiToggle } from "@/components/PillToggle";

const DISCOUNT_OPTIONS = [
  "Early Bird — booking 2+ weeks ahead",
  "Group of 4+",
  "Sigma School student or alumni",
];

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "border-b border-line bg-transparent px-0 py-2 outline-none focus:border-ink";
const labelClass = "text-xs font-semibold uppercase tracking-widest text-ink";
const sectionClass = "text-xs font-semibold uppercase tracking-widest text-accent";

export function WorkshopBookingForm({ initialWorkshopSlug }: { initialWorkshopSlug?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const initialWorkshop = WORKSHOPS.find((workshop) => workshop.slug === initialWorkshopSlug)?.title ?? "";
  const [workshop, setWorkshop] = useState(initialWorkshop);
  const [format, setFormat] = useState("");
  const [bookingType, setBookingType] = useState("");
  const [seats, setSeats] = useState(1);
  const [discounts, setDiscounts] = useState<string[]>([]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/workshops/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          workshop,
          format,
          bookingType,
          seats,
          discounts,
        }),
      });

      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
      setFormat("");
      setBookingType("");
      setSeats(1);
      setDiscounts([]);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div>
        <h3 className="font-display text-2xl font-bold tracking-tight">Booking request sent.</h3>
        <p className="mt-3 text-muted">
          You&apos;ll receive a confirmation email with payment details and next steps within 1
          business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <p className={sectionClass}>Workshop Selection</p>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Which Workshop?</span>
          <select
            required
            value={workshop}
            onChange={(event) => setWorkshop(event.target.value)}
            className={inputClass}
          >
            <option value="" disabled>
              Select a workshop
            </option>
            {WORKSHOPS.map((item) => (
              <option key={item.slug} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className={labelClass}>Preferred Date</span>
          <input type="date" name="preferredDate" required className={inputClass} />
          <p className="text-sm text-muted">
            No fixed calendar yet — pick your ideal date and we&apos;ll confirm availability.
          </p>
        </label>

        <div className="flex flex-col gap-2">
          <span className={labelClass}>Format</span>
          <PillToggle name="Format" options={["In-person in Buea", "Virtual"]} value={format} onChange={setFormat} />
        </div>

        <label className="flex flex-col gap-2">
          <span className={labelClass}>Number of Seats</span>
          <input
            type="number"
            name="seats"
            min={1}
            required
            value={seats}
            onChange={(event) => setSeats(Math.max(1, Number(event.target.value) || 1))}
            className={`${inputClass} w-24`}
          />
        </label>
      </div>

      <div className="flex flex-col gap-6">
        <p className={sectionClass}>Booking Type</p>
        <div className="flex flex-col gap-2">
          <span className={labelClass}>Individual or Group/Organization Booking?</span>
          <PillToggle
            name="Booking type"
            options={["Individual", "Group/Organization"]}
            value={bookingType}
            onChange={setBookingType}
          />
        </div>
        {bookingType === "Group/Organization" && (
          <label className="flex flex-col gap-2">
            <span className={labelClass}>Organization Name</span>
            <input name="organizationName" className={inputClass} />
          </label>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <p className={sectionClass}>Contact Details</p>
        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className={labelClass}>Full Name</span>
            <input name="fullName" required placeholder="Your name" className={inputClass} />
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelClass}>Email</span>
            <input type="email" name="email" required placeholder="you@domain.com" className={inputClass} />
          </label>
          <label className="flex flex-col gap-2">
            <span className={labelClass}>Phone / WhatsApp</span>
            <input type="tel" name="phone" required placeholder="+237 …" className={inputClass} />
          </label>
        </div>
      </div>

      {seats > 1 && (
        <div className="flex flex-col gap-6">
          <p className={sectionClass}>Participant Details</p>
          <label className="flex flex-col gap-2">
            <span className={labelClass}>Names of Additional Participants</span>
            <textarea name="additionalParticipants" rows={3} className={inputClass} />
          </label>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <span className={labelClass}>Discount Eligibility</span>
        <PillMultiToggle name="Discount eligibility" options={DISCOUNT_OPTIONS} values={discounts} onChange={setDiscounts} />
      </div>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>Anything We Should Know Ahead of the Session?</span>
        <textarea
          name="notes"
          rows={3}
          placeholder="Accessibility needs, specific interests…"
          className={inputClass}
        />
      </label>

      <div>
        <button
          type="submit"
          disabled={status === "submitting" || !workshop || !bookingType}
          className="self-start rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === "submitting" ? "Sending…" : "Confirm Booking →"}
        </button>
        <p className="mt-3 text-sm text-muted">
          You&apos;ll receive a confirmation email with payment details and next steps within 1
          business day.
        </p>
        {status === "error" && (
          <p role="alert" className="mt-3 text-sm text-accent">
            Something went wrong sending that — please try again in a moment.
          </p>
        )}
      </div>
    </form>
  );
}
