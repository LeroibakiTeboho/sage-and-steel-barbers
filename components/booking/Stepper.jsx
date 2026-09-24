"use client";

import { FiCheck } from "react-icons/fi";
import { cx } from "@/lib/utils";

/**
 * Short labels shown on mobile, where each step button is ~70px wide.
 * Falls back to the full label when no short version exists.
 */
const SHORT_LABELS = {
  "Date & time": "Date",
  Confirmed: "Done",
};

function getShortLabel(label) {
  return SHORT_LABELS[label] ?? label;
}

export default function Stepper({ steps, current, onStepClick, maxReached }) {
  return (
    <ol
      className="flex items-stretch gap-1.5 sm:gap-2"
      aria-label="Booking progress"
    >
      {steps.map((rawStep, index) => {
        // Accept either plain strings or `{ label, shortLabel }` objects
        const label = typeof rawStep === "string" ? rawStep : rawStep.label;
        const shortLabel =
          typeof rawStep === "string"
            ? getShortLabel(rawStep)
            : (rawStep.shortLabel ?? getShortLabel(rawStep));

        const isDone = index < current;
        const isCurrent = index === current;
        const canJump = index <= maxReached && !isCurrent;

        const statusWord = isDone
          ? "completed"
          : isCurrent
            ? "current"
            : "upcoming";

        return (
          <li
            key={label}
            className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2"
          >
            <button
              type="button"
              onClick={() => canJump && onStepClick(index)}
              disabled={!canJump}
              aria-current={isCurrent ? "step" : undefined}
              aria-label={`Step ${index + 1}: ${label} — ${statusWord}`}
              className={cx(
                // Base
                "flex min-w-0 flex-1 rounded-2xl border transition-all",
                // Mobile: stack number over label, centered
                "flex-col items-center gap-1 px-1.5 py-2 text-center",
                // sm+: horizontal, pill-shaped
                "sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:px-3.5 sm:py-2 sm:text-left",
                // State colours
                isCurrent
                  ? "border-teal-700/40 bg-white shadow-soft"
                  : isDone
                    ? "border-teal/25 bg-teal/[0.07] hover:border-teal/50"
                    : "border-ink/10 bg-white/40",
                canJump ? "cursor-pointer" : "cursor-default",
              )}
            >
              {/* Number / check circle */}
              <span
                aria-hidden="true"
                className={cx(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.68rem] font-semibold transition-colors",
                  isCurrent
                    ? "bg-ink text-mint"
                    : isDone
                      ? "bg-teal-700 text-cream"
                      : "bg-ink/8 text-ink/45",
                )}
              >
                {isDone ? <FiCheck className="h-3 w-3" /> : index + 1}
              </span>

              {/* Label — short on mobile, full on sm+ */}
              <span
                aria-hidden="true"
                className={cx(
                  "min-w-0 font-medium leading-tight",
                  "text-[0.62rem] sm:truncate sm:text-[0.72rem]",
                  isCurrent
                    ? "text-ink"
                    : isDone
                      ? "text-ink/70"
                      : "text-ink/45",
                )}
              >
                <span className="sm:hidden">{shortLabel}</span>
                <span className="hidden sm:inline">{label}</span>
              </span>
            </button>

            {/* Connector line — only on sm+ */}
            {index < steps.length - 1 && (
              <span
                aria-hidden="true"
                className={cx(
                  "hidden h-px w-4 shrink-0 sm:block",
                  index < current ? "bg-teal/50" : "bg-ink/10",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
