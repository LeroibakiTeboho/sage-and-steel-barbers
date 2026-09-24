"use client";

import { FiCheck } from "react-icons/fi";
import { cx } from "@/lib/utils";

export default function Stepper({ steps, current, onStepClick, maxReached }) {
  return (
    <ol
      className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:gap-2"
      aria-label="Booking progress"
    >
      {steps.map((label, index) => {
        const isDone = index < current;
        const isCurrent = index === current;
        const canJump = index <= maxReached && !isCurrent;

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
              className={cx(
                "flex min-w-0 flex-1 items-center gap-2 rounded-2xl border px-2.5 py-2 text-left transition-all sm:px-3.5",
                isCurrent
                  ? "border-teal-700/40 bg-white shadow-soft"
                  : isDone
                    ? "border-teal/25 bg-teal/[0.07] hover:border-teal/50"
                    : "border-ink/10 bg-white/40",
                canJump ? "cursor-pointer" : "cursor-default",
              )}
            >
              <span
                className={cx(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-2xl text-[0.68rem] font-semibold transition-colors",
                  isCurrent
                    ? "bg-ink text-mint"
                    : isDone
                      ? "bg-teal-700 text-cream"
                      : "bg-ink/8 text-ink/45",
                )}
              >
                {isDone ? (
                  <FiCheck className="h-3 w-3" aria-hidden="true" />
                ) : (
                  index + 1
                )}
              </span>
              <span
                className={cx(
                  "hidden truncate text-[0.72rem] font-medium sm:block",
                  isCurrent
                    ? "text-ink"
                    : isDone
                      ? "text-ink/70"
                      : "text-ink/40",
                )}
              >
                {label}
              </span>
            </button>

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
