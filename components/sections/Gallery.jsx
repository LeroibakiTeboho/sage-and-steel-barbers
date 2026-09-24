"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
  FiX,
} from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import SmartImage from "@/components/ui/SmartImage";
import { galleryImages } from "@/lib/gallery";

/* ------------------------------------------------------------------ */
/* Lightbox                                                            */
/* ------------------------------------------------------------------ */

function GalleryLightbox({ images, index, onClose, onPrev, onNext }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const lastFocusedRef = useRef(null);

  /* Focus management, scroll lock, Lenis pause */
  useEffect(() => {
    lastFocusedRef.current = document.activeElement;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const lenis = typeof window !== "undefined" ? window.__lenis : null;
    lenis?.stop?.();

    const focusTimer = setTimeout(() => closeButtonRef.current?.focus(), 40);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      lenis?.start?.();
      lastFocusedRef.current?.focus?.();
    };
  }, []);

  /* Keyboard: Escape / ← / → / Tab focus trap */
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrev();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusables = dialogRef.current.querySelectorAll(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, onPrev, onNext]);

  const image = images[index];
  if (!image) return null;

  const counter = `${String(index + 1).padStart(2, "0")} / ${String(
    images.length,
  ).padStart(2, "0")}`;

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close gallery"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/95 backdrop-blur-sm"
      />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Photo ${index + 1} of ${images.length}: ${image.alt}`}
        className="relative z-10 flex h-full w-full max-w-6xl flex-col"
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.97, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between pb-4">
          <span
            aria-live="polite"
            className="rounded-full border border-cream/15 bg-cream/5 px-3 py-1.5 text-[0.68rem] font-semibold tracking-[0.16em] text-cream/80 backdrop-blur"
          >
            {counter}
          </span>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-mint hover:text-mint"
          >
            <FiX className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Image stage */}
        <div className="relative flex flex-1 items-center justify-center overflow-hidden">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous photo"
            className="absolute left-1 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink/70 text-cream backdrop-blur transition-all hover:bg-ink hover:text-mint sm:left-3"
          >
            <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={image.src}
              className="flex h-full w-full items-center justify-center"
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.22 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 1024px) 100vw, 1100px"
                className="max-h-full w-auto max-w-full rounded-2xl object-contain"
              />
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={onNext}
            aria-label="Next photo"
            className="absolute right-1 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink/70 text-cream backdrop-blur transition-all hover:bg-ink hover:text-mint sm:right-3"
          >
            <FiChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Caption */}
        <p className="px-14 pt-4 text-center text-[0.82rem] leading-relaxed text-cream/70">
          {image.alt}
        </p>

        <p className="pt-2 text-center text-[0.65rem] uppercase tracking-[0.2em] text-cream/35">
          ← → to browse · Esc to close
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Gallery section                                                     */
/* ------------------------------------------------------------------ */

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(null);
  const reduceMotion = useReducedMotion();

  const open = useCallback((i) => setOpenIndex(i), []);
  const close = useCallback(() => setOpenIndex(null), []);

  const goPrev = useCallback(() => {
    setOpenIndex((i) =>
      i === null ? i : (i - 1 + galleryImages.length) % galleryImages.length,
    );
  }, []);

  const goNext = useCallback(() => {
    setOpenIndex((i) => (i === null ? i : (i + 1) % galleryImages.length));
  }, []);

  if (galleryImages.length === 0) return null;

  return (
    <section className="container-x py-20 sm:py-24 lg:py-28">
      <SectionHeading
        eyebrow="Inside the shop"
        title="A look around the chairs"
        description="Real cuts, real light, no filters. Tap any photo to see it full size — arrow keys move through the set."
        align="center"
        className="mx-auto max-w-2xl"
      />

      <Reveal className="mt-12">
        <div className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
          {galleryImages.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => open(i)}
              aria-label={`View photo ${i + 1} of ${galleryImages.length}: ${img.alt}`}
              style={{ aspectRatio: `${img.width} / ${img.height}` }}
              className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 sm:mb-4"
            >
              <SmartImage
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={
                  reduceMotion
                    ? ""
                    : "transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                }
              />

              {/* Hover overlay */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
              />

              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:p-4"
              >
                <span className="line-clamp-2 pr-2 text-left text-[0.7rem] font-medium leading-snug text-cream/90">
                  {img.alt}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream/15 text-cream backdrop-blur-sm">
                  <FiMaximize2 className="h-3.5 w-3.5" />
                </span>
              </span>
            </button>
          ))}
        </div>
      </Reveal>

      <AnimatePresence>
        {openIndex !== null && (
          <GalleryLightbox
            images={galleryImages}
            index={openIndex}
            onClose={close}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
