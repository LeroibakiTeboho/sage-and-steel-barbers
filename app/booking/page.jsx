import Link from "next/link";
import { Suspense } from "react";
import { FiClock, FiInfo, FiMapPin, FiPhone } from "react-icons/fi";
import BookingWizard from "@/components/booking/BookingWizard";
import Reveal from "@/components/ui/Reveal";
import { business } from "@/lib/business";

export const metadata = {
  title: "Book an Appointment",
  description:
    "Book your chair at Sage & Steel Barber Co. Choose your service, barber, date and time, then add the appointment straight to your calendar.",
};

function WizardFallback() {
  return (
    <div className="animate-pulse space-y-6" aria-hidden="true">
      <div className="h-12 rounded-2xl bg-ink/8" />
      <div className="h-40 rounded-2xl bg-ink/8" />
      <div className="h-40 rounded-2xl bg-ink/8" />
    </div>
  );
}

export default function BookingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink pb-16 pt-32 text-cream sm:pb-20 sm:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-2xl bg-teal/15 blur-3xl"
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
                <li className="text-cream/75">Booking</li>
              </ol>
            </nav>

            <h1 className="max-w-3xl text-[clamp(2.2rem,7vw,4rem)] text-cream">
              Book your appointment
            </h1>

            <p className="mt-6 max-w-2xl text-[0.98rem] leading-relaxed text-cream/70 sm:text-lg">
              Four quick steps. Pick a service, choose a barber, select a time,
              and we&apos;ll send you a calendar invite you can add to Google or
              Apple Calendar.
            </p>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[0.78rem] text-cream/60">
              <li className="inline-flex items-center gap-2">
                <FiClock className="h-3.5 w-3.5 text-mint" aria-hidden="true" />
                Takes about a minute
              </li>
              <li className="inline-flex items-center gap-2">
                <FiInfo className="h-3.5 w-3.5 text-mint" aria-hidden="true" />
                No deposit required
              </li>
              <li className="inline-flex items-center gap-2">
                <FiMapPin
                  className="h-3.5 w-3.5 text-mint"
                  aria-hidden="true"
                />
                {business.street}, {business.suburb}
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Wizard */}
      <section
        id="booking"
        className="container-x scroll-mt-20 py-14 sm:py-16 lg:py-20"
      >
        <Suspense fallback={<WizardFallback />}>
          <BookingWizard />
        </Suspense>
      </section>

      {/* Help strip */}
      <section className="container-x pb-20 sm:pb-24">
        <Reveal>
          <div className="grid gap-4 rounded-2xl border border-ink/10 bg-white/60 p-6 sm:grid-cols-3 sm:p-7">
            <div>
              <h2 className="font-display text-base text-ink">
                Need to change your booking?
              </h2>
              <p className="mt-2 text-[0.82rem] leading-relaxed text-ink/60">
                Call us at least 12 hours before your appointment and we&apos;ll
                move it — no charge.
              </p>
            </div>
            <div>
              <h2 className="font-display text-base text-ink">Running late?</h2>
              <p className="mt-2 text-[0.82rem] leading-relaxed text-ink/60">
                Give us a ring. We hold chairs for 10 minutes before we have to
                release the slot.
              </p>
            </div>
            <div>
              <h2 className="font-display text-base text-ink">
                Prefer to talk?
              </h2>
              <p className="mt-2 text-[0.82rem] leading-relaxed text-ink/60">
                We&apos;d rather you booked online, but the phone is always
                answered during opening hours.
              </p>
              <a
                href={business.phoneHref}
                className="mt-3 inline-flex items-center gap-2 text-[0.8rem] font-semibold text-teal-700 transition-colors hover:text-ink"
              >
                <FiPhone className="h-3.5 w-3.5" aria-hidden="true" />
                {business.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
