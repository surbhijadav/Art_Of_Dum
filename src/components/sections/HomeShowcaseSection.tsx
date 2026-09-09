"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CATEGORY_SHOWCASES } from "@/lib/images";
import type { ShowcaseCategory } from "@/lib/images";

const CATEGORIES: ShowcaseCategory[] = ["food", "beverages", "sheesha"];

interface CategoryItemMeta {
  title: string;
  subtitle: string;
}

const CATEGORY_ITEMS_META: Record<ShowcaseCategory, CategoryItemMeta[]> = {
  food: [
    {
      title: "Dum Biryani & Curries",
      subtitle: "Slow-cooked in sealed earthen pots to lock in authentic aromas.",
    },
    {
      title: "Charcoal Kebabs",
      subtitle: "Smoked to perfection with artisanal ground Awadhi spices.",
    },
    {
      title: "Dum Delicacies",
      subtitle: "Tender, slow-simmered dishes crafted with traditional techniques.",
    },
  ],
  beverages: [
    {
      title: "Botanical Sips",
      subtitle: "Cold-pressed herbal infusions crafted with citrus notes.",
    },
    {
      title: "Heritage Elixirs",
      subtitle: "Spiced golden cordials inspired by royal cooling traditions.",
    },
    {
      title: "Signature Mocktails",
      subtitle: "Artisanal handcrafted blends layered to balanced perfection.",
    },
  ],
  sheesha: [
    {
      title: "Artisanal Blends",
      subtitle: "Curated premium tobacco leaves infused with exotic fruit essence.",
    },
    {
      title: "Lounge Signature",
      subtitle: "Smooth, dense clouds paired with soothing cooling notes.",
    },
    {
      title: "Evening Reserve",
      subtitle: "Slow-burning natural charcoals with dedicated sommelier service.",
    },
  ],
};

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
 * Home "Our Menu" Showcase — Premium Tab-Based Editorial Showcase.
 * Replaces the previous carousel with a clean luxury tabbed section.
 * Tabs: FOOD / BEVERAGES / SHEESHA.
 * Warm ivory (#FAF7F2) background, dark brown typography, muted gold accents.
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

  /* Roving keyboard support for the tab list */
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = CATEGORIES.indexOf(active);
    let nextIndex = currentIndex;
    if (e.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % CATEGORIES.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex =
        (currentIndex - 1 + CATEGORIES.length) % CATEGORIES.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = CATEGORIES.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    const next = CATEGORIES[nextIndex];
    setActive(next);
    tabsRef.current[nextIndex]?.focus();
  };

  const currentCategoryData = CATEGORY_SHOWCASES[active];
  // Take the first 3 curated showcase images for the 3-column editorial grid
  const currentImages = currentCategoryData.images.slice(0, 3);
  const currentMeta = CATEGORY_ITEMS_META[active];

  // Natural aspect ratio class per category to prevent any unwanted crop:
  // Food: 4/3 landscape; Beverages & Sheesha: 3/4 portrait.
  const imageAspectClass =
    active === "food"
      ? "aspect-[4/3] sm:aspect-[4/3]"
      : "aspect-[3/4] sm:aspect-[4/5]";

  return (
    <section
      ref={sectionRef}
      aria-labelledby="our-menu-heading"
      className="relative w-full bg-[#FAF7F2] px-6 sm:px-8 lg:px-12 xl:px-20 py-18 sm:py-24 lg:py-28 overflow-hidden scroll-mt-24"
    >
      {/* Subtle corner watermark illustrations */}
      <MandalaWatermark className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 sm:w-96 sm:h-96 text-[#B88C49] opacity-[0.14]" />
      <MandalaWatermark className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 sm:w-96 sm:h-96 text-[#B88C49] opacity-[0.12]" />

      <div ref={contentRef} className="relative mx-auto max-w-[1520px]">
        {/* Header: Eyebrow, Heading, Description */}
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-8 bg-[#B88C49]" aria-hidden="true" />
            <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.25em] text-[#B88C49] font-medium">
              Our Menu
            </span>
            <span className="h-px w-8 bg-[#B88C49]" aria-hidden="true" />
          </div>

          {/* Headline */}
          <h2
            id="our-menu-heading"
            className="mt-3 font-serif text-[32px] sm:text-[42px] lg:text-[48px] font-normal text-[#1C1714] tracking-tight leading-[1.18]"
          >
            Authentic Flavours, Timeless Traditions
          </h2>

          {/* Description Copy */}
          <p className="mt-4 sm:mt-5 font-sans text-[14px] sm:text-[15px] lg:text-[16px] text-[#5C554E] leading-[1.75] max-w-xl mx-auto">
            At Art of Dum, we bring you a curated selection of authentic dishes,
            crafted with traditional techniques and the finest ingredients.
          </p>
        </div>

        {/* Tab Navigation: FOOD | BEVERAGES | SHEESHA */}
        <div className="flex justify-center mb-10 sm:mb-14">
          <div
            role="tablist"
            aria-label="Menu categories"
            onKeyDown={handleKeyDown}
            className="flex items-center gap-8 sm:gap-12 md:gap-14 border-b border-[#E8E1D5] pb-2 px-4"
          >
            {CATEGORIES.map((categoryId, index) => {
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
                  aria-controls={`home-panel-${categoryId}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectCategory(categoryId)}
                  className={`group relative pb-3 text-[13px] sm:text-[14px] md:text-[15px] uppercase tracking-[0.22em] font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88C49] cursor-pointer ${
                    isActive
                      ? "text-[#1C1714]"
                      : "text-[#8C8377] hover:text-[#1C1714]"
                  }`}
                >
                  <span>{CATEGORY_SHOWCASES[categoryId].title}</span>

                  {/* Active Gold Underline */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[2px] bg-[#B88C49] transition-all duration-300 origin-left ${
                      isActive
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Panel: Editorial 3-Card Image Showcase */}
        <div
          id={`home-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`home-tab-${active}`}
          tabIndex={0}
          className="focus:outline-none transition-opacity duration-300 ease-out"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {currentImages.map(({ image, position }, index) => {
              const meta = currentMeta[index] || {
                title: image.alt,
                subtitle: "Curated selection from our signature menu.",
              };

              return (
                <Link
                  key={image.id}
                  href={`/menu#${active}`}
                  className="group relative flex flex-col justify-between rounded-2xl overflow-hidden bg-white border border-[#E8E1D5] hover:border-[#B88C49]/60 hover:shadow-xl transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88C49]"
                >
                  {/* Image Container with Natural Aspect Ratio */}
                  <div
                    className={`relative w-full overflow-hidden bg-[#F3ECE0] ${imageAspectClass}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      priority={active === "food" && index === 0}
                      sizes="(min-width: 1280px) 460px, (min-width: 768px) 33vw, 100vw"
                      className={`object-cover ${position} transition-transform duration-700 ease-out group-hover:scale-105`}
                    />

                    {/* Subtle vignette hover overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Card Content & Circular Action Button */}
                  <div className="p-6 sm:p-7 flex items-end justify-between gap-4 bg-white">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-[20px] sm:text-[22px] lg:text-[24px] font-normal text-[#1C1714] tracking-tight leading-snug group-hover:text-[#B88C49] transition-colors duration-300">
                        {meta.title}
                      </h3>
                      <p className="mt-2 text-[13px] sm:text-[14px] text-[#5C554E] leading-relaxed line-clamp-2 font-sans">
                        {meta.subtitle}
                      </p>
                    </div>

                    {/* Circular Gold Arrow Button */}
                    <div
                      aria-hidden="true"
                      className="w-10 h-10 rounded-full border border-[#B88C49]/40 flex items-center justify-center text-[#B88C49] shrink-0 transition-all duration-300 group-hover:bg-[#B88C49] group-hover:text-white group-hover:border-[#B88C49] group-hover:scale-105"
                    >
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bottom Explore the Menu Button */}
          <div className="mt-12 sm:mt-16 text-center">
            <Link
              href={`/menu#${active}`}
              className="inline-flex items-center gap-2 px-8 sm:px-10 py-3.5 border border-[#1C1714] text-[#1C1714] hover:bg-[#1C1714] hover:text-[#FAF7F2] transition-all duration-300 text-[12px] uppercase tracking-[0.24em] font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88C49] active:scale-[0.98]"
            >
              <span>Explore the Menu</span>
              <span>↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
