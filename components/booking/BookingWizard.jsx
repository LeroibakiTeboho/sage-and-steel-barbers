"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiArrowRight,
  FiLoader,
} from "react-icons/fi";
import Button from "@/components/ui/Button";
import Stepper from "./Stepper";
import StepService from "./StepService";
import StepBarber from "./StepBarber";
import StepSchedule from "./StepSchedule";
import StepDetails from "./StepDetails";
import StepConfirmed from "./StepConfirmed";
import BookingSummary from "./BookingSummary";
import { servicesById } from "@/lib/services";
import { barbersById, ANY_BARBER_ID } from "@/lib/barbers";
import { validateStep } from "@/lib/booking";
import { scrollToTarget } from "@/lib/scroll";
import { PROMO_STORAGE_KEY, findPromo } from "../../lib/promos";
const STEPS = ["Service", "Barber", "Date & time", "Details", "Confirmed"];

const EMPTY_BOOKING = {
  serviceId: null,
  barberId: null,
  date: null,
  time: null,
  name: "",
  email: "",
  phone: "",
  notes: "",
  promoCode: null,
};

const DRAFT_KEY = "sas-booking-draft";
const LAST_BOOKING_KEY = "sas-last-booking";

function makeReference() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i += 1) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return `SS-${out}`;
}

/**
 * Resolve the wizard's initial booking state.
 *
 * Runs exactly once per mount, as a `useState` lazy initializer — never
 * inside an effect — so it cannot trigger cascading renders.
 *
 * Precedence:
 *   1. Deep-link query params  (?service=…&barber=…)
 *   2. In-progress draft       (sessionStorage)
 *   3. Empty defaults
 *
 * Note: BookingWizard uses `useSearchParams()` and is wrapped in a Suspense
 * boundary by the page, so this subtree is client-side rendered only. Reading
 * `window.sessionStorage` here therefore cannot cause a hydration mismatch.
 */
function resolveInitialBooking(searchParams) {
  const initial = { ...EMPTY_BOOKING };

  /* 1. Deep links from service / barber cards */
  const preService = searchParams.get("service");
  if (preService && servicesById[preService]) {
    initial.serviceId = preService;
  }

  const preBarber = searchParams.get("barber");
  if (preBarber && (barbersById[preBarber] || preBarber === ANY_BARBER_ID)) {
    initial.barberId = preBarber;
  }

  /* 2. Restore any in-progress draft — URL params take precedence */
  if (typeof window !== "undefined") {
    try {
      const raw = window.sessionStorage.getItem(DRAFT_KEY);
      if (raw) {
        const saved = JSON.parse(raw);

        if (!initial.serviceId && servicesById[saved.serviceId]) {
          initial.serviceId = saved.serviceId;
        }
        if (
          !initial.barberId &&
          (barbersById[saved.barberId] || saved.barberId === ANY_BARBER_ID)
        ) {
          initial.barberId = saved.barberId;
        }
        if (!initial.date && saved.date) initial.date = saved.date;
        if (!initial.time && saved.time) initial.time = saved.time;
        if (!initial.name && saved.name) initial.name = saved.name;
        if (!initial.email && saved.email) initial.email = saved.email;
        if (!initial.phone && saved.phone) initial.phone = saved.phone;
        if (!initial.notes && saved.notes) initial.notes = saved.notes;
      }
    } catch {
      /* ignore corrupt drafts */
    }
  }

  /* 3. Promo code seeded by the modal or by a ?promo= deep link */
  const urlPromo = searchParams.get("promo");
  if (urlPromo && findPromo(urlPromo)) {
    initial.promoCode = urlPromo.trim().toUpperCase();
  }

  if (!initial.promoCode && typeof window !== "undefined") {
    try {
      const raw = window.sessionStorage.getItem(PROMO_STORAGE_KEY);
      if (raw && findPromo(raw)) {
        initial.promoCode = raw.trim().toUpperCase();
      }
    } catch {
      /* ignore */
    }
  }

  return initial;
}

export default function BookingWizard() {
  const searchParams = useSearchParams();
  const reduceMotion = useReducedMotion();

  const [step, setStep] = useState(0);
  const [maxReached, setMaxReached] = useState(0);
  const [booking, setBooking] = useState(() =>
    resolveInitialBooking(searchParams),
  );
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting
  const [reference, setReference] = useState(null);

  const headingRef = useRef(null);
  const errorRef = useRef(null);

  /* ---------- Persist in-progress draft ----------
     This effect only writes to an external system (sessionStorage) —
     it never calls setState, so it does not violate the rule.          */
  useEffect(() => {
    if (step >= STEPS.length - 1) return;
    try {
      window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(booking));
    } catch {
      /* ignore */
    }
  }, [booking, step]);

  /* ---------- Scroll active step into view ----------
     DOM side-effect only — no setState.                                */
  useEffect(() => {
    if (step === 0) return;

    if (errorRef.current) {
      scrollToTarget(errorRef.current, { offset: 120 });
      return;
    }

    scrollToTarget("booking", { offset: 96 });
  }, [step]);

  const update = useCallback((patch) => {
    setBooking((prev) => {
      const next = { ...prev, ...patch };

      /* If the service changed, re-check any applied promo.
       A R50-off-over-R200 code must not survive a switch to a R180 cut. */
      if (patch.serviceId !== undefined && next.promoCode) {
        const service = servicesById[next.serviceId];
        const promo = findPromo(next.promoCode);
        if (
          !promo ||
          !service ||
          (promo.minSpend && service.price < promo.minSpend)
        ) {
          next.promoCode = null;
        }
      }

      return next;
    });

    setErrors((prev) => {
      const next = { ...prev };
      Object.keys(patch).forEach((key) => delete next[key]);
      return next;
    });
  }, []);

  const goNext = () => {
    const stepErrors = validateStep(step, booking);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      requestAnimationFrame(() => {
        if (errorRef.current) {
          scrollToTarget(errorRef.current, { offset: 120 });
        }
      });
      return;
    }

    setErrors({});
    const next = Math.min(step + 1, STEPS.length - 1);
    setStep(next);
    setMaxReached((prev) => Math.max(prev, next));
  };

  const goBack = () => {
    setErrors({});
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const jumpTo = (index) => {
    setErrors({});
    setStep(index);
  };

  const submit = async () => {
    const stepErrors = validateStep(3, booking);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setStatus("submitting");

    // Simulated network round-trip so the UI shows a real processing state.
    await new Promise((resolve) => setTimeout(resolve, 950));

    const ref = makeReference();
    setReference(ref);

    try {
      window.sessionStorage.setItem(
        LAST_BOOKING_KEY,
        JSON.stringify({
          ...booking,
          reference: ref,
          createdAt: new Date().toISOString(),
        }),
      );
      window.sessionStorage.removeItem(DRAFT_KEY);
      window.sessionStorage.removeItem(PROMO_STORAGE_KEY);
    } catch {
      /* ignore */
    }

    setStatus("idle");
    setStep(4);
    setMaxReached(4);
    scrollToTarget(0);
  };

  const bookAnother = () => {
    setBooking(EMPTY_BOOKING);
    setErrors({});
    setReference(null);
    setStep(0);
    setMaxReached(0);
    try {
      window.sessionStorage.removeItem(LAST_BOOKING_KEY);
    } catch {
      /* ignore */
    }
    scrollToTarget(0);
  };

  const selectedService = useMemo(
    () => (booking.serviceId ? servicesById[booking.serviceId] : null),
    [booking.serviceId],
  );

  const isConfirmed = step === STEPS.length - 1;

  const stepContent = (() => {
    switch (step) {
      case 0:
        return (
          <StepService
            value={booking.serviceId}
            onChange={(serviceId) => update({ serviceId })}
          />
        );
      case 1:
        return (
          <StepBarber
            value={booking.barberId}
            onChange={(barberId) => update({ barberId })}
            serviceName={selectedService?.name}
          />
        );
      case 2:
        return <StepSchedule booking={booking} onChange={update} />;
      case 3:
        return (
          <StepDetails
            booking={booking}
            onChange={update}
            errors={errors}
            onApplyPromo={(promoCode) => update({ promoCode })}
            onRemovePromo={() => update({ promoCode: null })}
          />
        );
      default:
        return (
          <StepConfirmed
            booking={booking}
            reference={reference}
            onBookAnother={bookAnother}
          />
        );
    }
  })();

  const firstError = Object.values(errors)[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10">
      {/* Main column */}
      <div className="min-w-0">
        {!isConfirmed && (
          <Stepper
            steps={STEPS.slice(0, 4)}
            current={step}
            maxReached={maxReached}
            onStepClick={jumpTo}
          />
        )}

        <div ref={headingRef} className="scroll-mt-32" />

        {firstError && (
          <div
            ref={errorRef}
            role="alert"
            className="mt-6 flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-4 text-[0.82rem] text-red-800 scroll-mt-32"
          >
            <FiAlertCircle
              className="mt-0.5 h-4 w-4 shrink-0"
              aria-hidden="true"
            />
            <p>{firstError}</p>
          </div>
        )}

        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={reduceMotion ? false : { opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -16 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {stepContent}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile summary */}
        {!isConfirmed && (
          <div className="mt-8 lg:hidden">
            <BookingSummary booking={booking} />
          </div>
        )}

        {/* Nav */}
        {!isConfirmed && (
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button
              variant="ghost"
              onClick={goBack}
              disabled={step === 0 || status === "submitting"}
              className="w-full sm:w-auto"
            >
              <FiArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </Button>

            {step === 3 ? (
              <Button
                onClick={submit}
                size="lg"
                disabled={status === "submitting"}
                className="w-full sm:w-auto sm:min-w-60"
              >
                {status === "submitting" ? (
                  <>
                    <FiLoader
                      className="h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                    Confirming…
                  </>
                ) : (
                  <>
                    Confirm booking
                    <FiArrowRight className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={goNext}
                size="lg"
                className="w-full sm:w-auto sm:min-w-48"
              >
                Continue
                <FiArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Desktop summary rail */}
      {!isConfirmed && (
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <BookingSummary booking={booking} />
          </div>
        </aside>
      )}
    </div>
  );
}
