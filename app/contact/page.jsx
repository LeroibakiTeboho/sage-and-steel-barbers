import Link from "next/link";
import {
  FiArrowRight,
  FiClock,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { business, formatHoursRange, openingHours } from "@/lib/business";

export const metadata = {
  title: "Contact & Visit",
  description:
    "Find Sage & Steel Barber Co. at 118 Kloof Street, Gardens, Cape Town. Opening hours, phone, email and directions.",
};

function todayIndex() {
  return new Date().getDay();
}

export default function ContactPage() {
  const today = todayIndex();
  const todayEntryIndex = today === 0 ? 6 : today - 1;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink pb-16 pt-32 text-cream sm:pb-20 sm:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-2xl bg-mint/12 blur-3xl"
        />
        <div className="container-x relative">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-[0.72rem] text-cream/45">
                <li>
                  <Link href="/" className="transition-colors hover:text-mint">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-cream/75">Contact</li>
              </ol>
            </nav>

            <h1 className="max-w-3xl text-[clamp(2.2rem,7vw,4.25rem)] text-cream">
              Find us on Kloof Street
            </h1>

            <p className="mt-6 max-w-2xl text-[0.98rem] leading-relaxed text-cream/70 sm:text-lg">
              Two minutes from the Kloof Nek parking garage, with metered street
              parking right outside. Walk-ins welcome before 11:00 when a chair
              is free.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/booking" size="lg" className="w-full sm:w-auto">
                Book an appointment
                <FiArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                href={business.phoneHref}
                variant="outlineLight"
                size="lg"
                className="w-full sm:w-auto"
              >
                Call the shop
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Info cards */}
      <section className="container-x -mt-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal>
            <div className="h-full rounded-2xl border border-ink/10 bg-white/95 p-6 shadow-soft backdrop-blur">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal/12 text-teal-700">
                <FiMapPin className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <h2 className="mt-4 font-display text-lg text-ink">Address</h2>
              <p className="mt-2 text-[0.87rem] leading-relaxed text-ink/65">
                {business.street}
                <br />
                {business.suburb}, {business.city}
                <br />
                {business.postalCode}, {business.country}
              </p>
              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-teal-700 transition-colors hover:text-ink"
              >
                Open in Google Maps
                <FiArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.07}>
            <div className="h-full rounded-2xl border border-ink/10 bg-white/95 p-6 shadow-soft backdrop-blur">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal/12 text-teal-700">
                <FiPhone className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <h2 className="mt-4 font-display text-lg text-ink">
                Get in touch
              </h2>
              <ul className="mt-2 space-y-2 text-[0.87rem] text-ink/65">
                <li>
                  <a
                    href={business.phoneHref}
                    className="transition-colors hover:text-teal-700"
                  >
                    {business.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={business.emailHref}
                    className="break-all transition-colors hover:text-teal-700"
                  >
                    {business.email}
                  </a>
                </li>
                <li>
                  <a
                    href={business.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-teal-700"
                  >
                    WhatsApp {business.whatsapp}
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="h-full rounded-2xl border border-ink/10 bg-white/95 p-6 shadow-soft backdrop-blur sm:col-span-2 lg:col-span-1">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal/12 text-teal-700">
                <FiClock className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <h2 className="mt-4 font-display text-lg text-ink">
                Today&apos;s hours
              </h2>
              <p className="mt-2 font-display text-2xl text-teal-700">
                {formatHoursRange(openingHours[todayEntryIndex])}
              </p>
              <p className="mt-2 text-[0.8rem] leading-relaxed text-ink/55">
                {openingHours[todayEntryIndex].day} · {business.timezoneLabel}
              </p>
              <p className="mt-3 text-[0.75rem] leading-relaxed text-ink/45">
                Last appointment is booked 30 minutes before closing.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Hours + map */}
      <section className="container-x py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Opening hours"
              title="When we're in"
              description={`All times shown in ${business.timezoneLabel}. We close on Sundays.`}
            />

            <Reveal className="mt-8">
              <ul className="divide-y divide-ink/8 overflow-hidden rounded-2xl border border-ink/10 bg-white/60">
                {openingHours.map((entry, i) => {
                  const isToday = i === todayEntryIndex;
                  return (
                    <li
                      key={entry.day}
                      className={`flex items-baseline justify-between gap-4 px-5 py-3.5 text-[0.87rem] ${
                        isToday
                          ? "bg-mint/18 font-semibold text-ink"
                          : "text-ink/70"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {entry.day}
                        {isToday && (
                          <span className="rounded-2xl bg-ink px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-mint">
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
            </Reveal>

            <Reveal delay={0.08} className="mt-8">
              <div className="rounded-2xl border border-teal/25 bg-teal/[0.07] p-5">
                <h3 className="font-display text-base text-ink">
                  Parking &amp; getting here
                </h3>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-ink/65">
                  {business.parkingNote}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-ink/10 bg-ink">
              <iframe
                title={`Map showing ${business.fullAddress}`}
                src={business.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-85 w-full border-0 sm:h-120 lg:h-full lg:min-h-130"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="container-x pb-20 sm:pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-ink px-6 py-14 text-center sm:px-12 sm:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-2xl bg-mint/15 blur-3xl"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-[clamp(1.75rem,5vw,2.75rem)] text-cream">
                Booking beats waiting
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-[0.95rem] leading-relaxed text-cream/70">
                Pick a service, choose your barber and lock in a time.
                You&apos;ll get a calendar invite you can add straight to Google
                or Apple Calendar.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button href="/booking" size="lg" className="w-full sm:w-auto">
                  Book online now
                  <FiArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button
                  href={business.whatsappHref}
                  variant="outlineLight"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  WhatsApp us
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
