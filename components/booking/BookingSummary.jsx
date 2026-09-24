"use client";
import { FiCalendar, FiClock, FiScissors, FiTag, FiUser } from "react-icons/fi";
import { calculateDiscount, findPromo } from "@/lib/promos";
import { getServiceById, formatDuration, formatPrice } from "@/lib/services";
import { getBarberById, ANY_BARBER_ID } from "@/lib/barbers";
import { getEndTime } from "@/lib/booking";
import { formatLongDate, formatTime12 } from "@/lib/utils";

function Row({ icon: Icon, label, value, muted }) {
  return (
    <div className="flex items-start gap-3 py-3">
      <Icon
        className="mt-0.5 h-4 w-4 shrink-0 text-teal-700"
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1">
        <dt className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-clay">
          {label}
        </dt>
        <dd
          className={`mt-0.5 text-[0.85rem] leading-snug ${
            muted ? "text-ink/35" : "font-medium text-ink"
          }`}
        >
          {value}
        </dd>
      </div>
    </div>
  );
}

export default function BookingSummary({ booking, className = "" }) {
  const service = getServiceById(booking.serviceId);
  const barber =
    booking.barberId && booking.barberId !== ANY_BARBER_ID
      ? getBarberById(booking.barberId)
      : null;

  const endTime =
    booking.date && booking.time && booking.serviceId
      ? getEndTime(booking.date, booking.time, booking.serviceId)
      : null;

  return (
    <div
      className={`rounded-2xl border border-ink/10 bg-white/70 p-5 sm:p-6 ${className}`}
    >
      <h2 className="font-display text-lg text-ink">Your appointment</h2>
      <p className="mt-1 text-[0.72rem] text-ink/45">
        Updates as you make selections.
      </p>

      <dl className="mt-4 divide-y divide-ink/8">
        <Row
          icon={FiScissors}
          label="Service"
          value={service ? service.name : "Not selected yet"}
          muted={!service}
        />
        <Row
          icon={FiUser}
          label="Barber"
          value={
            barber
              ? `${barber.name} — ${barber.role}`
              : booking.barberId === ANY_BARBER_ID
                ? "First available barber"
                : "Not selected yet"
          }
          muted={!booking.barberId}
        />
        <Row
          icon={FiCalendar}
          label="Date"
          value={
            booking.date ? formatLongDate(booking.date) : "Not selected yet"
          }
          muted={!booking.date}
        />
        <Row
          icon={FiClock}
          label="Time"
          value={
            booking.time && endTime
              ? `${formatTime12(booking.time)} – ${formatTime12(endTime)}`
              : booking.time
                ? formatTime12(booking.time)
                : "Not selected yet"
          }
          muted={!booking.time}
        />
      </dl>

      {service &&
        (() => {
          const promo = booking.promoCode ? findPromo(booking.promoCode) : null;
          const discount = calculateDiscount(promo, service);
          const total = service.price - discount;

          return (
            <div className="mt-2 space-y-2 border-t border-ink/8 pt-4">
              <div className="flex items-center justify-between text-[0.8rem]">
                <span className="text-ink/55">Duration</span>
                <span className="font-medium text-ink">
                  {formatDuration(service.duration)}
                </span>
              </div>

              {discount > 0 && (
                <>
                  <div className="flex items-center justify-between text-[0.8rem]">
                    <span className="text-ink/55">Subtotal</span>
                    <span className="font-medium text-ink">
                      {formatPrice(service.price)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[0.8rem]">
                    <span className="inline-flex items-center gap-1.5 text-teal-700">
                      <FiTag className="h-3 w-3" aria-hidden="true" />
                      {promo.code}
                    </span>
                    <span className="font-medium text-teal-700">
                      −{formatPrice(discount)}
                    </span>
                  </div>
                </>
              )}

              <div className="flex items-center justify-between border-t border-ink/8 pt-2">
                <span className="text-[0.8rem] font-medium text-ink/70">
                  Total
                </span>
                <span className="font-display text-xl text-teal-700">
                  {formatPrice(total)}
                </span>
              </div>

              <p className="pt-1 text-[0.68rem] leading-relaxed text-ink/40">
                Payable in-store by card or cash. Prices include VAT.
              </p>
            </div>
          );
        })()}
    </div>
  );
}
