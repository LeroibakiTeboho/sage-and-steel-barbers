"use client";

import { useMemo, useState } from "react";
import {
  FiAlertCircle,
  FiCheck,
  FiDownload,
  FiExternalLink,
} from "react-icons/fi";
import {
  buildCalendarEvent,
  downloadIcsFile,
  googleCalendarUrl,
} from "@/lib/calendar";

export default function CalendarActions({ booking, compact = false }) {
  const [icsState, setIcsState] = useState("idle"); // idle | done | error
  const [errorMessage, setErrorMessage] = useState("");

  const event = useMemo(() => {
    try {
      return buildCalendarEvent(booking);
    } catch {
      return null;
    }
  }, [booking]);

  if (!event) {
    return (
      <div className="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-3.5 text-[0.78rem] text-red-800">
        <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <p>
          We couldn&apos;t build your calendar event. Please contact us on{" "}
          <a href="tel:+27214248817" className="font-semibold underline">
            +27 21 424 8817
          </a>{" "}
          and we&apos;ll sort it out.
        </p>
      </div>
    );
  }

  const googleUrl = googleCalendarUrl(event);

  const handleIcsDownload = () => {
    try {
      downloadIcsFile(event);
      setIcsState("done");
      setErrorMessage("");
      setTimeout(() => setIcsState("idle"), 3200);
    } catch {
      setIcsState("error");
      setErrorMessage(
        "Your browser blocked the download. Use the Google Calendar option, or check your download permissions.",
      );
    }
  };

  const buttonClass = compact
    ? "inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-[0.8rem] font-semibold transition-all"
    : "inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-[0.88rem] font-semibold transition-all";

  return (
    <div className="space-y-2.5">
      <a
        href={googleUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonClass} bg-mint text-ink-900 hover:bg-mint-600`}
      >
        <FiExternalLink className="h-4 w-4" aria-hidden="true" />
        Add to Google Calendar
      </a>

      <button
        type="button"
        onClick={handleIcsDownload}
        className={`${buttonClass} bg-ink text-cream hover:bg-ink-800`}
      >
        {icsState === "done" ? (
          <>
            <FiCheck className="h-4 w-4" aria-hidden="true" />
            Downloaded
          </>
        ) : (
          <>
            <FiDownload className="h-4 w-4" aria-hidden="true" />
            Add to Apple / Outlook Calendar
          </>
        )}
      </button>

      {icsState === "error" && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 p-3 text-[0.74rem] leading-relaxed text-red-800"
        >
          <FiAlertCircle
            className="mt-0.5 h-3.5 w-3.5 shrink-0"
            aria-hidden="true"
          />
          {errorMessage}
        </p>
      )}

      <p className="pt-1 text-center text-[0.68rem] leading-relaxed text-ink/45">
        The invite includes your service, barber, date, start and end time, and
        our Kloof Street address.
      </p>
    </div>
  );
}
