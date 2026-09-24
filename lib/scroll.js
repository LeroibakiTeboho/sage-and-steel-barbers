/**
 * Lenis-aware scroll helper.
 *
 * Lenis drives scrolling with its own RAF loop and internal position.
 * Calling `element.scrollIntoView()` or `window.scrollTo()` directly
 * causes the two systems to fight, which produces erratic jumps.
 *
 * This helper routes every scroll through Lenis when it's available,
 * and falls back to native scrolling when it isn't (e.g. when the user
 * has reduced motion enabled and Lenis is disabled entirely).
 *
 * Usage:
 *   scrollToTarget("booking")                 // element id
 *   scrollToTarget(errorRef.current)          // element ref
 *   scrollToTarget(0)                         // absolute Y
 *   scrollToTarget("booking", { offset: 80 }) // custom header offset
 *   scrollToTarget(0, { immediate: true })    // no animation
 */
export function scrollToTarget(target, options = {}) {
  if (typeof window === "undefined") return;

  const { offset = 80, duration = 0.9, immediate = false } = options;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const shouldJump = immediate || prefersReduced;

  /* ---------- Resolve target → absolute Y ---------- */
  let top;

  if (typeof target === "number") {
    top = Math.max(0, target);
  } else {
    const el =
      typeof target === "string" ? document.getElementById(target) : target;
    if (!el) return;
    top = el.getBoundingClientRect().top + window.scrollY - offset;
    if (top < 0) top = 0;
  }

  /* ---------- Route through Lenis if present ---------- */
  const lenis = window.__lenis;
  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.scrollTo(top, shouldJump ? { immediate: true } : { duration });
    return;
  }

  /* ---------- Fallback: native scroll ---------- */
  window.scrollTo({
    top,
    behavior: shouldJump ? "auto" : "smooth",
  });
}
