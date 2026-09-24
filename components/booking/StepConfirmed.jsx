"use client";

import { FiCheckCircle, FiMapPin, FiPhone } from "react-icons/fi";
import { calculateDiscount, findPromo } from "@/lib/promos";
import Button from "@/components/ui/Button";
import CalendarActions from "./CalendarActions";
import { business } from "@/lib/business";
import { getServiceById, formatDuration, formatPrice } from "@/lib/services";
import { getBarberById, ANY_BARBER_ID } from "@/lib/barbers";
import { getEndTime } from "@/lib/booking";
import { formatLongDate, formatTime12 } from "@/lib/utils";

export default function StepConfirmed({ booking, reference, onBookAnother }) {
  const service = getServiceById(booking.serviceId);
  const barber =
    booking.barberId && booking.barberId !== ANY_BARBER_ID
      ? getBarberById(booking.barberId)
      : null;

  const endTime = getEndTime(booking.date, booking.time, booking.serviceId);

  const promo = booking.promoCode ? findPromo(booking.promoCode) : null;
  const discount = calculateDiscount(promo, service);
  const total = service ? service.price - discount : 0;

  return (
    <div>
      <div className="flex flex-col items-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mint/25 text-teal-700">
          <FiCheckCircle className="h-7 w-7" aria-hidden="true" />
        </span>

        <h2 className="mt-5 font-display text-2xl text-ink sm:text-[2rem]">
          You&apos;re booked in.
        </h2>

        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/65">
          Thanks {booking.name.split(" ")[0]} — we&apos;ve got you down for{" "}
          <strong className="font-semibold text-ink">{service?.name}</strong> on{" "}
          <strong className="font-semibold text-ink">
            {formatLongDate(booking.date)}
          </strong>{" "}
          at{" "}
          <strong className="font-semibold text-ink">
            {formatTime12(booking.time)}
          </strong>
          .
        </p>

        {reference && (
          <p className="mt-3 rounded-2xl border border-ink/10 bg-white/70 px-4 py-1.5 font-mono text-[0.72rem] tracking-[0.14em] text-ink/60">
            REF {reference}
          </p>
        )}
      </div>

      {/* Appointment card */}
      <div className="mt-9 overflow-hidden rounded-2xl border border-ink/10 bg-white/70">
        <dl className="divide-y divide-ink/8">
          <div className="flex items-start justify-between gap-4 px-5 py-4 sm:px-6">
            <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-clay">
              Service
            </dt>
            <dd className="text-right text-[0.88rem] font-medium text-ink">
              {service?.name}
              <span className="mt-0.5 block text-[0.72rem] font-normal text-ink/50">
                {service ? formatDuration(service.duration) : ""} ·{" "}
                {discount > 0 ? (
                  <>
                    <span className="line-through opacity-60">
                      {formatPrice(service.price)}
                    </span>{" "}
                    <span className="font-medium text-teal-700">
                      {formatPrice(total)}
                    </span>
                  </>
                ) : service ? (
                  formatPrice(service.price)
                ) : (
                  ""
                )}
              </span>
            </dd>
          </div>

          {discount > 0 && promo && (
            <div className="flex items-start justify-between gap-4 px-5 py-4 sm:px-6">
              <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-clay">
                Promo
              </dt>
              <dd className="text-right text-[0.88rem] font-medium text-teal-700">
                <span className="font-mono tracking-[0.08em]">
                  {promo.code}
                </span>
                <span className="mt-0.5 block text-[0.72rem] font-normal text-ink/50">
                  {promo.label} · −{formatPrice(discount)}
                </span>
              </dd>
            </div>
          )}

          <div className="flex items-start justify-between gap-4 px-5 py-4 sm:px-6">
            <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-clay">
              Barber
            </dt>
            <dd className="text-right text-[0.88rem] font-medium text-ink">
              {barber ? barber.name : "First available barber"}
              <span className="mt-0.5 block text-[0.72rem] font-normal text-ink/50">
                {barber ? barber.role : "We'll match you on the day"}
              </span>
            </dd>
          </div>

          <div className="flex items-start justify-between gap-4 px-5 py-4 sm:px-6">
            <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-clay">
              When
            </dt>
            <dd className="text-right text-[0.88rem] font-medium text-ink">
              {formatLongDate(booking.date)}
              <span className="mt-0.5 block text-[0.72rem] font-normal text-ink/50">
                {formatTime12(booking.time)} – {formatTime12(endTime)} (SAST)
              </span>
            </dd>
          </div>

          <div className="flex items-start justify-between gap-4 px-5 py-4 sm:px-6">
            <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-clay">
              Where
            </dt>
            <dd className="max-w-[16rem] text-right text-[0.88rem] font-medium leading-snug text-ink">
              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-teal-700"
              >
                {business.street}, {business.suburb}
                <span className="mt-0.5 block text-[0.72rem] font-normal text-ink/50">
                  {business.city}, {business.postalCode}
                </span>
              </a>
            </dd>
          </div>

          <div className="flex items-start justify-between gap-4 px-5 py-4 sm:px-6">
            <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-clay">
              Contact
            </dt>
            <dd className="text-right text-[0.88rem] font-medium text-ink">
              {booking.name}
              <span className="mt-0.5 block break-all text-[0.72rem] font-normal text-ink/50">
                {booking.email} · {booking.phone}
              </span>
            </dd>
          </div>
        </dl>
      </div>

      {/* Calendar actions */}
      <div className="mt-6 rounded-2xl border border-teal/25 bg-teal/6 p-5 sm:p-6">
        <h3 className="font-display text-lg text-ink">
          Add it to your calendar
        </h3>
        <p className="mt-1.5 text-[0.8rem] leading-relaxed text-ink/60">
          Don&apos;t rely on memory. Add the appointment now — the invite
          carries your service, barber, exact time and our address.
        </p>
        <div className="mt-5">
          <CalendarActions booking={booking} />
        </div>
      </div>

      {/* Next steps */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <a
          href={business.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-2xl border border-ink/12 bg-white/60 px-4 py-3 text-[0.8rem] font-semibold text-ink transition-colors hover:border-teal/50 hover:text-teal-700"
        >
          <FiMapPin className="h-4 w-4" aria-hidden="true" />
          Get directions
        </a>
        <a
          href={business.phoneHref}
          className="flex items-center justify-center gap-2 rounded-2xl border border-ink/12 bg-white/60 px-4 py-3 text-[0.8rem] font-semibold text-ink transition-colors hover:border-teal/50 hover:text-teal-700"
        >
          <FiPhone className="h-4 w-4" aria-hidden="true" />
          Call the shop
        </a>
        <button
          type="button"
          onClick={onBookAnother}
          className="flex items-center justify-center gap-2 rounded-2xl border border-ink/12 bg-white/60 px-4 py-3 text-[0.8rem] font-semibold text-ink transition-colors hover:border-teal/50 hover:text-teal-700"
        >
          Book another
        </button>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button href="/" variant="outline" size="md">
          Return home
        </Button>
        <Button href="/services" variant="ghost" size="md">
          Browse more services
        </Button>
      </div>

      <p className="mt-6 text-center text-[0.7rem] leading-relaxed text-ink/45">
        Need to change something? Call us on{" "}
        <a
          href={business.phoneHref}
          className="font-medium text-teal-700 underline underline-offset-2"
        >
          {business.phone}
        </a>{" "}
        at least 12 hours before your appointment. See our{" "}
        <a
          href="/terms#cancellations"
          className="font-medium text-teal-700 underline underline-offset-2"
        >
          cancellation policy
        </a>
        .
      </p>
    </div>
  );
}
