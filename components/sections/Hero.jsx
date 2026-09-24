"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiStar } from "react-icons/fi";
import Button from "@/components/ui/Button";
import SmartImage from "@/components/ui/SmartImage";
import { images } from "@/lib/images";
import { business } from "@/lib/business";
import { trustStats } from "@/lib/testimonials";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.20, delayChildren: 0.08 } },
  };

  const item = reduceMotion
    ? {}
    : {
        hidden: { opacity: 0, y: 22 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <section className="relative isolate flex min-h-svh items-end overflow-hidden bg-ink pb-14 pt-32 sm:pb-20 lg:min-h-[92vh] lg:pt-40">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <SmartImage
          src={images.heroBarber}
          alt="Barber shaping a client's fade with clippers at Sage & Steel Barber Co."
          fill
          priority
          sizes="100vw"
          objectPosition="center 35%"
        />
        <div className="absolute inset-0 bg-linear-to-b from-ink/85 via-ink/60 to-ink" />
        <div className="absolute inset-0 bg-linear-to-r from-ink/90 via-ink/40 to-transparent" />
      </div>

      <div className="container-x w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="inline-flex items-center gap-1.5 rounded-2xl border border-mint/25 bg-mint/8 px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-mint backdrop-blur">
              <FiStar className="h-3 w-3 fill-mint" aria-hidden="true" />
              {business.rating} · {business.reviewCount} reviews
            </span>
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-cream/50">
              Kloof Street · Since {business.established}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-[clamp(2.5rem,9vw,5.5rem)] leading-[0.95] text-cream"
          >
            Sharp cuts.
            <br />
            <span className="text-mint">Steady hands.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-cream/75 sm:text-lg"
          >
            A modern barbershop in the heart of Gardens, Cape Town. Precision
            cuts, proper beard work, and a chair that feels like yours — book in
            under a minute.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button href="/booking" size="lg" className="w-full sm:w-auto">
              Book an appointment
              <FiArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              href="/services"
              variant="outlineLight"
              size="lg"
              className="w-full sm:w-auto"
            >
              View services &amp; prices
            </Button>
          </motion.div>

          {/* Trust stats */}
          <motion.dl
            variants={item}
            className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-cream/10 pt-8 sm:grid-cols-4"
          >
            {trustStats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-2xl text-mint sm:text-[1.75rem]">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-[0.7rem] leading-snug text-cream/50">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}
