"use client";

import { useState, type FormEvent } from "react";
import { MENTORSHIP_TRACKS } from "@/content/mentorship";
import { PillToggle } from "@/components/PillToggle";

const HEARD_ABOUT_OPTIONS = ["Instagram", "Referral", "Sigma School", "Search", "Other"];

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "border-b border-line bg-transparent px-0 py-2 outline-none focus:border-ink";
const labelClass = "text-xs font-semibold uppercase tracking-widest text-ink";
const sectionClass = "text-xs font-semibold uppercase tracking-widest text-accent";

export function MentorshipApplicationForm({ initialTrackSlug }: { initialTrackSlug?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const initialTrack = MENTORSHIP_TRACKS.find((track) => track.slug === initialTrackSlug)?.title ?? "";
  const [trackedBefore, setTrackedBefore] = useState("");
  const [preferredFormat, setPreferredFormat] = useState("");
  const [preferredDelivery, setPreferredDelivery] = useState("");
  const [commitment, setCommitment] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/mentorship/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          mentorBefore: trackedBefore,
          preferredFormat,
          preferredDelivery,
          commitment,
        }),
      });

      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
      setTrackedBefore("");
      setPreferredFormat("");
      setPreferredDelivery("");
      setCommitment("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div>
        <h3 className="font-display text-2xl font-bold tracking-tight">
          Application received.
        </h3>
        <p className="mt-3 text-muted">
          Applications are reviewed within 5 business days. We&apos;ll follow up to confirm fit
          before any payment is requested.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <p className={sectionClass}>About You</p>
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
          <label className="flex flex-col gap-2">
            <span className={labelClass}>Current Role / Occupation</span>
            <input name="occupation" placeholder="What you do now" className={inputClass} />
          </label>
          <label className="flex flex-col gap-2 md:col-span-2">
            <span className={labelClass}>Portfolio or Work Samples</span>
            <input type="url" name="portfolio" placeholder="https://…" className={inputClass} />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <p className={sectionClass}>Your Goals</p>
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Which Track Are You Applying For?</span>
          <select name="track" defaultValue={initialTrack} className={inputClass}>
            <option value="">Select a track</option>
            {MENTORSHIP_TRACKS.map((track) => (
              <option key={track.slug} value={track.title}>
                {track.title}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className={labelClass}>Where Are You Right Now?</span>
          <textarea name="currentState" rows={3} className={inputClass} />
        </label>

        <label className="flex flex-col gap-2">
          <span className={labelClass}>What Do You Want to Be Different in 3 Months?</span>
          <textarea name="threeMonthGoal" rows={3} className={inputClass} />
        </label>

        <div className="flex flex-col gap-2">
          <span className={labelClass}>Have You Worked With a Mentor Before?</span>
          <PillToggle name="Worked with a mentor before" options={["Yes", "No"]} value={trackedBefore} onChange={setTrackedBefore} />
        </div>
        {trackedBefore === "Yes" && (
          <label className="flex flex-col gap-2">
            <span className={labelClass}>Tell Us About That Experience</span>
            <textarea name="mentorBeforeDetails" rows={3} className={inputClass} />
          </label>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <p className={sectionClass}>Logistics</p>
        <div className="flex flex-col gap-2">
          <span className={labelClass}>Preferred Format</span>
          <PillToggle
            name="Preferred format"
            options={["1:1", "Small group if available"]}
            value={preferredFormat}
            onChange={setPreferredFormat}
          />
        </div>

        <label className="flex flex-col gap-2">
          <span className={labelClass}>Preferred Cadence</span>
          <select name="cadence" defaultValue="" className={inputClass}>
            <option value="">Select a cadence</option>
            <option value="Weekly">Weekly</option>
            <option value="Biweekly">Biweekly</option>
          </select>
        </label>

        <div className="flex flex-col gap-2">
          <span className={labelClass}>Preferred Delivery</span>
          <PillToggle
            name="Preferred delivery"
            options={["Virtual", "In-person in Buea"]}
            value={preferredDelivery}
            onChange={setPreferredDelivery}
          />
        </div>

        <label className="flex flex-col gap-2">
          <span className={labelClass}>General Availability</span>
          <textarea
            name="availability"
            rows={2}
            placeholder="Days/times that usually work for you"
            className={inputClass}
          />
        </label>
      </div>

      <div className="flex flex-col gap-6">
        <p className={sectionClass}>Commitment</p>
        <div className="flex flex-col gap-2">
          <span className={labelClass}>Can You Commit to the Full Track Length?</span>
          <p className="text-sm text-muted">Tracks run 6–12 weeks.</p>
          <PillToggle
            name="Commitment"
            options={["Yes", "No", "Need to discuss"]}
            value={commitment}
            onChange={setCommitment}
          />
          <input type="hidden" name="commitmentValue" value={commitment} required />
        </div>

        <label className="flex flex-col gap-2">
          <span className={labelClass}>How Did You Hear About Sigma Studio?</span>
          <select name="heardAbout" defaultValue="" className={inputClass}>
            <option value="">Select an option</option>
            {HEARD_ABOUT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <button
          type="submit"
          disabled={status === "submitting" || !commitment}
          className="self-start rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === "submitting" ? "Sending…" : "Submit Application →"}
        </button>
        <p className="mt-3 text-sm text-muted">
          Applications are reviewed within 5 business days. We&apos;ll follow up to confirm fit
          before any payment is requested.
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
