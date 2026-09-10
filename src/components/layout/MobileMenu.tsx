"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RESERVE_EXPERIENCE_LINKS } from "@/lib/navigation";
import { RESTAURANT_TALABAT_URL } from "@/lib/restaurant";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  /** Destination for leaf items; parent triggers (with children) have none. */
  href?: string;
  /** External links (e.g. Talabat) open in a new browser tab. */
  external?: boolean;
  /** Items with children render as an expandable section, not a link. */
  children?: readonly NavItem[];
}

const NAV_LINKS: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  {
    label: "Reserve an Experience",
    children: RESERVE_EXPERIENCE_LINKS,
  },
  { label: "Contact", href: "/contact" },
  { label: "Online Order", href: RESTAURANT_TALABAT_URL, external: true },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  // Parent sections start collapsed unless the current route is one of
  // their children (e.g. an experience subroute).
  const [openSection, setOpenSection] = useState<string | null>(() =>
    NAV_LINKS.find(
      (item) =>
        item.children?.some((child) => child.href === pathname)
    )?.label ?? null
  );

  const toggleSection = (label: string) => {
    setOpenSection((prev) => (prev === label ? null : label));
  };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between bg-white text-dark-900 transition-opacity duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      {/* Top Header Row with Logo & Close Button */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-sand-200">
        <Link href="/" onClick={onClose} className="inline-block">
          <Image
            src="/images/logo.png"
            alt="Art of Dum"
            width={110}
            height={45}
            className="w-[100px] h-auto object-contain"
            priority
          />
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="p-2 text-dark-900 hover:text-gold-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 rounded"
          aria-label="Close navigation menu"
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
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 px-8 py-10 flex flex-col justify-start gap-6">
        {NAV_LINKS.map((item) => {
          const isParentActive = Boolean(
            item.children?.some((child) => child.href === pathname)
          );
          return (
            <div key={item.label}>
              {item.children ? (
                /* Parent trigger — expands/collapses, never navigates */
                <button
                  type="button"
                  onClick={() => toggleSection(item.label)}
                  aria-expanded={openSection === item.label}
                  aria-controls={`mobile-section-${item.label
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className={`w-full flex items-center justify-between text-left font-serif text-2xl transition-colors py-2 block border-b border-sand-100/60 cursor-pointer ${
                    isParentActive
                      ? "text-gold-600"
                      : "text-dark-800 hover:text-gold-600"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="text-lg leading-none text-dark-700"
                  >
                    {openSection === item.label ? "−" : "+"}
                  </span>
                </button>
              ) : item.href ? (
                item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="font-serif text-2xl text-dark-800 hover:text-gold-600 transition-colors py-2 block border-b border-sand-100/60"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`font-serif text-2xl transition-colors py-2 block border-b border-sand-100/60 ${
                      pathname === item.href
                        ? "text-gold-600"
                        : "text-dark-800 hover:text-gold-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              ) : null}
              {item.children && openSection === item.label && (
                <div className="mt-1 ml-3 pl-4 border-l border-sand-200 flex flex-col">
                  {item.children.map((child) =>
                    child.href ? (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onClose}
                        aria-current={
                          pathname === child.href ? "page" : undefined
                        }
                        className={`font-serif text-lg transition-colors py-1.5 ${
                          pathname === child.href
                            ? "text-gold-600"
                            : "text-dark-700 hover:text-gold-600"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ) : null
                  )}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom Social Links & Info */}
      <div className="px-8 pb-10 pt-4 border-t border-sand-200">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Follow Us
        </p>
        <div className="flex items-center gap-5 text-dark-800">
          <a
            href="https://artofdum.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Website"
            className="hover:text-gold-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
              <path strokeWidth="1.5" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-gold-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" strokeWidth="1.5" />
              <path strokeWidth="1.5" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
            </svg>
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter / X"
            className="hover:text-gold-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://tripadvisor.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Reviews"
            className="hover:text-gold-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
