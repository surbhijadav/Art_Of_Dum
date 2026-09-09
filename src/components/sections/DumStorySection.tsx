"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function DumStorySection() {
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
          {
            opacity: 0,
            y: 35,
          },
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
      id="story"
      ref={sectionRef}
      className="w-full bg-[#ffffff] text-[#181715] pt-16 pb-16 sm:pt-24 sm:pb-20 md:pt-28 md:pb-24 px-6 sm:px-8 border-b border-sand-200/60"
      aria-label="The Dum Story"
    >
      <div
        ref={contentRef}
        className="max-w-3xl mx-auto flex flex-col items-center text-center"
      >
        {/* Editorial Heading */}
        <h2 className="font-serif text-[40px] sm:text-5xl md:text-6xl font-medium text-dark-900 tracking-tight leading-tight">
          The Dum Story
        </h2>

        {/* Gold hairline ornament */}
        <span
          aria-hidden="true"
          className="mt-6 sm:mt-7 block h-px w-10 bg-gold-600/70"
        />

        {/* Story Body Paragraph */}
        <p className="mt-6 sm:mt-8 font-serif font-medium text-xl sm:text-[22px] md:text-[24px] text-[#2e2a25] leading-[1.8] sm:leading-[1.9] max-w-xl md:max-w-2xl">
          The dum technique has been practised for over a thousand years across Persian, Central Asian, and Indian cultures. By cooking food slowly in a sealed vessel, it preserves moisture and aroma while allowing rich flavours to develop—a timeless tradition passed down across generations.
        </p>
      </div>
    </section>
  );
}
