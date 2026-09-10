"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CollageCarousel from "@/components/ui/CollageCarousel";
import type { CollageCategorySlide } from "@/components/ui/CollageCarousel";
import { HOME_COLLAGES } from "@/lib/collage";
import { CATEGORY_SHOWCASES } from "@/lib/images";
import type { ShowcaseCategory } from "@/lib/images";

const CATEGORY_ORDER: ShowcaseCategory[] = ["food", "beverages", "sheesha"];

const SHOWCASE_SLIDES: CollageCategorySlide[] = CATEGORY_ORDER.map(
  (categoryId) => ({
    id: categoryId,
    title: CATEGORY_SHOWCASES[categoryId].title,
    ...HOME_COLLAGES[categoryId],
  })
);

/**
 * Decorative Mandala Watermark SVG in luxury heritage line style.
 */
function MandalaWatermark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="100"
        cy="100"
        r="90"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="2 3"
      />
      <circle
        cx="100"
        cy="100"
        r="75"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <circle
        cx="100"
        cy="100"
        r="55"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <circle
        cx="100"
        cy="100"
        r="35"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      {/* 8-fold radial petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <path
          key={angle}
          d="M100 100 Q115 65 100 25 Q85 65 100 100Z"
          stroke="currentColor"
          strokeWidth="0.6"
          transform={`rotate(${angle} 100 100)`}
        />
      ))}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => (
        <path
          key={angle}
          d="M100 100 Q108 75 100 45 Q92 75 100 100Z"
          stroke="currentColor"
          strokeWidth="0.4"
          transform={`rotate(${angle} 100 100)`}
        />
      ))}
    </svg>
  );
}

/**
 * Home "Our Menu" showcase — editorial two-column composition:
 * Left: Eyebrow, serif headline, descriptive copy, category tabs, and explore link.
 * Right: 6-image editorial collage gallery with category isolation and no cropping.
 */
export default function HomeShowcaseSection() {
  const [active, setActive] = useState<ShowcaseCategory>("food");
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  /* Subtle section reveal on scroll */
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (contentRef.current && sectionRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const selectCategory = (category: ShowcaseCategory) => {
    setActive(category);
  };

  const activeIndex = CATEGORY_ORDER.indexOf(active);

  const handleSlideChange = (index: number) => {
    setActive(CATEGORY_ORDER[index]);
  };

  /* Roving keyboard support for the tab list */
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = CATEGORY_ORDER.indexOf(active);
    let nextIndex = currentIndex;
    if (e.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % CATEGORY_ORDER.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex =
        (currentIndex - 1 + CATEGORY_ORDER.length) % CATEGORY_ORDER.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = CATEGORY_ORDER.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    const next = CATEGORY_ORDER[nextIndex];
    setActive(next);
    tabsRef.current[nextIndex]?.focus();
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="our-menu-heading"
      className="relative w-full bg-[#FAF7F2] px-6 sm:px-8 lg:px-12 xl:px-20 py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      {/* Subtle corner watermark illustrations */}
      <MandalaWatermark className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 sm:w-96 sm:h-96 text-[#B88C49] opacity-[0.14]" />
      <MandalaWatermark className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 sm:w-96 sm:h-96 text-[#B88C49] opacity-[0.12]" />

      <div
        ref={contentRef}
        className="relative mx-auto max-w-[1520px] lg:grid lg:grid-cols-12 lg:gap-10 xl:gap-16 lg:items-center"
      >
        {/* Left Column: editorial copy, tabs, and explore button */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.25em] text-[#B88C49] font-medium">
              Our Menu
            </span>
            <span className="h-px w-7 sm:w-9 bg-[#B88C49]" aria-hidden="true" />
          </div>

          {/* Headline */}
          <h2
            id="our-menu-heading"
            className="mt-4 sm:mt-5 font-serif text-[32px] sm:text-[40px] lg:text-[42px] xl:text-[46px] font-normal text-[#1C1714] tracking-tight leading-[1.18]"
          >
            Authentic Flavours, Timeless Traditions
          </h2>

          {/* Copy */}
          <p className="mt-5 sm:mt-6 font-sans text-[14px] sm:text-[15px] lg:text-[16px] text-[#5C554E] leading-[1.75] max-w-md">
            At Art of Dum, we bring you a curated selection of authentic dishes,
            crafted with traditional techniques and the finest ingredients.
          </p>

          {/* Category Tabs */}
          <div className="mt-8 sm:mt-10">
            <div
              role="tablist"
              aria-label="Menu categories"
              onKeyDown={handleKeyDown}
              className="flex items-center justify-center lg:justify-start gap-6 sm:gap-8"
            >
              {CATEGORY_ORDER.map((categoryId, index) => {
                const isActive = active === categoryId;
                return (
                  <button
                    key={categoryId}
                    ref={(el) => {
                      tabsRef.current[index] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`home-tab-${categoryId}`}
                    aria-selected={isActive}
                    aria-controls="home-collage-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => selectCategory(categoryId)}
                    className={`relative pb-2 text-[13px] sm:text-[14px] uppercase tracking-[0.2em] font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88C49] cursor-pointer ${
                      isActive
                        ? "text-[#1C1714] after:scale-x-100"
                        : "text-[#8C8377] hover:text-[#1C1714] after:scale-x-0 hover:after:scale-x-100"
                    } after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#B88C49] after:origin-left after:transition-transform after:duration-300`}
                  >
                    {CATEGORY_SHOWCASES[categoryId].title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explore Link (Desktop Position) */}
          <div className="hidden lg:block mt-12 sm:mt-14">
            <Link
              href={`/menu#${active}`}
              className="inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] uppercase tracking-[0.22em] text-[#1C1714] font-medium pb-1 border-b border-[#1C1714]/30 hover:border-[#B88C49] hover:text-[#B88C49] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88C49]"
            >
              Explore the Menu ↗
            </Link>
          </div>
        </div>

        {/* Right Column: category collage carousel */}
        <div
          id="home-collage-panel"
          role="tabpanel"
          aria-labelledby={`home-tab-${active}`}
          tabIndex={0}
          className="mt-8 sm:mt-10 lg:mt-0 lg:col-span-7 focus:outline-none"
        >
          <CollageCarousel
            slides={SHOWCASE_SLIDES}
            activeIndex={activeIndex}
            onChange={handleSlideChange}
            label="Menu category collage gallery"
          />
        </div>

        {/* Explore Link (Mobile Position below gallery) */}
        <div className="lg:hidden mt-8 text-center sm:text-left">
          <Link
            href={`/menu#${active}`}
            className="inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] uppercase tracking-[0.22em] text-[#1C1714] font-medium pb-1 border-b border-[#1C1714]/30 hover:border-[#B88C49] hover:text-[#B88C49] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88C49]"
          >
            Explore the Menu ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
