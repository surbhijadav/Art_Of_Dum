"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import type { MenuImage } from "@/lib/images";

export interface CarouselSlide {
  image: MenuImage;
  /** object-position tuned to the photo's subject */
  position: string;
  /** next/image sizes hint */
  sizes?: string;
}

interface EditorialCarouselProps {
  slides: CarouselSlide[];
  /** Accessible name for the carousel viewport */
  label: string;
  /** Slide aspect ratio class (defaults to portrait 3:4) */
  aspect?: string;
  /** Render slides as elevated premium cards (rounded corners, soft shadow, hover lift) */
  card?: boolean;
  /** Optional per-slide caption rendered for the active slide */
  renderCaption?: (slide: CarouselSlide, index: number) => React.ReactNode;
}

const DEFAULT_SIZES = "(min-width: 1024px) 560px, (min-width: 768px) 50vw, 75vw";

interface Geometry {
  slideW: number;
  gap: number;
  viewW: number;
}

/**
 * Shared editorial carousel: dominant centered slide, partially visible
 * neighbours, drag/swipe + arrows + keyboard + pagination, clamped at the
 * ends, subtle GSAP transitions, reduced-motion aware.
 */
export default function EditorialCarousel({
  slides,
  label,
  aspect = "aspect-[3/4]",
  card = false,
  renderCaption,
}: EditorialCarouselProps) {
  const lastIndex = slides.length - 1;
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const geometry = useRef<Geometry>({ slideW: 0, gap: 0, viewW: 0 });
  const drag = useRef<{
    startX: number;
    startTrackX: number;
    lastX: number;
    lastT: number;
  } | null>(null);

  const prefersReducedMotion = useCallback(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  /**
   * Track x position for a given slide index, clamped so the track
   * never leaves empty space: the first slide starts flush left and
   * the last ends flush right (centered in between).
   */
  const xForIndex = useCallback(
    (index: number) => {
      const { slideW, gap, viewW } = geometry.current;
      const step = slideW + gap;
      const trackW =
        slides.length * slideW + (slides.length - 1) * gap;
      const desired = (viewW - slideW) / 2 - index * step;
      const minX = Math.min(0, viewW - trackW);
      return Math.max(minX, Math.min(0, desired));
    },
    [slides.length]
  );

  const applyX = useCallback(
    (index: number, animate: boolean) => {
      const track = trackRef.current;
      if (!track) return;
      const x = xForIndex(index);
      if (!animate || prefersReducedMotion()) {
        gsap.set(track, { x });
      } else {
        gsap.to(track, { x, duration: 0.8, ease: "power3.out" });
      }
    },
    [xForIndex, prefersReducedMotion]
  );

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(lastIndex, index));
      if (clamped === activeRef.current) {
        applyX(clamped, true);
        return;
      }
      activeRef.current = clamped;
      setActive(clamped);
      applyX(clamped, true);
    },
    [applyX, lastIndex]
  );

  const measure = useCallback(
    (animate: boolean) => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;
      const viewW = viewport.clientWidth;
      const ratio = viewW < 768 ? 0.72 : viewW < 1024 ? 0.46 : 0.38;
      const cap = viewW < 768 ? 420 : viewW < 1024 ? 480 : 560;
      const gap = viewW < 768 ? 16 : viewW < 1280 ? 24 : 32;
      const slideW = Math.min(Math.round(viewW * ratio), cap);
      geometry.current = { slideW, gap, viewW };
      track.style.setProperty("--slide-w", `${slideW}px`);
      track.style.gap = `${gap}px`;
      applyX(activeRef.current, animate);
    },
    [applyX]
  );

  useEffect(() => {
    measure(false);
    const onResize = () => measure(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measure]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(activeRef.current - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(activeRef.current + 1);
    }
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    track.setPointerCapture?.(e.pointerId);
    gsap.killTweensOf(track);
    drag.current = {
      startX: e.clientX,
      startTrackX: gsap.getProperty(track, "x") as number,
      lastX: e.clientX,
      lastT: performance.now(),
    };
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    const track = trackRef.current;
    if (!state || !track) return;
    const dx = e.clientX - state.startX;
    const { slideW, gap, viewW } = geometry.current;
    const trackW =
      slides.length * slideW + (slides.length - 1) * gap;
    const maxX = 0;
    const minX = Math.min(0, viewW - trackW);
    let target = state.startTrackX + dx;
    if (target > maxX) target = maxX + (target - maxX) * 0.3;
    if (target < minX) target = minX + (target - minX) * 0.3;
    gsap.set(track, { x: target });
    state.lastX = e.clientX;
    state.lastT = performance.now();
  };

  const handlePointerEnd = (e: PointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    const track = trackRef.current;
    drag.current = null;
    if (!state || !track) return;
    track.releasePointerCapture?.(e.pointerId);
    const dt = performance.now() - state.lastT;
    const velocity = dt > 0 ? (e.clientX - state.lastX) / dt : 0;
    const { slideW, gap, viewW } = geometry.current;
    const currentX = gsap.getProperty(track, "x") as number;
    const nearest = Math.max(
      0,
      Math.min(
        lastIndex,
        Math.round((viewW / 2 - currentX - slideW / 2) / (slideW + gap))
      )
    );
    if (velocity < -0.4) {
      goTo(activeRef.current + 1);
    } else if (velocity > 0.4) {
      goTo(activeRef.current - 1);
    } else {
      goTo(nearest);
    }
  };

  return (
    <div>
      <div className="relative">
        <div
          ref={viewportRef}
          role="group"
          aria-roledescription="carousel"
          aria-label={label}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          className="touch-pan-y select-none cursor-grab active:cursor-grabbing overflow-hidden rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/70"
        >
          <div
            ref={trackRef}
            className="flex w-max will-change-transform"
            style={{ "--slide-w": "min(72vw, 560px)" } as CSSProperties}
          >
            {slides.map((slide, index) => {
              const isActive = index === active;
              return (
                <figure
                  key={slide.image.id}
                  aria-hidden={!isActive}
                  className={`group relative shrink-0 ${aspect} overflow-hidden duration-500 ${
                    card
                      ? "rounded-xl bg-sand-200 ring-1 ring-black/5 transition-[transform,opacity,box-shadow] shadow-[0_1px_2px_rgba(18,17,16,0.04),0_24px_48px_-20px_rgba(18,17,16,0.30)] motion-safe:hover:-translate-y-1.5 motion-safe:hover:shadow-[0_2px_6px_rgba(18,17,16,0.05),0_32px_64px_-22px_rgba(18,17,16,0.42)]"
                      : "transition-[transform,opacity]"
                  } ${isActive ? "" : "scale-[0.97]"}`}
                  style={{ width: "var(--slide-w)" }}
                >
                  <Image
                    src={slide.image.src}
                    alt={isActive ? slide.image.alt : ""}
                    fill
                    sizes={slide.sizes ?? DEFAULT_SIZES}
                    draggable={false}
                    className={`object-cover ${slide.position} motion-safe:transition-transform motion-safe:duration-[1200ms] motion-safe:ease-out ${
                      card
                        ? "motion-safe:group-hover:scale-[1.05]"
                        : "motion-safe:group-hover:scale-[1.03]"
                    }`}
                  />
                  {!isActive && (
                    <div
                      className="absolute inset-0 bg-dark-900/40"
                      aria-hidden="true"
                    />
                  )}
                </figure>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={() => goTo(activeRef.current - 1)}
          disabled={active === 0}
          aria-label="Previous image"
          className="hidden sm:flex absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full border border-sand-100/30 bg-dark-900/25 text-sand-50 backdrop-blur-sm transition-colors hover:bg-dark-900/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 disabled:opacity-25 disabled:cursor-default"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.25}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 5l-7 7 7 7"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => goTo(activeRef.current + 1)}
          disabled={active === lastIndex}
          aria-label="Next image"
          className="hidden sm:flex absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full border border-sand-100/30 bg-dark-900/25 text-sand-50 backdrop-blur-sm transition-colors hover:bg-dark-900/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 disabled:opacity-25 disabled:cursor-default"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.25}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {renderCaption && (
        <div className="mt-5 text-center px-2">
          {renderCaption(slides[active], active)}
        </div>
      )}

      <div className="mt-6 flex items-center justify-center gap-2.5">
        {slides.map((slide, index) => (
          <button
            key={slide.image.id}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to image ${index + 1}`}
            aria-current={index === active}
            className={`transition-all duration-300 ${
              index === active
                ? "w-9 h-[2px] bg-gold-600"
                : "w-1.5 h-1.5 rounded-full bg-dark-900/25 hover:bg-dark-900/50"
            } focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2`}
          />
        ))}
        <p className="sr-only" aria-live="polite">
          Image {active + 1} of {slides.length}
        </p>
      </div>
    </div>
  );
}
