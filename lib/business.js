export const business = {
  name: "Sage & Steel",
  fullName: "Sage & Steel Barber Co.",
  legalName: "Sage & Steel Barber Co. (Pty) Ltd",
  tagline: "Sharp cuts. Steady hands.",
  established: 2014,
  shortDescription:
    "A modern barbershop in the heart of Gardens, Cape Town. Precision cuts, proper beard work, and a chair that feels like yours.",
  longDescription:
    "We opened on Kloof Street in 2014 with two chairs, one kettle and a stubborn belief that a haircut should be an occasion, not an errand.",

  phone: "+27 21 424 8817",
  phoneHref: "tel:+27214248817",
  whatsapp: "+27 82 551 9024",
  whatsappHref: "https://wa.me/27825519024",
  email: "hello@sageandsteel.co.za",
  emailHref: "mailto:hello@sageandsteel.co.za",

  street: "118 Kloof Street",
  suburb: "Gardens",
  city: "Cape Town",
  province: "Western Cape",
  postalCode: "8001",
  country: "South Africa",
  fullAddress: "118 Kloof Street, Gardens, Cape Town, 8001, South Africa",
  parkingNote:
    "Metered street parking on Kloof Street, plus the Kloof Nek parking garage two minutes' walk away.",

  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=118+Kloof+Street,+Gardens,+Cape+Town",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=118%20Kloof%20Street%2C%20Gardens%2C%20Cape%20Town&output=embed",

  timezone: "Africa/Johannesburg",
  timezoneLabel: "SAST (UTC+2)",

  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    tiktok: "https://www.tiktok.com/",
  },

  rating: 4.9,
  reviewCount: 412,
  clientCount: "12,000+",
};

/** Display hours, Monday → Sunday */
export const openingHours = [
  { day: "Monday", short: "Mon", open: "09:00", close: "19:00" },
  { day: "Tuesday", short: "Tue", open: "09:00", close: "19:00" },
  { day: "Wednesday", short: "Wed", open: "09:00", close: "19:00" },
  { day: "Thursday", short: "Thu", open: "09:00", close: "20:00" },
  { day: "Friday", short: "Fri", open: "09:00", close: "20:00" },
  { day: "Saturday", short: "Sat", open: "08:00", close: "17:00" },
  { day: "Sunday", short: "Sun", open: null, close: null },
];

/** Weekday index (0 = Sunday) → { open, close } | null */
export const hoursByWeekday = {
  0: null,
  1: { open: "09:00", close: "19:00" },
  2: { open: "09:00", close: "19:00" },
  3: { open: "09:00", close: "19:00" },
  4: { open: "09:00", close: "20:00" },
  5: { open: "09:00", close: "20:00" },
  6: { open: "08:00", close: "17:00" },
};

export function formatHoursRange(entry) {
  if (!entry.open) return "Closed";
  return `${entry.open} – ${entry.close}`;
}
