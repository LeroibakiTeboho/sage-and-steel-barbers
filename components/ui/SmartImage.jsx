"use client";

import Image from "next/image";
import { useState } from "react";
import { cx } from "@/lib/utils";
import { LogoMark } from "./Logo";

/**
 * next/image wrapper with a graceful branded fallback so a failed
 * remote image never leaves a broken-image icon on the page.
 */
export default function SmartImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className,
  wrapperClassName,
  sizes = "100vw",
  priority = false,
  objectPosition = "center",
}) {
  const [failed, setFailed] = useState(false);

  const fallback = (
    <div
      role="img"
      aria-label={alt}
      className={cx(
        "flex items-center justify-center overflow-hidden",
        "bg-[linear-gradient(135deg,#32292f_0%,#4a3e46_45%,#467478_100%)]",
        fill ? "absolute inset-0 h-full w-full" : "h-full w-full",
        wrapperClassName,
      )}
    >
      <LogoMark className="h-14 w-14 text-mint/25" />
    </div>
  );

  if (failed) return fallback;

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={cx(
        fill ? "object-cover" : "h-auto w-full object-cover",
        className,
      )}
      style={{ objectPosition }}
    />
  );
}
