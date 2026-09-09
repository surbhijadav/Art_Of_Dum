"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import { RESERVE_EXPERIENCE_LINKS } from "@/lib/navigation";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  // The transparent gradient state is only legible over the dark hero;
  // every other page starts with light content, so the nav stays solid.
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300">


      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 ${isScrolled || !isHome
          ? "bg-[#121110]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-gradient-to-b from-black/70 via-black/30 to-transparent border-b border-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center group focus:outline-none focus:ring-2 focus:ring-gold-500 rounded"
            aria-label="Art of Dum - Home"
          >
            <Image
              src="/images/logo.png"
              alt="Art of Dum - Timed to Perfection - A Foodlink Initiative"
              width={140}
              height={55}
              className="w-[105px] sm:w-[125px] md:w-[135px] h-auto object-contain transition-transform group-hover:scale-[1.02]"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-8 lg:gap-10"
            aria-label="Desktop Main Navigation"
          >
            <Link
              href="/"
              className="text-[13px] uppercase tracking-[0.2em] text-sand-100 hover:text-gold-400 transition-colors font-medium py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-500 hover:after:w-full after:transition-all"
            >
              Home
            </Link>
            <Link
              href="/menu"
              className="text-[13px] uppercase tracking-[0.2em] text-sand-100 hover:text-gold-400 transition-colors font-medium py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-500 hover:after:w-full after:transition-all"
            >
              Menu
            </Link>
            <div className="relative group">
              <Link
                href="/reserve-an-experience"
                aria-haspopup="menu"
                className="text-[13px] uppercase tracking-[0.2em] text-sand-100 hover:text-gold-400 transition-colors font-medium py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-500 hover:after:w-full after:transition-all"
              >
                Reserve an Experience
              </Link>
              {/* Hover submenu — opens on hover, stays open while the
                  cursor moves into it, closes on leave; focus-within
                  keeps it reachable via keyboard. */}
              <div
                role="menu"
                aria-label="Reserve an Experience options"
                className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0"
              >
                <div className="min-w-[196px] bg-[#121110]/95 backdrop-blur-md border border-white/10 py-3">
                  {RESERVE_EXPERIENCE_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      className="block px-5 py-2 text-[13px] uppercase tracking-[0.2em] text-sand-100 hover:text-gold-400 transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="/contact"
              className="text-[13px] uppercase tracking-[0.2em] text-sand-100 hover:text-gold-400 transition-colors font-medium py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-500 hover:after:w-full after:transition-all"
            >
              Contact
            </Link>
            {/* <a
              href="#story"
              className="text-[13px] uppercase tracking-[0.2em] text-sand-100 hover:text-gold-400 transition-colors font-medium py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-500 hover:after:w-full after:transition-all"
            >
              Story
            </a> */}
            <Link
              href="/online-order"
              className="text-[13px] uppercase tracking-[0.2em] text-sand-100 hover:text-gold-400 transition-colors font-medium py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-500 hover:after:w-full after:transition-all"
            >
              Online Order
            </Link>
          </nav>

          {/* Right Action Icons & Mobile Trigger */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Phone Call Link */}
            <a
              href="tel:+971568561276"
              className="p-2 text-sand-100 hover:text-gold-400 transition-colors rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gold-500"
              aria-label="Call restaurant at +971 56 856 1276"
              title="+971 56 856 1276"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </a>

            {/* Desktop Reserve Button */}
            <Link
              href="/reserve-an-experience"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-sand-200/60 text-sand-50 hover:bg-gold-600 hover:border-gold-600 hover:text-white transition-all text-[13px] uppercase tracking-[0.2em] font-medium"
            >
              Reserve a Table
            </Link>

            {/* Mobile Hamburger Trigger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-sand-100 hover:text-gold-400 transition-colors md:hidden focus:outline-none focus:ring-2 focus:ring-gold-500 rounded"
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
