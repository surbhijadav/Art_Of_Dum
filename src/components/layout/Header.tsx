"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import { RESERVE_EXPERIENCE_LINKS } from "@/lib/navigation";
import { RESTAURANT_TALABAT_URL } from "@/lib/restaurant";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [reserveMenuOpen, setReserveMenuOpen] = useState(false);
  const pathname = usePathname();
  // The transparent gradient state is only legible over the dark hero;
  // every other page starts with light content, so the nav stays solid.
  const isHome = pathname === "/";
  // The parent "Reserve an Experience" trigger shows an active state on
  // the four experience subroutes (never for /reserve-a-table).
  const isExperienceRoute = pathname.startsWith("/reserve-an-experience/");

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
            {/* Parent menu trigger — NOT a link. Hover (or focus) reveals
                the submenu via the group classes; click toggles it for
                touch screens; the items below are the real links. */}
            <div
              className="relative group"
              onMouseLeave={() => setReserveMenuOpen(false)}
            >
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={reserveMenuOpen}
                aria-controls="reserve-experience-menu"
                onClick={() => setReserveMenuOpen((open) => !open)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setReserveMenuOpen(false);
                }}
                className={`text-[13px] uppercase tracking-[0.2em] transition-colors font-medium py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-500 hover:after:w-full after:transition-all cursor-pointer ${
                  isExperienceRoute
                    ? "text-gold-400"
                    : "text-sand-100 hover:text-gold-400"
                }`}
              >
                Reserve an Experience
              </button>
              {/* Submenu — opens on hover, stays open while the cursor
                  moves into it, closes on leave; focus-within keeps it
                  reachable via keyboard; the toggle state covers touch. */}
              <div
                id="reserve-experience-menu"
                role="menu"
                aria-label="Reserve an Experience options"
                className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 transition-all duration-200 ${
                  reserveMenuOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0"
                }`}
              >
                <div className="min-w-[196px] bg-[#121110]/95 backdrop-blur-md border border-white/10 py-3">
                  {RESERVE_EXPERIENCE_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      aria-current={
                        pathname === item.href ? "page" : undefined
                      }
                      onClick={() => setReserveMenuOpen(false)}
                      className={`block px-5 py-2 text-[13px] uppercase tracking-[0.2em] transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
                        pathname === item.href
                          ? "text-gold-400"
                          : "text-sand-100 hover:text-gold-400"
                      }`}
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
            <Link
              href="/reserve-a-table"
              className="text-[13px] uppercase tracking-[0.2em] text-sand-100 hover:text-gold-400 transition-colors font-medium py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-500 hover:after:w-full after:transition-all"
            >
              Reserve a Table
            </Link>
            {/* <a
              href="#story"
              className="text-[13px] uppercase tracking-[0.2em] text-sand-100 hover:text-gold-400 transition-colors font-medium py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-500 hover:after:w-full after:transition-all"
            >
              Story
            </a> */}
          </nav>

          {/* Right Action Icons & Mobile Trigger */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* WhatsApp Chat Link */}
            <a
              href="https://wa.me/971568561276"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-sand-100 hover:text-gold-400 transition-colors rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gold-500"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>

            {/* Online Order — official Art of Dum page on Talabat UAE */}
            <a
              href={RESTAURANT_TALABAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-sand-200/60 text-sand-50 hover:bg-gold-600 hover:border-gold-600 hover:text-white transition-all text-[13px] uppercase tracking-[0.2em] font-medium"
            >
              Online Order
            </a>

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
