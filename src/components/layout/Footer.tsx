
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface AccordionSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function FooterAccordion({
  title,
  isOpen,
  onToggle,
  children,
}: AccordionSectionProps) {
  return (
    <div className="border-b border-sand-300 md:border-none py-3 md:py-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left md:pointer-events-none focus:outline-none focus:ring-2 focus:ring-gold-500 rounded"
        aria-expanded={isOpen}
      >
        <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-dark-900">
          {title}
        </h3>
        <span className="text-lg leading-none md:hidden text-dark-700">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <div
        className={`mt-3 space-y-2 md:block ${isOpen ? "block" : "hidden"
          }`}
      >
        {children}
      </div>
    </div>
  );
}

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <footer className="w-full bg-sand-200 text-dark-900 border-t border-sand-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-sand-300">
          {/* Column 1: Logo, Address & Contact (5 cols on lg) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="Art of Dum"
                width={130}
                height={50}
                className="w-[120px] h-auto object-contain"
              />
            </Link>

            <div className="text-xs text-dark-700 space-y-2 leading-relaxed max-w-sm">
              <p>
                <span className="font-semibold text-dark-900">Address: </span>
                Reem Mall - 1st Floor - Al Reem Island - Najmat Abu Dhabi - Abu Dhabi - United Arab Emirates
              </p>
              <p>
                <span className="font-semibold text-dark-900">Email: </span>
                <a
                  href="mailto:info@aod.com"
                  className="hover:text-gold-700 transition-colors"
                >
                  info@aod.com
                </a>
              </p>
              <p>
                <span className="font-semibold text-dark-900">Phone: </span>
                <a
                  href="tel:+971568561276"
                  className="hover:text-gold-700 transition-colors"
                >
                  +971568561276
                </a>
              </p>
            </div>

            {/* Social Icons */}
            <div className="pt-2">
              <p className="text-[11px] uppercase tracking-[0.2em] text-dark-600 mb-3">
                Follow Us
              </p>
              <div className="flex items-center gap-4 text-dark-800">
                <a
                  href="https://artofdum.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Art of Dum Website"
                  className="p-1.5 hover:text-gold-700 transition-colors rounded hover:bg-sand-300/50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                    <path strokeWidth="1.5" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-1.5 hover:text-gold-700 transition-colors rounded hover:bg-sand-300/50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" strokeWidth="1.5" />
                    <path strokeWidth="1.5" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
                  </svg>
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="p-1.5 hover:text-gold-700 transition-colors rounded hover:bg-sand-300/50"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://tripadvisor.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TripAdvisor"
                  className="p-1.5 hover:text-gold-700 transition-colors rounded hover:bg-sand-300/50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2.5 cols on lg) */}
          <div className="lg:col-span-2">
            <FooterAccordion
              title="Quick Links"
              isOpen={openSection === "quick-links"}
              onToggle={() => toggleSection("quick-links")}
            >
              <ul className="space-y-2 text-xs text-dark-700">
                <li>
                  <a href="#menu" className="hover:text-gold-700 transition-colors block py-0.5">
                    Menu
                  </a>
                </li>
                <li>
                  <a href="#experience" className="hover:text-gold-700 transition-colors block py-0.5">
                    Reserve an Experience
                  </a>
                </li>
                <li>
                  <a href="#order" className="hover:text-gold-700 transition-colors block py-0.5">
                    Online Order
                  </a>
                </li>
                <li>
                  <a href="#story" className="hover:text-gold-700 transition-colors block py-0.5">
                    The Dum Story
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-gold-700 transition-colors block py-0.5">
                    Contact
                  </a>
                </li>
              </ul>
            </FooterAccordion>
          </div>

          {/* Column 3: Policies (2.5 cols on lg) */}
          <div className="lg:col-span-2">
            <FooterAccordion
              title="Policies"
              isOpen={openSection === "policies"}
              onToggle={() => toggleSection("policies")}
            >
              <ul className="space-y-2 text-xs text-dark-700">
                <li>
                  <a href="#privacy" className="hover:text-gold-700 transition-colors block py-0.5">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-gold-700 transition-colors block py-0.5">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#cookies" className="hover:text-gold-700 transition-colors block py-0.5">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#cancellation" className="hover:text-gold-700 transition-colors block py-0.5">
                    Cancellation Policy
                  </a>
                </li>
              </ul>
            </FooterAccordion>
          </div>

          {/* Column 4: Newsletter / Stay Connected (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl text-dark-900 font-normal">
              Stay Connected to Tradition
            </h3>
            <p className="text-xs text-dark-700 leading-relaxed italic font-serif">
              Sign up to explore our culinary heritage and the hands that keep it alive.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center w-full mt-3 bg-sand-100/90 border border-sand-300"
            >
              <input
                type="email"
                placeholder="Enter email address"
                required
                aria-label="Email address for newsletter"
                className="w-full bg-transparent px-3.5 py-2.5 text-xs text-dark-900 placeholder:text-dark-600 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-sand-300/80 hover:bg-dark-900 hover:text-sand-50 text-dark-900 text-[11px] uppercase tracking-widest font-medium transition-colors whitespace-nowrap"
              >
                Subscribe &gt;
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-6 text-center text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-dark-600">
          © {new Date().getFullYear()} ART OF DUM. CRAFTED BY SCRAFT.
        </div>
      </div>
    </footer>
  );
}
