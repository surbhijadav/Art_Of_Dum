"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_IMAGE } from "@/lib/images";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only run GSAP animations if user has not preferred reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Subtle parallax scale and translation on scroll
      if (imageWrapperRef.current && containerRef.current) {
        gsap.to(imageWrapperRef.current, {
          yPercent: 12,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }

      // Subtle fade & upward shift for hero content as it scrolls out
      if (contentRef.current && containerRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0.2,
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "60% top",
            scrub: 0.6,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-[640px] overflow-hidden bg-[#121110] flex flex-col justify-end select-none"
      aria-label="Art of Dum - Timed to Perfection"
    >
      {/* Background Hero Image with subtle parallax */}
      <div
        ref={imageWrapperRef}
        className="absolute inset-0 w-full h-[115%] -top-[7.5%] will-change-transform"
      >
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_50%] md:object-[50%_55%] xl:object-[50%_58%]"
        />
        {/* Cinematic gradient overlays for contrast & seamless transition */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-transparent to-black/60 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Hero Content positioned over lower portion of the image */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 pb-14 sm:pb-16 md:pb-20 text-center flex flex-col items-center justify-end"
      >
        {/* Main Serif Headline */}
        <h1 className="font-serif text-[42px] sm:text-[56px] md:text-[68px] lg:text-[84px] xl:text-[96px] font-normal text-white tracking-tight leading-[1.08] drop-shadow-md">
          Timed to
          <span className="block font-normal mt-1 sm:mt-1.5">Perfection</span>
        </h1>

        {/* Subtitle */}
        <p className="font-serif italic text-sand-100 text-xl sm:text-2xl md:text-[26px] font-normal tracking-wide mt-4 sm:mt-5 drop-shadow-sm">
          Slow-cooked Indian cuisine
        </p>

        {/* Reserve a Table CTA Button */}
        <div className="mt-8 sm:mt-10">
          <a
            href="/reserve-an-experience"
            className="inline-flex items-center justify-center px-11 py-4 border border-white/80 hover:border-white text-white hover:bg-white hover:text-dark-900 transition-all duration-300 text-sm uppercase tracking-[0.3em] font-medium backdrop-blur-[2px] focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-dark-900 active:scale-[0.98]"
          >
            Reserve a Table
          </a>
        </div>
      </div>
    </section>
  );
}
