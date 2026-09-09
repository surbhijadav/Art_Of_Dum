"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * "The Dum Food" — editorial text section following the food showcase.
 * Column 1 reference: screenshot 181136 (heading, paragraph, centred
 * outlined button). Copy is brand-consistent stand-in text; the Figma
 * text is unreadable at screenshot resolution.
 */
export default function TheDumFoodSection() {
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
      aria-labelledby="dum-food-heading"
      className="w-full bg-white px-6 sm:px-8 pt-4 pb-16 sm:pb-20 md:pb-24"
    >
      <div
        ref={contentRef}
        className="mx-auto max-w-2xl flex flex-col items-center text-center"
      >
        <h2
          id="dum-food-heading"
          className="font-serif text-[40px] sm:text-5xl md:text-6xl font-medium text-dark-900 tracking-tight leading-tight"
        >
          The Dum Food
        </h2>

        {/* Gold hairline ornament */}
        <span
          aria-hidden="true"
          className="mt-6 sm:mt-7 block h-px w-10 bg-gold-600/70"
        />

        <p className="mt-6 sm:mt-8 font-serif font-medium text-xl sm:text-[22px] md:text-[24px] text-[#2e2a25] leading-[1.8] sm:leading-[1.9]">
          Art of Dum celebrates traditional slow cooking, where dishes are sealed in clay pots and cooked in their own aromas and juices. This time-honoured technique gently infuses spices and herbs while preserving flavour, moisture, and nutrition—offering a wholesome alternative to modern fast food
        </p>

        <div className="mt-10 sm:mt-12">
          <Link
            href="/menu"
            className="inline-flex items-center justify-center px-9 sm:px-11 py-4 border border-dark-900/80 text-dark-900 hover:bg-dark-900 hover:text-sand-50 transition-all duration-300 text-sm uppercase tracking-[0.28em] font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 active:scale-[0.98]"
          >
            View Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
