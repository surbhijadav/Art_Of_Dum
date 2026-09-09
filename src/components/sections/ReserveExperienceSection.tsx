"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import EditorialCarousel from "@/components/ui/EditorialCarousel";
import type { CarouselSlide } from "@/components/ui/EditorialCarousel";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DINING_EXPERIENCES } from "@/lib/experiences";

/**
 * "Reserve an Experience" — heading plus an experience carousel: each
 * slide pairs a portrait photograph from /reserve_an_experience with
 * its description, an "Explore ↗" link into the existing experience
 * route, and the large serif experience title. Slide order follows
 * DINING_EXPERIENCES (Business Dining leads, per the design reference).
 */
const SLIDES: CarouselSlide[] = DINING_EXPERIENCES.map((experience) => ({
  image: experience.image,
  position: "object-[50%_50%]",
}));

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
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
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
      className="w-full bg-white px-6 sm:px-8 lg:px-12 xl:px-20 pt-2 pb-20 sm:pb-24 md:pb-28 overflow-x-clip scroll-mt-24 sm:scroll-mt-28"
    >
      <div ref={contentRef} className="mx-auto max-w-[1600px]">
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-12">
          <h2
            id="reserve-experience-heading"
            className="font-serif text-[40px] sm:text-5xl md:text-6xl font-medium text-dark-900 tracking-tight leading-tight"
          >
            Reserve an Experience
          </h2>
          <p className="mt-6 sm:mt-7 font-serif italic text-xl sm:text-[22px] md:text-[24px] text-dark-900/80 font-normal tracking-wide">
            Slow afternoons and candle-lit evenings at Art of Dum
          </p>
        </div>

        <EditorialCarousel
          slides={SLIDES}
          label="Dining experiences"
          aspect="aspect-[4/5]"
          renderCaption={(slide) => {
            const experience = DINING_EXPERIENCES.find(
              (item) => item.image.id === slide.image.id
            );
            if (!experience) return null;
            return (
              <div className="max-w-md mx-auto">
                <p className="text-[15px] text-dark-700 leading-relaxed">
                  {experience.description}
                </p>
                <Link
                  href={experience.href}
                  className="mt-6 inline-block text-[11px] uppercase tracking-[0.24em] text-gold-700 hover:text-gold-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                >
                  Explore ↗
                </Link>
                <h3 className="mt-4 font-serif text-3xl sm:text-4xl font-medium text-dark-900 tracking-tight">
                  {experience.title}
                </h3>
              </div>
            );
          }}
        />

        {/* <div className="mt-12 sm:mt-14 text-center">
          <a
            href="tel:+971568561276"
            className="inline-flex items-center justify-center px-8 sm:px-10 py-3.5 border border-dark-900/80 text-dark-900 hover:bg-dark-900 hover:text-sand-50 transition-all duration-300 text-[13px] uppercase tracking-[0.25em] font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 active:scale-[0.98]"
          >
            Reserve a Table
          </a>
        </div> */}
      </div>
    </section>
  );
}
