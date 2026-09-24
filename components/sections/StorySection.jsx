import { FiArrowRight } from "react-icons/fi";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SmartImage from "@/components/ui/SmartImage";
import { images } from "@/lib/images";

const PILLARS = [
  {
    title: "Consultation first",
    body: "We look at your hairline, growth pattern and how you actually style it at home — before a blade touches anything.",
  },
  {
    title: "Time, not throughput",
    body: "We don't double-book chairs. Your slot is yours, and it doesn't get squeezed when the shop gets busy.",
  },
  {
    title: "Built to grow out",
    body: "A good cut still looks intentional three weeks later. We cut for the regrowth, not just the photo.",
  },
];

export default function StorySection() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-cream sm:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-2xl bg-teal/10 blur-3xl"
      />

      <div className="container-x relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <Reveal className="order-2 lg:order-1">
            <div className="relative">
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl sm:aspect-5/6">
                <SmartImage
                  src={images.shopInterior}
                  alt="Interior of Sage & Steel Barber Co. on Kloof Street, Cape Town"
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                />
              </div>

              <div className="absolute -bottom-5 -right-3 max-w-52 rounded-2xl border border-cream/10 bg-ink/95 p-4 backdrop-blur sm:-right-5 sm:max-w-60 sm:p-5">
                <p className="font-display text-3xl text-mint sm:text-4xl">
                  2014
                </p>
                <p className="mt-1 text-[0.72rem] leading-snug text-cream/60">
                  Two chairs, one kettle, and a stubborn belief that a haircut
                  should be an occasion.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="mb-4 inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-mint">
                <span className="h-px w-6 bg-mint/60" />
                Our story
              </span>
              <h2 className="text-[clamp(1.85rem,5vw,3.25rem)] text-cream">
                A barbershop that takes its time
              </h2>
              <p className="mt-5 text-[0.95rem] leading-relaxed text-cream/70 sm:text-base">
                Marco opened Sage &amp; Steel after fifteen years behind chairs
                in Lisbon and Cape Town. He was tired of barbershops that
                measured success in heads per hour, so he built the opposite:
                four chairs, no double-booking, and a standing rule that nobody
                leaves the shop without knowing exactly how to keep their cut
                looking sharp.
              </p>
            </Reveal>

            <ul className="mt-9 space-y-6">
              {PILLARS.map((pillar, i) => (
                <Reveal as="li" key={pillar.title} delay={0.08 * (i + 1)}>
                  <div className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-2xl bg-mint"
                    />
                    <div>
                      <h3 className="font-display text-lg text-cream">
                        {pillar.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-cream/60">
                        {pillar.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.3}>
              <Button href="/about" variant="outlineLight" className="mt-10">
                Meet the team
                <FiArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
