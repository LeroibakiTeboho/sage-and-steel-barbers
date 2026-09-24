export const serviceCategories = [
  {
    id: "cuts",
    name: "Cuts & Fades",
    blurb:
      "Precision scissor work, clean fades and shape that grows out properly.",
  },
  {
    id: "beard",
    name: "Beard & Shave",
    blurb:
      "Straight razor work, hot towels and beard lines that actually suit your face.",
  },
  {
    id: "packages",
    name: "Packages",
    blurb: "Bundle the chair time and save. Our most popular way to book.",
  },
  {
    id: "extras",
    name: "Finishing Touches",
    blurb:
      "Colour, scalp care and the details that keep things sharp between visits.",
  },
];

export const services = [
  // ---------- Cuts & Fades ----------
  {
    id: "signature-cut",
    name: "Signature Cut",
    category: "cuts",
    price: 280,
    duration: 45,
    popular: true,
    description:
      "Our house cut. A proper consultation, precision scissor work and a hot towel finish.",
    includes: [
      "Style consultation",
      "Scissor cut & detailing",
      "Hot towel finish",
      "Styling & product advice",
    ],
  },
  {
    id: "skin-fade",
    name: "Skin Fade",
    category: "cuts",
    price: 320,
    duration: 45,
    popular: true,
    description:
      "A clean, graduated fade taken down to the skin with a razor-sharp blend line.",
    includes: [
      "Clipper & blade fade",
      "Razor blend line",
      "Neck & edge detail",
      "Hot towel finish",
    ],
  },
  {
    id: "taper-texture",
    name: "Taper & Texturise",
    category: "cuts",
    price: 300,
    duration: 45,
    description:
      "A softer, more growable cut. Tapered sides with textured length on top.",
    includes: [
      "Consultation",
      "Tapered sides",
      "Point-cut texture on top",
      "Matte styling finish",
    ],
  },
  {
    id: "kids-cut",
    name: "Kids Cut",
    category: "cuts",
    price: 180,
    duration: 30,
    description:
      "For under-12s. Patient, unhurried and finished properly — no wriggle penalties.",
    includes: [
      "Relaxed, patient service",
      "Scissor or clipper cut",
      "Fringe tidy-up",
      "Lollipop, obviously",
    ],
  },

  // ---------- Beard & Shave ----------
  {
    id: "beard-trim",
    name: "Beard Trim & Shape",
    category: "beard",
    price: 180,
    duration: 30,
    popular: true,
    description:
      "Shaped to your jawline, not a template. Finished with oil and a clean neckline.",
    includes: [
      "Beard mapping",
      "Clipper & scissor shaping",
      "Razor neckline & cheek line",
      "Beard oil finish",
    ],
  },
  {
    id: "hot-towel-shave",
    name: "Hot Towel Straight Razor Shave",
    category: "beard",
    price: 260,
    duration: 40,
    description:
      "The full ritual. Steam, pre-shave oil, badger brush lather and a straight razor pass.",
    includes: [
      "Double hot towel prep",
      "Pre-shave oil & badger brush lather",
      "Straight razor pass",
      "Cooling balm finish",
    ],
  },
  {
    id: "beard-sculpt",
    name: "Beard Sculpt & Treatment",
    category: "beard",
    price: 230,
    duration: 35,
    description:
      "For longer beards. Full restructure, deep conditioning and a shape that holds.",
    includes: [
      "Full beard restructure",
      "Deep conditioning treatment",
      "Razor outline",
      "Balm & comb-through",
    ],
  },

  // ---------- Packages ----------
  {
    id: "cut-and-beard",
    name: "Cut & Beard Combo",
    category: "packages",
    price: 420,
    duration: 75,
    popular: true,
    description:
      "The full reset. Signature cut plus a beard trim and shape in one sitting.",
    includes: [
      "Signature Cut",
      "Beard Trim & Shape",
      "Hot towel finish",
      "Save R40 vs. booking separately",
    ],
  },
  {
    id: "full-works",
    name: "The Full Works",
    category: "packages",
    price: 560,
    duration: 90,
    description:
      "Ninety minutes in the chair. Cut, straight razor shave, beard work and scalp treatment.",
    includes: [
      "Signature Cut",
      "Hot Towel Straight Razor Shave",
      "Beard Sculpt",
      "Scalp Detox Treatment",
      "Save R150 vs. booking separately",
    ],
  },
  {
    id: "father-son",
    name: "Father & Son",
    category: "packages",
    price: 420,
    duration: 75,
    description:
      "Two chairs, side by side. One adult cut and one kids cut, booked together.",
    includes: [
      "One adult Signature Cut",
      "One Kids Cut",
      "Side-by-side chairs",
      "Save R40 vs. booking separately",
    ],
  },

  // ---------- Extras ----------
  {
    id: "grey-blend",
    name: "Grey Blending",
    category: "extras",
    price: 220,
    duration: 30,
    description:
      "Softens grey without looking dyed. Natural, gradual and undetectable in daylight.",
    includes: [
      "Colour consultation",
      "Ammonia-free blend",
      "Processing time",
      "Wash & style",
    ],
  },
  {
    id: "scalp-detox",
    name: "Scalp Detox Treatment",
    category: "extras",
    price: 200,
    duration: 30,
    description:
      "Exfoliating scrub, clarifying wash and a five-minute pressure-point massage.",
    includes: [
      "Exfoliating scalp scrub",
      "Clarifying wash",
      "Pressure-point massage",
      "Toning finish",
    ],
  },
];

export const servicesById = services.reduce((acc, s) => {
  acc[s.id] = s;
  return acc;
}, {});

export function getServiceById(id) {
  return servicesById[id] ?? null;
}

export function getServicesByCategory(categoryId) {
  return services.filter((s) => s.category === categoryId);
}

export function formatPrice(amount) {
  return `R${amount.toLocaleString("en-ZA")}`;
}

export function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
}
