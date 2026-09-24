import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import BarberCard from "@/components/ui/BarberCard";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import SmartImage from "@/components/ui/SmartImage";
import CtaBand from "@/components/sections/CtaBand";
import { barbers } from "@/lib/barbers";
import { images } from "@/lib/images";
import { business } from "@/lib/business";

export const metadata = {
  title: "About",
  description:
    "The story behind Sage & Steel Barber Co. — a four-chair barbershop on Kloof Street, Cape Town, opened in 2014 by Marco Ferreira.",
};

const VALUES = [
  {
    number: "01",
    title: "Consultation before clippers",
    body: "Every appointment starts with a conversation about your hairline, growth pattern, and how much effort you're actually willing to put in at home. We cut for real life.",
  },
  {
    number: "02",
    title: "One chair, one customer",
    body: "We don't double-book. Your slot is yours. If the shop gets busy, that's our problem, not a reason to rush your fade.",
  },
  {
    number: "03",
    title: "Cut for the regrowth",
    body: "A good haircut still looks intentional three weeks later. We shape for how it grows out, not just how it photographs on the day.",
  },
  {
    number: "04",
    title: "Standards over shortcuts",
    body: "Fresh blades, sanitised tools, proper hot towels. Every single time. There is no version of busy that makes that optional.",
  },
];

const TIMELINE = [
  {
    year: "2014",
    text: "Marco opens with two chairs and one kettle at 118 Kloof Street.",
  },
  {
    year: "2016",
    text: "Thandiwe joins and the shop starts booking out a week ahead.",
  },
  {
    year: "2019",
    text: "We expand to four chairs and add the hot towel shave service.",
  },
  {
    year: "2021",
    text: "Jesse and Naledi come on board. Kids cuts land on the menu.",
  },
  {
    year: "2024",
    text: "12,000 cuts and a 4.9 rating later, we're still on Kloof Street.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink pb-16 pt-32 text-cream sm:pb-20 sm:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-2xl bg-teal/15 blur-3xl"
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
                <li className="text-cream/75">About</li>
              </ol>
            </nav>

            <h1 className="max-w-3xl text-[clamp(2.2rem,7vw,4.25rem)] text-cream">
              Ten years on the same corner
            </h1>

            <p className="mt-6 max-w-2xl text-[0.98rem] leading-relaxed text-cream/70 sm:text-lg">
              {business.fullName} opened in {business.established} with a
              stubborn idea: that a haircut should be an occasion, not an
              errand. Four chairs later, that hasn&apos;t changed.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="container-x py-20 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl lg:aspect-4/5">
              <SmartImage
                src={'/images/about/about.jpg'}
                alt="Marco Ferreira working at the Sage & Steel barber chair"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
              />
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Our story"
              title="Built on the belief that nobody should leave with a cut they didn't ask for"
            />

            <div className="mt-6 space-y-4 text-[0.93rem] leading-relaxed text-ink/70">
              <p>
                Marco Ferreira spent fifteen years behind chairs in Lisbon and
                Cape Town before opening Sage &amp; Steel. He&apos;d worked in
                shops where success was measured in heads per hour — where a
                consultation was a formality and a fade was a race.
              </p>
              <p>
                He wanted the opposite. Four chairs, no double-booking, and a
                standing rule that nobody leaves the shop without knowing
                exactly how to keep their cut looking sharp at home.
              </p>
              <p>
                A decade later, that rule hasn&apos;t moved. Neither has the
                address. What&apos;s changed is the team — Thandiwe, Jesse and
                Naledi each brought their own speciality, and between them
                they&apos;ve now handled more than twelve thousand appointments
                on this corner.
              </p>
            </div>

            <Button href="/booking" size="lg" className="mt-8">
              Book an appointment
              <FiArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream-200 py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="How we work"
            title="Four rules we don't bend"
            align="center"
            className="mx-auto max-w-2xl"
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {VALUES.map((value, i) => (
              <Reveal key={value.number} delay={i * 0.07}>
                <article className="h-full rounded-2xl border border-ink/10 bg-white/70 p-6 sm:p-7">
                  <span className="font-display text-3xl text-teal/50">
                    {value.number}
                  </span>
                  <h3 className="mt-4 font-display text-xl text-ink">
                    {value.title}
                  </h3>
                  <p className="mt-2.5 text-[0.87rem] leading-relaxed text-ink/65">
                    {value.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container-x py-20 sm:py-24">
        <SectionHeading
          eyebrow="The chairs"
          title="Meet your barbers"
          description="Four barbers, four specialities, one shared standard. Pick your favourite when you book — or let us match you."
          align="center"
          className="mx-auto max-w-2xl"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {barbers.map((barber, i) => (
            <Reveal key={barber.id} delay={i * 0.07}>
              <BarberCard barber={barber} className="h-full" />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 flex justify-center">
          <Button href="/booking" size="lg">
            Book with a barber
            <FiArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </Reveal>
      </section>

      {/* Timeline */}
      <section className="relative overflow-hidden bg-ink py-20 text-cream sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-2xl bg-mint/10 blur-3xl"
        />
        <div className="container-x relative">
          <SectionHeading
            eyebrow="Milestones"
            title="A decade, roughly"
            tone="light"
          />

          <ol className="mt-12 space-y-0">
            {TIMELINE.map((item, i) => (
              <Reveal as="li" key={item.year} delay={i * 0.06}>
                <div className="flex gap-6 border-b border-cream/10 py-6 last:border-0 sm:gap-10">
                  <span className="w-16 shrink-0 font-display text-xl text-mint sm:w-24 sm:text-2xl">
                    {item.year}
                  </span>
                  <p className="pt-1 text-[0.9rem] leading-relaxed text-cream/70 sm:text-base">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        eyebrow="Come sit down"
        title="Your chair is waiting"
        description="Book online in under a minute. Pick your service, choose your barber, and we'll see you on Kloof Street."
      />
    </>
  );
}
