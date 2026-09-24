import { hoursByWeekday } from "./business";
import { barbers, ANY_BARBER_ID } from "./barbers";
import { getServiceById } from "./services";

export const SLOT_INTERVAL_MINUTES = 30;
export const BOOKING_WINDOW_DAYS = 60;

/* ------------------------------------------------------------------ */
/* Time helpers                                                        */
/* ------------------------------------------------------------------ */

export function timeToMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function minutesToTime(total) {
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Current date + time in the shop's timezone (Africa/Johannesburg). */
export function nowInShopTimezone() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Johannesburg",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const get = (type) => parts.find((p) => p.type === type)?.value ?? "00";

  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    time: `${get("hour")}:${get("minute")}`,
  };
}

/* ------------------------------------------------------------------ */
/* Date helpers (local-date safe, no timezone drift)                   */
/* ------------------------------------------------------------------ */

export function dateKeyToDate(dateKey) {
  const [y, m, d] = dateKey.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function dateToKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(dateKey, days) {
  const date = dateKeyToDate(dateKey);
  date.setDate(date.getDate() + days);
  return dateToKey(date);
}

export function compareDateKeys(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

/* ------------------------------------------------------------------ */
/* Opening hours                                                       */
/* ------------------------------------------------------------------ */

export function getHoursForDate(dateKey) {
  const weekday = dateKeyToDate(dateKey).getDay();
  return hoursByWeekday[weekday] ?? null;
}

export function isClosedOn(dateKey) {
  return getHoursForDate(dateKey) === null;
}

export function isDateWithinBookingWindow(dateKey) {
  const today = nowInShopTimezone().date;
  const max = addDays(today, BOOKING_WINDOW_DAYS);
  return (
    compareDateKeys(dateKey, today) >= 0 && compareDateKeys(dateKey, max) <= 0
  );
}

export function isDateBookable(dateKey) {
  return isDateWithinBookingWindow(dateKey) && !isClosedOn(dateKey);
}

/* ------------------------------------------------------------------ */
/* Deterministic pseudo-availability                                   */
/* ------------------------------------------------------------------ */

function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Simulated "already in the book" slots so availability feels real. */
export function isSlotTakenByBarber(dateKey, time, barberId) {
  const key = `${barberId}|${dateKey}|${time}`;
  return hashString(key) % 100 < 30;
}

export function isSlotInPast(dateKey, time) {
  const now = nowInShopTimezone();
  if (compareDateKeys(dateKey, now.date) < 0) return true;
  if (compareDateKeys(dateKey, now.date) > 0) return false;
  // Same day — require at least 60 minutes' notice
  return timeToMinutes(time) <= timeToMinutes(now.time) + 60;
}

export function isSlotAvailable(dateKey, time, barberId) {
  if (!dateKey || !time) return false;
  if (isClosedOn(dateKey)) return false;
  if (isSlotInPast(dateKey, time)) return false;

  const hours = getHoursForDate(dateKey);
  if (!hours) return false;
  if (timeToMinutes(time) < timeToMinutes(hours.open)) return false;
  if (timeToMinutes(time) > timeToMinutes(hours.close) - SLOT_INTERVAL_MINUTES)
    return false;

  if (barberId === ANY_BARBER_ID || !barberId) {
    return barbers.some((b) => !isSlotTakenByBarber(dateKey, time, b.id));
  }
  return !isSlotTakenByBarber(dateKey, time, barberId);
}

/**
 * All bookable start times for a date + barber.
 * Returns [{ time, available }] so the UI can show taken slots greyed out.
 */
export function getSlotsForDate(dateKey, barberId) {
  const hours = getHoursForDate(dateKey);
  if (!hours) return [];

  const start = timeToMinutes(hours.open);
  const lastStart = timeToMinutes(hours.close) - SLOT_INTERVAL_MINUTES;

  const slots = [];
  for (let t = start; t <= lastStart; t += SLOT_INTERVAL_MINUTES) {
    const time = minutesToTime(t);
    slots.push({
      time,
      available: isSlotAvailable(dateKey, time, barberId),
    });
  }
  return slots;
}

export function countAvailableSlots(dateKey, barberId) {
  return getSlotsForDate(dateKey, barberId).filter((s) => s.available).length;
}

/* ------------------------------------------------------------------ */
/* Barber working days                                                 */
/* ------------------------------------------------------------------ */

export function doesBarberWorkOn(barberId, dateKey) {
  if (barberId === ANY_BARBER_ID || !barberId) return true;
  const barber = barbers.find((b) => b.id === barberId);
  if (!barber) return false;
  const weekday = dateKeyToDate(dateKey).getDay();
  return barber.worksDays.includes(weekday);
}

/** Resolve "first available" into a concrete barber for the chosen slot. */
export function resolveBarberForSlot(barberId, dateKey, time) {
  if (barberId && barberId !== ANY_BARBER_ID) return barberId;
  const weekday = dateKeyToDate(dateKey).getDay();
  const candidate = barbers.find(
    (b) =>
      b.worksDays.includes(weekday) &&
      !isSlotTakenByBarber(dateKey, time, b.id),
  );
  return candidate?.id ?? barbers[0].id;
}

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

export function validateDetails({ name, email, phone }) {
  const errors = {};
  if (!name || name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  const digits = (phone ?? "").replace(/[^\d]/g, "");
  if (!phone || digits.length < 9 || digits.length > 15) {
    errors.phone = "Please enter a valid contact number.";
  }
  return errors;
}

export function validateStep(step, booking) {
  const errors = {};

  if (step === 0 && !booking.serviceId) {
    errors.serviceId = "Choose a service to continue.";
  }

  if (step === 1 && !booking.barberId) {
    errors.barberId = "Choose a barber, or pick “First available”.";
  }

  if (step === 2) {
    if (!booking.date) {
      errors.date = "Select a date.";
    } else if (!isDateBookable(booking.date)) {
      errors.date = "That date isn't available. Please pick another.";
    }
    if (!booking.time) {
      errors.time = "Select a time.";
    } else if (
      booking.date &&
      !isSlotAvailable(booking.date, booking.time, booking.barberId)
    ) {
      errors.time = "That time was just taken. Please pick another slot.";
    }
  }

  if (step === 3) {
    Object.assign(errors, validateDetails(booking));
  }

  return errors;
}

/** Estimated completion time for a booking. */
export function getEndTime(dateKey, time, serviceId) {
  const service = getServiceById(serviceId);
  const duration = service?.duration ?? 30;
  return minutesToTime(timeToMinutes(time) + duration);
}
