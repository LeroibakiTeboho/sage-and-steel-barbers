"use client";

import { cx } from "@/lib/utils";
import PromoCodeField from "./PromoCodeField";
import { getServiceById } from "@/lib/services";

function Field({ id, label, error, hint, children, required }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-clay"
      >
        {label}
        {required && <span className="ml-1 text-teal-700">*</span>}
      </label>

      {children}

      {hint && !error && (
        <p className="mt-1.5 text-[0.7rem] text-ink/45">{hint}</p>
      )}

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-[0.72rem] font-medium text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  );
}

const inputBase =
  "w-full rounded-2xl border bg-white px-3.5 py-3 text-[0.9rem] text-ink placeholder:text-ink/30 transition-colors " +
  "focus:outline-none focus:ring-2 focus:ring-teal-700/25";

export default function StepDetails({
  booking,
  onChange,
  errors = {},
  onApplyPromo,
  onRemovePromo,
}) {
  const service = booking.serviceId ? getServiceById(booking.serviceId) : null;

  return (
    <div>
      <header className="mb-7">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">
          Your details
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/65">
          We only use these to confirm your appointment and send a reminder. No
          marketing lists.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field
            id="booking-name"
            label="Full name"
            required
            error={errors.name}
          >
            <input
              id="booking-name"
              name="name"
              type="text"
              autoComplete="name"
              value={booking.name}
              onChange={(e) => onChange({ name: e.target.value })}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "booking-name-error" : undefined}
              placeholder="e.g. Thabo Ndlovu"
              className={cx(
                inputBase,
                errors.name
                  ? "border-red-400"
                  : "border-ink/12 focus:border-teal-700",
              )}
            />
          </Field>
        </div>

        <Field
          id="booking-email"
          label="Email"
          required
          error={errors.email}
          hint="Your confirmation and calendar invite go here."
        >
          <input
            id="booking-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={booking.email}
            onChange={(e) => onChange({ email: e.target.value })}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "booking-email-error" : undefined}
            placeholder="you@example.co.za"
            className={cx(
              inputBase,
              errors.email
                ? "border-red-400"
                : "border-ink/12 focus:border-teal-700",
            )}
          />
        </Field>

        <Field
          id="booking-phone"
          label="Mobile number"
          required
          error={errors.phone}
          hint="So we can reach you if anything changes."
        >
          <input
            id="booking-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={booking.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "booking-phone-error" : undefined}
            placeholder="+27 82 123 4567"
            className={cx(
              inputBase,
              errors.phone
                ? "border-red-400"
                : "border-ink/12 focus:border-teal-700",
            )}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field
            id="booking-notes"
            label="Anything we should know? (optional)"
            hint="Allergies, a reference photo, or if you're running from work."
          >
            <textarea
              id="booking-notes"
              name="notes"
              rows={3}
              value={booking.notes}
              onChange={(e) => onChange({ notes: e.target.value })}
              placeholder="Optional"
              className={cx(
                inputBase,
                "resize-none border-ink/12 focus:border-teal-700",
              )}
            />
          </Field>
        </div>
      </div>

      <p className="mt-6 text-[0.72rem] leading-relaxed text-ink/45">
        By confirming this booking you agree to our{" "}
        <a
          href="/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-teal-700 underline underline-offset-2"
        >
          Terms &amp; Conditions
        </a>
        , including our cancellation policy.
        <div className="sm:col-span-2">
          <PromoCodeField
            service={service}
            appliedCode={booking.promoCode}
            onApply={onApplyPromo}
            onRemove={onRemovePromo}
          />
        </div>
      </p>
    </div>
  );
}
