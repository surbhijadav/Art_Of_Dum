"use client";

import { useCallback, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import Image from "next/image";
import type { CollageCell, CollageCategory } from "@/lib/collage";

interface CollageCarouselProps {
  category: CollageCategory;
  /** Accessible name for the gallery viewport. */
  label: string;
}

/**
 * Collage carousel: each slide is one complete multi-image editorial
 * composition built from JUSTIFIED ROWS. Every image renders at its
 * natural aspect ratio (intrinsic width/height measured from the
 * source file); row widths are distributed proportionally to each
 * ratio via CSS flex, which equalises row heights — no fixed frames,
 * no background mats, no letterboxing, no cropping. Supports arrows,
 * pagination dots, drag/swipe with velocity + threshold, keyboard
 * arrows, and prefers-reduced-motion via Tailwind's motion-reduce.
 */
export default function CollageCarousel({
  category,
  label,
}: CollageCarouselProps) {
  const lastIndex = category.slides.length - 1;
  const [active, setActive] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef<{ startX: number; lastX: number; lastT: number } | null>(
    null
  );

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(lastIndex, index));
      setActive(clamped);
      setDragOffset(0);
    },
    [lastIndex]
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(active - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(active + 1);
    }
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    viewportRef.current?.setPointerCapture?.(e.pointerId);
    setIsDragging(true);
    drag.current = {
      startX: e.clientX,
      lastX: e.clientX,
      lastT: performance.now(),
    };
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    if (!state) return;
    let dx = e.clientX - state.startX;
    // Rubber-band resistance at boundaries
    if ((active === 0 && dx > 0) || (active === lastIndex && dx < 0)) {
      dx *= 0.3;
    }
    setDragOffset(dx);
    state.lastX = e.clientX;
    state.lastT = performance.now();
  };

  const handlePointerEnd = (e: PointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    drag.current = null;
    setIsDragging(false);
    if (!state) return;
    viewportRef.current?.releasePointerCapture?.(e.pointerId);
    const viewW = viewportRef.current?.clientWidth ?? 0;
    const dx = e.clientX - state.startX;
    const dt = performance.now() - state.lastT;
    const velocity = dt > 0 ? (e.clientX - state.lastX) / dt : 0;
    if (velocity < -0.35 || dx < -viewW * 0.18) {
      goTo(active + 1);
    } else if (velocity > 0.35 || dx > viewW * 0.18) {
      goTo(active - 1);
    } else {
      setDragOffset(0);
    }
  };

  /** `sizes` hint derived from the number of images in the row. */
  const sizesForRow = (row: CollageCell[]): string => {
    const px = Math.min(760, Math.round(760 / row.length) + 60);
    const vw = Math.round(92 / row.length);
    return `(min-width: 1280px) ${px}px, ${vw}vw`;
  };

  return (
    <div className="relative w-full select-none">
      {/* Viewport container with arrow buttons */}
      <div className="relative flex items-center">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="Previous image collage"
          className="absolute -left-3 sm:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-20 h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-full border border-[#D5CDBC] bg-[#FBF8F3]/90 text-[#6B6255] backdrop-blur-sm shadow-sm transition-all duration-200 hover:bg-white hover:text-[#1C1714] hover:border-[#B88C49] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88C49] disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        {/* Slides Track */}
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
          className="w-full touch-pan-y overflow-hidden rounded-[4px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88C49]/60 cursor-grab active:cursor-grabbing"
        >
          <div
            className={`flex w-full ${
              isDragging
                ? ""
                : "transition-transform duration-700 ease-out motion-reduce:transition-none"
            }`}
            style={{
              transform: `translateX(calc(${-active * 100}% + ${dragOffset}px))`,
            }}
          >
            {category.slides.map((rows, slideIndex) => {
              const isActive = slideIndex === active;
              return (
                <div
                  key={slideIndex}
                  aria-hidden={!isActive}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Collage ${slideIndex + 1} of ${category.slides.length}`}
                  className="w-full shrink-0 flex flex-col gap-2 sm:gap-2.5 lg:gap-3"
                >
                  {rows.map((row, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="flex gap-2 sm:gap-2.5 lg:gap-3"
                    >
                      {row.map((cell) => (
                        <figure
                          key={cell.image.id}
                          className="min-w-0 overflow-hidden rounded-[2px] shadow-sm ring-1 ring-black/10"
                          style={{ flex: `${cell.width / cell.height} 1 0%` }}
                        >
                          <Image
                            src={cell.image.src}
                            alt={isActive ? cell.image.alt : ""}
                            width={cell.width}
                            height={cell.height}
                            sizes={sizesForRow(row)}
                            draggable={false}
                            className="h-auto w-full"
                          />
                        </figure>
                      ))}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={() => goTo(active + 1)}
          disabled={active === lastIndex}
          aria-label="Next image collage"
          className="absolute -right-3 sm:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-20 h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-full border border-[#D5CDBC] bg-[#FBF8F3]/90 text-[#6B6255] backdrop-blur-sm shadow-sm transition-all duration-200 hover:bg-white hover:text-[#1C1714] hover:border-[#B88C49] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88C49] disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      {/* Pagination Indicators */}
      <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2">
        {category.slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to collage slide ${index + 1}`}
            aria-current={index === active}
            className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88C49] ${
              index === active
                ? "w-2.5 h-2.5 bg-[#B88C49] scale-110 shadow-xs"
                : "w-2 h-2 bg-[#D8D0C0] hover:bg-[#B88C49]/60"
            }`}
          />
        ))}
        <p className="sr-only" aria-live="polite">
          Slide {active + 1} of {category.slides.length}
        </p>
      </div>
    </div>
  );
}
