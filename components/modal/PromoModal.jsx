"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck, FiCopy, FiX } from "react-icons/fi";
import Button from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";
import { PROMO_STORAGE_KEY } from "@/lib/promos";

const STORAGE_KEY = "sas-promo-dismissed";
const SUPPRESS_DAYS = 7;
const OPEN_DELAY_MS = 6500;
const PROMO_CODE = "FIRSTCUT50";

function isSuppressed() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const dismissedAt = Number(raw);
    if (Number.isNaN(dismissedAt)) return false;
    return Date.now() - dismissedAt < SUPPRESS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return true; // private mode / storage blocked → don't nag
  }
}

function rememberDismissal() {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}

export default function PromoModal() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const lastFocusedRef = useRef(null);

  /* ---- Open once, after a delay, on first visit ---- */
  useEffect(() => {
    if (isSuppressed()) return undefined;

    const hasSeen = sessionStorage.getItem("sas-promo-shown");
    if (hasSeen) return undefined;

    const timer = setTimeout(() => {
      setOpen(true);
      try {
        sessionStorage.setItem("sas-promo-shown", "1");
      } catch {
        /* ignore */
      }
    }, OPEN_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    rememberDismissal();
    lastFocusedRef.current?.focus?.();
  }, []);

  /* ---- Focus management, Escape, scroll lock, focus trap ---- */
  useEffect(() => {
    if (!open) return undefined;

    lastFocusedRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = setTimeout(() => closeButtonRef.current?.focus(), 60);

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusables = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
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

    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(PROMO_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const bookWithOffer = () => {
    try {
      window.sessionStorage.setItem(PROMO_STORAGE_KEY, PROMO_CODE);
    } catch {
      /* storage blocked — the code is still visible for manual entry */
    }
    close();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-100 flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close offer"
            onClick={close}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/70 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="promo-title"
            aria-describedby="promo-desc"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-cream/10 bg-ink text-cream shadow-lift"
          >
            {/* Decorative gradient */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-2xl bg-mint/15 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-2xl bg-teal/15 blur-3xl"
            />

            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Close offer"
              className="absolute right-3.5 top-3.5 z-10 inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-cream/15 text-cream/70 transition-colors hover:border-mint hover:text-mint"
            >
              <FiX className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="relative p-6 sm:p-8">
              <LogoMark className="h-11 w-11 text-mint" />

              <p className="mt-5 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-mint">
                First visit offer
              </p>

              <h2
                id="promo-title"
                className="mt-3 font-display text-[1.7rem] leading-tight text-cream sm:text-3xl"
              >
                R50 off your first cut
              </h2>

              <p
                id="promo-desc"
                className="mt-3 text-sm leading-relaxed text-cream/70"
              >
                New to the chair? Use the code below on any service over R200
                when you book online. Valid for your first appointment only.
              </p>

              <div className="mt-6 flex items-center gap-2 rounded-2xl border border-dashed border-mint/40 bg-mint/[0.07] p-3.5">
                <span className="flex-1 font-mono text-base font-semibold tracking-[0.16em] text-mint">
                  {PROMO_CODE}
                </span>
                <button
                  type="button"
                  onClick={copyCode}
                  className="inline-flex items-center gap-1.5 rounded-2xl bg-mint/15 px-3 py-2 text-xs font-semibold text-mint transition-colors hover:bg-mint/25"
                >
                  {copied ? (
                    <>
                      <FiCheck className="h-3.5 w-3.5" aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <FiCopy className="h-3.5 w-3.5" aria-hidden="true" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <Button
                  href="/booking"
                  onClick={bookWithOffer}
                  className="flex-1"
                  size="md"
                >
                  Book with this offer
                </Button>
                <Button
                  variant="outlineLight"
                  onClick={close}
                  size="md"
                  className="sm:w-auto"
                >
                  Maybe later
                </Button>
              </div>

              <p className="mt-4 text-center text-[0.68rem] leading-relaxed text-cream/40 sm:text-left">
                One per customer. Cannot be combined with other promotions.
                Mention the code at your appointment.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
