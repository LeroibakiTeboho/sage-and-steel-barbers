export const barbers = [
  {
    id: "marco",
    name: "Marco Ferreira",
    role: "Founder & Master Barber",
    years: 18,
    initials: "MF",
    bio: "Marco opened Sage & Steel in 2014 after fifteen years behind chairs in Lisbon and Cape Town. He cuts classically, slowly, and refuses to rush a fade.",
    specialties: [
      "Classic scissor cuts",
      "Straight razor work",
      "Grey blending",
    ],
    worksDays: [1, 2, 3, 4, 5],
  },
  {
    id: "bongani",
    name: "Bongani Mokoena",
    role: "Senior Barber",
    years: 9,
    initials: "TM",
    bio: "Bongani is the reason half of Cape Town's sharpest fades exist. Precise, fast and relentlessly consistent with a blade.",
    specialties: ["Skin fades", "Textured crops", "Taper blends"],
    worksDays: [2, 3, 4, 5, 6],
  },
  {
    id: "jesse",
    name: "Jesse van Wyk",
    role: "Barber & Beard Specialist",
    years: 7,
    initials: "JW",
    bio: "Jesse treats a beard like architecture. If yours has lost its shape, he'll find it again — and tell you exactly how to keep it.",
    specialties: ["Beard sculpting", "Hot towel shaves", "Long beard care"],
    worksDays: [1, 2, 4, 5, 6],
  },
  {
    id: "naledi",
    name: "Naledi Khumalo",
    role: "Barber",
    years: 5,
    initials: "NK",
    bio: "Naledi joined us from a salon background and brought a lighter touch with her. Brilliant with kids, fringes and first haircuts.",
    specialties: ["Kids cuts", "Modern styles", "Fringe work"],
    worksDays: [1, 3, 4, 5, 6],
  },
];

export const barbersById = barbers.reduce((acc, b) => {
  acc[b.id] = b;
  return acc;
}, {});

export function getBarberById(id) {
  return barbersById[id] ?? null;
}

export const ANY_BARBER_ID = "any";

export const anyBarberOption = {
  id: ANY_BARBER_ID,
  name: "First available",
  role: "We'll match you with the right barber",
  initials: "★",
  bio: "Not fussy? We'll put you with whoever has the next open chair.",
  specialties: [],
};
