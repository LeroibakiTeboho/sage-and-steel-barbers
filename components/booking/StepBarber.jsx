"use client";

import { FiCheck } from "react-icons/fi";
import SmartImage from "@/components/ui/SmartImage";
import { anyBarberOption, barbers } from "@/lib/barbers";
import { barberPortraits } from "@/lib/images";
import { cx } from "@/lib/utils";

export default function StepBarber({ value, onChange, serviceName }) {
  const options = [anyBarberOption, ...barbers];

  return (
    <div>
      <header className="mb-7">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">
          Who&apos;s cutting?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/65">
          {serviceName
            ? `Choose a barber for your ${serviceName.toLowerCase()}, or let us pick whoever's free first.`
            : "Choose a barber, or let us pick whoever's free first."}
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((barber) => {
          const selected = value === barber.id;
          const isAny = barber.id === anyBarberOption.id;
          const portrait = barberPortraits[barber.id];

          return (
            <button
              key={barber.id}
              type="button"
              onClick={() => onChange(barber.id)}
              aria-pressed={selected}
              className={cx(
                "flex items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-200",
                selected
                  ? "border-teal-700 bg-white shadow-soft ring-1 ring-teal-700/20"
                  : "border-ink/10 bg-white/50 hover:border-teal/50 hover:bg-white",
              )}
            >
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-ink">
                {isAny ? (
                  <span className="flex h-full w-full items-center justify-center bg-linear-to-br from-teal-700 to-ink text-2xl text-mint">
                    ★
                  </span>
                ) : (
                  <SmartImage
                    src={portrait}
                    alt={`${barber.name}, ${barber.role}`}
                    fill
                    sizes="64px"
                  />
                )}
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-start justify-between gap-2">
                  <span className="font-display text-[1.02rem] leading-snug text-ink">
                    {barber.name}
                  </span>
                  {selected && (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-2xl bg-teal-700 text-cream">
                      <FiCheck className="h-3 w-3" aria-hidden="true" />
                    </span>
                  )}
                </span>

                <span className="mt-0.5 block text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-teal-700">
                  {barber.role}
                </span>

                <span className="mt-2 block text-[0.78rem] leading-relaxed text-ink/60">
                  {isAny
                    ? barber.bio
                    : barber.specialties.slice(0, 3).join(" · ")}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
