"use client";

import { useState } from "react";
import { FiAlertCircle, FiCheck, FiTag, FiX } from "react-icons/fi";
import { findPromo, validatePromo } from "@/lib/promos";
import { formatPrice } from "@/lib/services";
import { cx } from "@/lib/utils";

export default function PromoCodeField({
  service,
  appliedCode,
  onApply,
  onRemove,
}) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const appliedPromo = appliedCode ? findPromo(appliedCode) : null;

  const handleApply = () => {
    const result = validatePromo(input, service);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError("");
    onApply(result.promo.code);
    setInput("");
  };

  const handleRemove = () => {
    setError("");
    setInput("");
    onRemove();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleApply();
    }
  };

  /* -------- Applied state -------- */
  if (appliedPromo) {
    return (
      <div className="rounded-2xl border border-teal-700/30 bg-teal/[0.07] p-4">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-700 text-cream">
            <FiCheck className="h-4 w-4" aria-hidden="true" />
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-teal-700">
              Promo applied
            </p>
            <p className="mt-1 font-mono text-[0.95rem] font-semibold tracking-[0.08em] text-ink">
              {appliedPromo.code}
            </p>
            <p className="mt-1 text-[0.78rem] leading-relaxed text-ink/60">
              {appliedPromo.label}
            </p>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            aria-label={`Remove promo code ${appliedPromo.code}`}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition-colors hover:border-red-300 hover:text-red-600"
          >
            <FiX className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }

  /* -------- Empty state -------- */
  return (
    <div>
      <label
        htmlFor="booking-promo"
        className="mb-1.5 flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-clay"
      >
        <FiTag className="h-3 w-3" aria-hidden="true" />
        Promo code (optional)
      </label>

      <div className="flex gap-2">
        <input
          id="booking-promo"
          name="promo"
          type="text"
          inputMode="text"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          value={input}
          onChange={(e) => {
            setInput(e.target.value.toUpperCase());
            if (error) setError("");
          }}
          onKeyDown={handleKeyDown}
          placeholder="e.g. FIRSTCUT50"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "booking-promo-error" : undefined}
          className={cx(
            "w-full rounded-xl border bg-white px-3.5 py-3 font-mono text-[0.88rem] tracking-[0.06em] text-ink",
            "placeholder:font-sans placeholder:tracking-normal placeholder:text-ink/30",
            "transition-colors focus:outline-none focus:ring-2 focus:ring-teal-700/25",
            error ? "border-red-400" : "border-ink/12 focus:border-teal-700",
          )}
        />

        <button
          type="button"
          onClick={handleApply}
          disabled={!input.trim()}
          className="shrink-0 rounded-xl bg-ink px-4 py-3 text-[0.8rem] font-semibold text-cream transition-colors hover:bg-ink-800 disabled:opacity-40"
        >
          Apply
        </button>
      </div>

      {error ? (
        <p
          id="booking-promo-error"
          role="alert"
          className="mt-2 flex items-center gap-1.5 text-[0.72rem] font-medium text-red-700"
        >
          <FiAlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : (
        <p className="mt-2 text-[0.7rem] text-ink/45">
          Codes apply at booking. You can also mention them in-store.
        </p>
      )}
    </div>
  );
}
