import { business } from "./business";
import { getServiceById } from "./services";
import { getBarberById, ANY_BARBER_ID } from "./barbers";
import { formatLongDate, formatTime12 } from "./utils";
import { getEndTime } from "./booking";
import { calculateDiscount, findPromo } from "./promos";

/** South African Standard Time is a fixed UTC+2 offset (no DST). */
const SAST_OFFSET_HOURS = 2;

/**
 * Convert a shop-local (SAST) date + time into a real UTC Date.
 * "2026-09-25", "15:00" → 2026-09-25T13:00:00Z
 */
export function sastToUtcDate(dateKey, time) {
  const [y, m, d] = dateKey.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  return new Date(Date.UTC(y, m - 1, d, hh - SAST_OFFSET_HOURS, mm, 0, 0));
}

function pad(n) {
  return String(n).padStart(2, "0");
}

/** Date → "20260925T130000Z" */
export function toCalendarStamp(date) {
  return (
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
  );
}

/* ------------------------------------------------------------------ */
/* Event builder — always derived from the customer's actual selection  */
/* ------------------------------------------------------------------ */

export function buildCalendarEvent(booking) {
  const service = getServiceById(booking.serviceId);
  if (!service)
    throw new Error("Cannot build calendar event: unknown service.");

  const barber =
    booking.barberId && booking.barberId !== ANY_BARBER_ID
      ? getBarberById(booking.barberId)
      : null;

  const start = sastToUtcDate(booking.date, booking.time);
  const end = sastToUtcDate(
    booking.date,
    getEndTime(booking.date, booking.time, booking.serviceId),
  );

  const barberLabel = barber ? barber.name : "First available barber";

  const title = `${service.name} — ${business.fullName}`;

  const descriptionLines = [
    `Appointment: ${service.name}`,
    `Barber: ${barberLabel}`,
    `Duration: ${service.duration} minutes`,
    `Date: ${formatLongDate(booking.date)}`,
    `Time: ${formatTime12(booking.time)} – ${formatTime12(
      getEndTime(booking.date, booking.time, booking.serviceId),
    )} (${business.timezoneLabel})`,
    "",
    `Location: ${business.fullAddress}`,
    `Phone: ${business.phone}`,
    `Email: ${business.email}`,
  ];

  if (booking.name) {
    descriptionLines.push("", `Booked under: ${booking.name}`);
  }
  if (booking.notes) {
    descriptionLines.push(`Notes: ${booking.notes}`);
  }

  if (booking.promoCode && service) {
    const promo = findPromo(booking.promoCode);
    const discount = calculateDiscount(promo, service);
    if (discount > 0) {
      descriptionLines.push(`Promo applied: ${promo.code} (−R${discount})`);
    }
  }

  descriptionLines.push(
    "",
    "Please arrive 5 minutes early. Free to reschedule up to 12 hours before your appointment.",
  );

  return {
    uid: `sageandsteel-${booking.serviceId}-${booking.date}-${booking.time}-${barber?.id ?? "any"}@sageandsteel.co.za`,
    title,
    description: descriptionLines.join("\n"),
    location: business.fullAddress,
    start,
    end,
    serviceName: service.name,
    barberName: barberLabel,
    dateKey: booking.date,
    time: booking.time,
  };
}

/* ------------------------------------------------------------------ */
/* Google Calendar                                                     */
/* ------------------------------------------------------------------ */

export function googleCalendarUrl(event) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${toCalendarStamp(event.start)}/${toCalendarStamp(event.end)}`,
    details: event.description,
    location: event.location,
    ctz: business.timezone,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/* ------------------------------------------------------------------ */
/* ICS (Apple Calendar / Outlook / Google import)                      */
/* ------------------------------------------------------------------ */

function escapeIcsText(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

export function buildIcsContent(event, { alarmMinutes = 120 } = {}) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sage & Steel Barber Co.//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeIcsText(business.fullName)}`,
    `X-WR-TIMEZONE:${business.timezone}`,
    "BEGIN:VEVENT",
    `UID:${event.uid}`,
    `DTSTAMP:${toCalendarStamp(new Date())}`,
    `DTSTART:${toCalendarStamp(event.start)}`,
    `DTEND:${toCalendarStamp(event.end)}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `DESCRIPTION:${escapeIcsText(event.description)}`,
    `LOCATION:${escapeIcsText(event.location)}`,
    "STATUS:CONFIRMED",
    "TRANSP:OPAQUE",
    "BEGIN:VALARM",
    `TRIGGER:-PT${alarmMinutes}M`,
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeIcsText(`Reminder: ${event.title}`)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function buildIcsFileName(event) {
  const safeService = event.serviceName
    .replace(/[^a-z0-9]+/gi, "-")
    .toLowerCase();
  return `sage-and-steel-${safeService}-${event.dateKey}.ics`;
}

/** Browser-only: trigger a download of the .ics file. */
export function downloadIcsFile(event) {
  const content = buildIcsContent(event);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = buildIcsFileName(event);
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => URL.revokeObjectURL(url), 2000);
  return true;
}

/** Webcal/data URI alternative — useful for iOS Safari "Add to Calendar". */
export function buildIcsDataUri(event) {
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(
    buildIcsContent(event),
  )}`;
}
