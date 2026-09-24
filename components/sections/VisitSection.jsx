import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { business, formatHoursRange, openingHours } from "@/lib/business";

function todayIndex() {
  return new Date().getDay();
}

export default function VisitSection() {
  const today = todayIndex();

  // Map JS weekday (0=Sun) onto the Monday-first openingHours array
  const todayEntryIndex = today === 0 ? 6 : today - 1;

  return (
    <section className="container-x py-20 sm:py-24 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left — info */}
        <div>
          <SectionHeading
            eyebrow="Find us"
            title="118 Kloof Street, Gardens"
            description="Two minutes from the Kloof Nek parking garage, with metered street parking right outside. Walk-ins welcome before 11:00 when a chair is free — but booking is always the safer bet."
          />

          <dl className="mt-10 space-y-6">
            <Reveal className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal/12 text-teal-700">
                <FiMapPin className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <div>
                <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-clay">
                  Address
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={business.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.95rem] leading-relaxed text-ink transition-colors hover:text-teal-700"
                  >
                    {business.street}, {business.suburb}
                    <br />
                    {business.city}, {business.postalCode}
                  </a>
                </dd>
              </div>
            </Reveal>

            <Reveal delay={0.06} className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal/12 text-teal-700">
                <FiPhone className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <div>
                <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-clay">
                  Phone
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={business.phoneHref}
                    className="text-[0.95rem] text-ink transition-colors hover:text-teal-700"
                  >
                    {business.phone}
                  </a>
                </dd>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal/12 text-teal-700">
                <FiMail className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <div>
                <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-clay">
                  Email
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={business.emailHref}
                    className="break-all text-[0.95rem] text-ink transition-colors hover:text-teal-700"
                  >
                    {business.email}
                  </a>
                </dd>
              </div>
            </Reveal>
          </dl>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="/booking" size="lg">
              Book an appointment
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Directions &amp; contact
            </Button>
          </div>
        </div>

        {/* Right — hours + map */}
        <div className="space-y-6">
          <Reveal>
            <div className="rounded-2xl border border-ink/10 bg-white/70 p-6 sm:p-7">
              <h3 className="flex items-center gap-2.5 font-display text-lg text-ink">
                <FiClock className="h-4 w-4 text-teal-700" aria-hidden="true" />
                Opening hours
              </h3>

              <ul className="mt-5 space-y-2">
                {openingHours.map((entry, i) => {
                  const isToday = i === todayEntryIndex;
                  return (
                    <li
                      key={entry.day}
                      className={`flex items-baseline justify-between gap-4 rounded-2xl px-3 py-2 text-sm ${
                        isToday
                          ? "bg-mint/20 font-semibold text-ink"
                          : "text-ink/70"
                      }`}
                    >
                      <span>
                        {entry.day}
                        {isToday && (
                          <span className="ml-2 rounded-2xl bg-ink px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-mint">
                            Today
                          </span>
                        )}
                      </span>
                      <span className={entry.open ? "" : "text-clay-400"}>
                        {formatHoursRange(entry)}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-4 rounded-2xl bg-cream-200 px-3 py-2.5 text-[0.72rem] leading-relaxed text-ink/60">
                All times {business.timezoneLabel}. Last appointment is booked
                30 minutes before closing.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-2xl border border-ink/10 bg-ink">
              <iframe
                title={`Map showing ${business.fullAddress}`}
                src={business.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-75 w-full border-0 sm:h-85"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
