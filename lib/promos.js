/**
 * Promo code registry.
 *
 * Adding a new code is a one-line change. The wizard, summary, confirmation
 * screen and calendar event all read from here — no scattered logic.
 */

export const promos = [
  {
    code: "FIRSTCUT50",
    label: "R50 off your first visit",
    description: "Valid on any service over R200. One per customer.",
    type: "fixed", // "fixed" → rand off | "percent" → % off
    value: 50,
    minSpend: 200,
    stackable: false,
  },
];

/** Key used in sessionStorage when a promo is seeded by the modal / a link. */
export const PROMO_STORAGE_KEY = "sas-promo-code";

const promosByCode = promos.reduce((acc, promo) => {
  acc[promo.code.toUpperCase()] = promo;
  return acc;
}, {});

/** Case-insensitive lookup. Returns the promo object or null. */
export function findPromo(rawCode) {
  if (!rawCode) return null;
  const key = String(rawCode).trim().toUpperCase();
  if (!key) return null;
  return promosByCode[key] ?? null;
}

/**
 * Work out the rand discount for a given promo + service.
 * Returns 0 when the promo doesn't apply (no promo, service too cheap, etc.).
 */
export function calculateDiscount(promo, service) {
  if (!promo || !service) return 0;
  if (promo.minSpend && service.price < promo.minSpend) return 0;

  if (promo.type === "fixed") {
    return Math.min(promo.value, service.price);
  }
  if (promo.type === "percent") {
    return Math.round((service.price * promo.value) / 100);
  }
  return 0;
}

/** Full validation used by the booking form. */
export function validatePromo(rawCode, service) {
  const trimmed = String(rawCode ?? "").trim();
  if (!trimmed) return { ok: false, error: "Enter a promo code." };

  const promo = findPromo(trimmed);
  if (!promo) return { ok: false, error: "That code isn't valid." };

  if (!service) return { ok: false, error: "Choose a service first." };

  if (promo.minSpend && service.price < promo.minSpend) {
    return {
      ok: false,
      error: `Valid on services from R${promo.minSpend} up.`,
    };
  }

  return { ok: true, promo };
}
