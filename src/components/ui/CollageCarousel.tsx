"use client";

import { useCallback, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import Image from "next/image";
import type { CollageCell, CollageComposition } from "@/lib/collage";
import type { ShowcaseCategory } from "@/lib/images";

export interface CollageCategorySlide
  extends CollageComposition {
  id: ShowcaseCategory;
  title: string;
}

interface CollageCarouselProps {
  slides: CollageCategorySlide[];
  activeIndex: number;
  onChange: (index: number) => void;
  /** Accessible name for the gallery viewport. */
  label: string;
}

/** Editorial frame: fills its grid cell via a tuned cover crop. */
function GalleryFrame({
  cell,
  isActive,
  span,
  sizes,
}: {
  cell: CollageCell;
  isActive: boolean;
  /** Column span within the shared 6-column gallery grid. */
  span: string;
  sizes: string;
}) {
  return (
    <figure
      className={`relative overflow-hidden rounded-[2px] ring-1 ring-black/5 ${span}`}
    >
      <Image
        src={cell.image.src}
        alt={isActive ? cell.image.alt : ""}
        fill
        sizes={sizes}
        draggable={false}
        className={`object-cover ${cell.position}`}
      />
    </figure>
  );
}

/** `sizes` hints for the two cell widths (half band vs third band). */
const HALF_SIZES = "(min-width: 1280px) 380px, 46vw";
const THIRD_SIZES = "(min-width: 1280px) 252px, 31vw";

/**
 * Category collage carousel: every slide is ONE menu category's
 * composition inside the SAME fixed gallery rectangle — a 2-image top
 * band, a slightly shorter 3-image middle band and a 2-image bottom
 * band (2 → 3 → 2). Images fill their cells with tuned cover crops,
 * so the gallery boundary and rhythm stay identical for Food,
 * Beverages and Sheesha. Supports arrows, pagination dots, drag/swipe
 * with velocity + threshold, keyboard arrows, and prefers-reduced-
 * motion via Tailwind's motion-reduce.
 */
export default function CollageCarousel({
  slides,
  activeIndex,
  onChange,
  label,
}: CollageCarouselProps) {
  const lastIndex = slides.length - 1;
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef<{ startX: number; lastX: number; lastT: number } | null>(
    null
  );

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(lastIndex, index));
      setDragOffset(0);
      if (clamped !== activeIndex) onChange(clamped);
    },
    [activeIndex, lastIndex, onChange]
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(activeIndex - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(activeIndex + 1);
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
    if ((activeIndex === 0 && dx > 0) || (activeIndex === lastIndex && dx < 0)) {
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
      goTo(activeIndex + 1);
    } else if (velocity > 0.35 || dx > viewW * 0.18) {
      goTo(activeIndex - 1);
    } else {
      setDragOffset(0);
    }
  };

  return (
    <div className="relative w-full select-none">
      {/* Viewport container with arrow buttons */}
      <div className="relative flex items-center">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous category"
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
              transform: `translateX(calc(${-activeIndex * 100}% + ${dragOffset}px))`,
            }}
          >
            {slides.map((slide, slideIndex) => {
              const isActive = slideIndex === activeIndex;
              return (
                <div
                  key={slide.id}
                  aria-hidden={!isActive}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${slide.title} category collage`}
                  className="grid aspect-[4/5] w-full shrink-0 grid-cols-6 grid-rows-[1.15fr_0.85fr_1.15fr] gap-2 sm:aspect-[7/6] sm:gap-2.5"
                >
                  {slide.top.map((bandCell) => (
                    <GalleryFrame
                      key={bandCell.image.id}
                      cell={bandCell}
                      isActive={isActive}
                      span="col-span-3"
                      sizes={HALF_SIZES}
                    />
                  ))}
                  {slide.middle.map((bandCell) => (
                    <GalleryFrame
                      key={bandCell.image.id}
                      cell={bandCell}
                      isActive={isActive}
                      span="col-span-2"
                      sizes={THIRD_SIZES}
                    />
                  ))}
                  {slide.bottom.map((bandCell) => (
                    <GalleryFrame
                      key={bandCell.image.id}
                      cell={bandCell}
                      isActive={isActive}
                      span="col-span-3"
                      sizes={HALF_SIZES}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex === lastIndex}
          aria-label="Next category"
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
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to ${slide.title} category`}
            aria-current={index === activeIndex}
            className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88C49] ${
              index === activeIndex
                ? "w-2.5 h-2.5 bg-[#B88C49] scale-110 shadow-xs"
                : "w-2 h-2 bg-[#D8D0C0] hover:bg-[#B88C49]/60"
            }`}
          />
        ))}
        <p className="sr-only" aria-live="polite">
          Slide {activeIndex + 1} of {slides.length}: {slides[activeIndex].title}
        </p>
      </div>
    </div>
  );
}
