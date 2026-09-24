import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import Reveal from "@/components/ui/Reveal";
import { services } from "@/lib/services";

export default function ServicesPreview() {
  const featured = services.filter((s) => s.popular).slice(0, 4);

  return (
    <section className="container-x py-20 sm:py-24 lg:py-28">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="What we do"
          title="Services built around the chair, not the clock"
          description="Every service starts with a consultation. We'd rather take an extra ten minutes than send you out with a cut that doesn't sit right."
        />
        <Reveal delay={0.1} className="shrink-0">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-teal-700 transition-colors hover:text-ink"
          >
            All services &amp; prices
            <FiArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((service, i) => (
          <Reveal key={service.id} delay={i * 0.07}>
            <ServiceCard service={service} compact className="h-full" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
