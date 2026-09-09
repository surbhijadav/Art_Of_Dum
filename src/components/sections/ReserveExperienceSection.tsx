"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DINING_EXPERIENCES } from "@/lib/experiences";

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
 * "Reserve an Experience" — Premium Editorial Card Showcase.
 * Displays the 4 dining experiences directly in a 4-column luxury card layout,
 * without the redundant tab bar.
 */
export default function ReserveExperienceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-labelledby="reserve-experience-heading"
      className="relative w-full bg-[#FAF7F2] px-6 sm:px-8 lg:px-12 xl:px-20 py-18 sm:py-24 lg:py-28 overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      {/* Subtle corner watermark illustrations */}
      <MandalaWatermark className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 sm:w-96 sm:h-96 text-[#B88C49] opacity-[0.14]" />
      <MandalaWatermark className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 sm:w-96 sm:h-96 text-[#B88C49] opacity-[0.12]" />

      <div ref={contentRef} className="relative mx-auto max-w-[1520px]">
        {/* Section Header: Eyebrow, Heading, Description */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-8 bg-[#B88C49]" aria-hidden="true" />
            <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.25em] text-[#B88C49] font-medium">
              Our Experiences
            </span>
            <span className="h-px w-8 bg-[#B88C49]" aria-hidden="true" />
          </div>

          <h2
            id="reserve-experience-heading"
            className="mt-3 font-serif text-[32px] sm:text-[42px] lg:text-[48px] font-normal text-[#1C1714] tracking-tight leading-[1.18]"
          >
            Reserve an Experience
          </h2>

          <p className="mt-4 sm:mt-5 font-sans text-[14px] sm:text-[15px] lg:text-[16px] text-[#5C554E] leading-[1.75] max-w-xl mx-auto">
            Slow afternoons and candle-lit evenings at Art of Dum, crafted for unforgettable moments.
          </p>
        </div>

        {/* Cards Grid: 4-Column Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {DINING_EXPERIENCES.map((experience) => (
            <Link
              key={experience.id}
              href={experience.href}
              className="group relative flex flex-col justify-between rounded-2xl overflow-hidden bg-white border border-[#E8E1D5] hover:border-[#B88C49]/60 hover:shadow-xl transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88C49]"
            >
              {/* Image Container with Natural Aspect Ratio */}
              <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-[#F3ECE0]">
                <Image
                  src={experience.image.src}
                  alt={experience.image.alt}
                  fill
                  sizes="(min-width: 1280px) 360px, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle vignette hover overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Card Content & Circular Action Button */}
              <div className="p-6 sm:p-7 flex items-end justify-between gap-4 bg-white">
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-[20px] sm:text-[22px] lg:text-[24px] font-normal text-[#1C1714] tracking-tight leading-snug group-hover:text-[#B88C49] transition-colors duration-300">
                    {experience.title}
                  </h3>
                  <p className="mt-2 text-[13px] sm:text-[14px] text-[#5C554E] leading-relaxed line-clamp-2 font-sans">
                    {experience.description}
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
          ))}
        </div>

        {/* Bottom Call to Action for Reservations */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href="/reserve-an-experience"
            className="inline-flex items-center gap-2 px-8 sm:px-10 py-3.5 border border-[#1C1714] text-[#1C1714] hover:bg-[#1C1714] hover:text-[#FAF7F2] transition-all duration-300 text-[12px] uppercase tracking-[0.24em] font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88C49] active:scale-[0.98]"
          >
            <span>Reserve a Table</span>
            <span>↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
