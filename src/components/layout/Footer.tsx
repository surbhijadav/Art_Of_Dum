
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  RESTAURANT_INSTAGRAM_URL,
  RESTAURANT_PHONE_TEL,
  RESTAURANT_TALABAT_URL,
  RESTAURANT_WHATSAPP_URL,
} from "@/lib/restaurant";

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

            {/* Contact & Social — WhatsApp, Call, Instagram only */}
            <div className="pt-2">
              <p className="text-[11px] uppercase tracking-[0.2em] text-dark-600 mb-3">
                Connect With Us
              </p>
              <div className="flex items-center gap-4 text-dark-800">
                <a
                  href={RESTAURANT_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with Art of Dum on WhatsApp"
                  title="WhatsApp"
                  className="p-2 -m-1.5 hover:text-gold-700 transition-colors rounded hover:bg-sand-300/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
                <a
                  href={`tel:${RESTAURANT_PHONE_TEL}`}
                  aria-label="Call Art of Dum"
                  title="Call"
                  className="p-2 -m-1.5 hover:text-gold-700 transition-colors rounded hover:bg-sand-300/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </a>
                <a
                  href={RESTAURANT_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Art of Dum on Instagram"
                  title="Instagram"
                  className="p-2 -m-1.5 hover:text-gold-700 transition-colors rounded hover:bg-sand-300/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" strokeWidth="1.5" />
                    <path strokeWidth="1.5" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
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
                  <a
                    href={RESTAURANT_TALABAT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold-700 transition-colors block py-0.5"
                  >
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
