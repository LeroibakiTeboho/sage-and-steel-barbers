"use client";

import { FiCheck } from "react-icons/fi";
import {
  formatDuration,
  formatPrice,
  serviceCategories,
  services,
} from "@/lib/services";
import { cx } from "@/lib/utils";

export default function StepService({ value, onChange }) {
  return (
    <div>
      <header className="mb-7">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">
          What are we doing today?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/65">
          Pick a service. You can change it later — nothing is locked in until
          you confirm.
        </p>
      </header>

      <div className="space-y-8">
        {serviceCategories.map((category) => {
          const items = services.filter((s) => s.category === category.id);
          if (items.length === 0) return null;

          return (
            <section key={category.id} aria-labelledby={`cat-${category.id}`}>
              <div className="mb-3.5">
                <h3
                  id={`cat-${category.id}`}
                  className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-clay"
                >
                  {category.name}
                </h3>
                <p className="mt-1 text-[0.78rem] text-ink/50">
                  {category.blurb}
                </p>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2">
                {items.map((service) => {
                  const selected = value === service.id;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => onChange(service.id)}
                      aria-pressed={selected}
                      className={cx(
                        "group relative flex flex-col rounded-2xl border p-4 text-left transition-all duration-200",
                        selected
                          ? "border-teal-700 bg-white shadow-soft ring-1 ring-teal-700/20"
                          : "border-ink/10 bg-white/50 hover:border-teal/50 hover:bg-white",
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-display text-[1.05rem] leading-snug text-ink">
                          {service.name}
                        </span>
                        <span className="shrink-0 font-display text-[1.05rem] text-teal-700">
                          {formatPrice(service.price)}
                        </span>
                      </div>

                      <span className="mt-2 line-clamp-2 text-[0.78rem] leading-relaxed text-ink/60">
                        {service.description}
                      </span>

                      <span className="mt-3 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-clay">
                        {formatDuration(service.duration)}
                      </span>

                      {selected && (
                        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-2xl bg-teal-700 text-cream">
                          <FiCheck className="h-3 w-3" aria-hidden="true" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
