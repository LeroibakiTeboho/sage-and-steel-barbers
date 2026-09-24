import Link from "next/link";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import CtaBand from "@/components/sections/CtaBand";
import { serviceCategories, services, formatPrice } from "@/lib/services";

export const metadata = {
  title: "Services & Prices",
  description:
    "Haircuts, skin fades, beard trims, hot towel shaves, kids cuts and grooming packages at Sage & Steel Barber Co., Kloof Street, Cape Town.",
};

const FAQS = [
  {
    q: "Do I need to book, or can I walk in?",
    a: "Walk-ins are welcome before 11:00 when a chair is free, but booking guarantees your slot. Thursday and Friday evenings fill up a week in advance.",
  },
  {
    q: "How long does a skin fade take?",
    a: "Around 45 minutes. If you're adding beard work, allow 75 minutes for the Cut & Beard Combo.",
  },
  {
    q: "Do you cut children's hair?",
    a: "Yes. Our Kids Cut is for under-12s and we take it slowly — no rushing, no wriggle penalties. Naledi is our resident specialist.",
  },
  {
    q: "What if I'm not sure what I want?",
    a: "That's what the consultation is for. Bring a photo, bring three, or bring nothing and we'll work it out together before any blade comes out.",
  },
  {
    q: "How do I pay?",
    a: "Card or cash in-store. Prices include VAT. We don't take deposits for standard bookings.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden bg-ink pb-16 pt-32 text-cream sm:pb-20 sm:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-24 h-80 w-80 rounded-2xl bg-teal/15 blur-3xl"
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
                <li className="text-cream/75">Services</li>
              </ol>
            </nav>

            <h1 className="max-w-3xl text-[clamp(2.2rem,7vw,4.25rem)] text-cream">
              Services &amp; prices
            </h1>

            <p className="mt-6 max-w-2xl text-[0.98rem] leading-relaxed text-cream/70 sm:text-lg">
              Twelve services, four barbers, one standard. Every appointment
              starts with a consultation and ends with you knowing exactly how
              to keep it looking sharp.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/booking" size="lg" className="w-full sm:w-auto">
                Book an appointment
                <FiArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Category jump links */}
      <section className="container-x -mt-8">
        <Reveal>
          <ul className="flex flex-wrap gap-2 rounded-2xl border border-ink/10 bg-white/95 p-3 shadow-soft backdrop-blur">
            {serviceCategories.map((category) => (
              <li key={category.id}>
                <a
                  href={`#${category.id}`}
                  className="inline-block rounded-2xl px-4 py-2 text-[0.8rem] font-medium text-ink/70 transition-colors hover:bg-teal/10 hover:text-teal-700"
                >
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Categories */}
      <div className="container-x space-y-20 py-20 sm:py-24">
        {serviceCategories.map((category) => {
          const items = services.filter((s) => s.category === category.id);

          return (
            <section
              key={category.id}
              id={category.id}
              className="scroll-mt-28"
              aria-labelledby={`heading-${category.id}`}
            >
              <SectionHeading
                eyebrow={`${items.length} service${items.length === 1 ? "" : "s"}`}
                title={category.name}
                description={category.blurb}
              />

              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((service, i) => (
                  <Reveal key={service.id} delay={i * 0.06}>
                    <ServiceCard service={service} className="h-full" />
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Price summary table */}
      <section className="bg-cream-200 py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="At a glance"
            title="Full price list"
            description="All prices include VAT. Card and cash accepted in-store."
          />

          <Reveal className="mt-10">
            <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white/70">
              <table className="w-full text-left">
                <caption className="sr-only">
                  Sage &amp; Steel Barber Co. full service price list
                </caption>
                <thead>
                  <tr className="border-b border-ink/10 bg-white/60">
                    <th
                      scope="col"
                      className="px-5 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-clay"
                    >
                      Service
                    </th>
                    <th
                      scope="col"
                      className="hidden px-5 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-clay sm:table-cell"
                    >
                      Duration
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3.5 text-right text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-clay"
                    >
                      Price
                    </th>
                    <th scope="col" className="px-5 py-3.5">
                      <span className="sr-only">Book</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr
                      key={service.id}
                      className="border-b border-ink/8 last:border-0 transition-colors hover:bg-mint/[0.07]"
                    >
                      <th
                        scope="row"
                        className="px-5 py-4 text-left text-[0.85rem] font-medium text-ink"
                      >
                        {service.name}
                        {service.popular && (
                          <span className="ml-2 rounded-2xl bg-mint/35 px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-widest text-teal-700 align-middle">
                            Popular
                          </span>
                        )}
                        <span className="mt-0.5 block text-[0.72rem] font-normal text-ink/45 sm:hidden">
                          {service.duration} min
                        </span>
                      </th>
                      <td className="hidden px-5 py-4 text-[0.8rem] text-ink/55 sm:table-cell">
                        {service.duration} min
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-right font-display text-[0.95rem] text-teal-700">
                        {formatPrice(service.price)}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/booking?service=${service.id}`}
                          className="inline-flex items-center gap-1 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:text-teal-700"
                        >
                          Book
                          <FiArrowRight
                            className="h-3 w-3"
                            aria-hidden="true"
                          />
                          <span className="sr-only"> {service.name}</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQs — exclusive accordion via native `name` attribute.
          Opening one FAQ automatically closes any other open FAQ. */}
      <section className="container-x py-20 sm:py-24">
        <SectionHeading
          eyebrow="Good to know"
          title="Common questions"
          align="center"
          className="mx-auto max-w-2xl"
        />

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {FAQS.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 0.05}>
              <details
                name="services-faq"
                className="group rounded-2xl border border-ink/10 bg-white/60 p-5 transition-colors open:bg-white"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[0.92rem] font-medium text-ink marker:hidden">
                  {faq.q}
                  <span className="mt-0.5 shrink-0 text-teal-700 transition-transform group-open:rotate-45">
                    <FiCheck className="hidden" aria-hidden="true" />
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M8 2v12M2 8h12"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-[0.85rem] leading-relaxed text-ink/65">
                  {faq.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        eyebrow="Pick your service"
        title="Ready to book your chair?"
        description="Choose your service, pick your barber and lock in a time. Takes less than a minute, and you get a calendar invite straight away."
      />
    </>
  );
}
