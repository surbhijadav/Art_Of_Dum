import type { Metadata } from "next";
import Link from "next/link";
import ReservationForm from "@/components/forms/ReservationForm";

export const metadata: Metadata = {
  title: "Make a Reservation | Art of Dum",
  description:
    "Reserve a table at Art of Dum, Reem Mall, Al Reem Island, Abu Dhabi. Book online, or reserve by phone.",
};

/**
 * Reservation page — the target of the global "Reserve a Table" CTA.
 * Two-column editorial layout: introduction on the left, cream form
 * panel on the right. The four dining-experience subroutes keep using
 * the shared DiningExperiencePage component.
 */
export default function ReserveExperiencePage() {
  return (
    <main className="w-full flex-1 bg-sand-50 text-dark-900 px-6 sm:px-8 pt-28 sm:pt-32 md:pt-36 pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-14 lg:items-start">
        {/* Introduction */}
        <div className="lg:col-span-5">
          <p className="text-[12px] uppercase tracking-[0.25em] text-gold-700">
            Take Your Seat
          </p>
          <h1 className="mt-4 font-serif text-[40px] sm:text-5xl md:text-[56px] font-medium tracking-tight">
            Make a Reservation
          </h1>
          <span
            aria-hidden="true"
            className="mt-6 block h-px w-10 bg-gold-600/70"
          />
          <p className="mt-6 sm:mt-7 font-serif font-medium text-lg sm:text-xl text-[#2e2a25] leading-[1.8] max-w-md">
            Join us for a truly memorable dining experience in one of Abu
            Dhabi&apos;s most spectacular culinary locations. We promise an
            experience that celebrates the diversity of our delectable food,
            inspired with flavour and loyalty.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[12px] uppercase tracking-[0.22em]">
            <a
              href="tel:+971568561276"
              className="text-dark-900 underline underline-offset-8 hover:text-gold-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              Reserve by Phone
            </a>
            <span
              aria-hidden="true"
              className="h-px w-6 bg-sand-400 hidden sm:block"
            />
            <Link
              href="/reserve-an-experience/private-dining"
              className="text-dark-900 underline underline-offset-8 hover:text-gold-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              Plan an Event
            </Link>
          </div>
        </div>

        {/* Reservation form panel */}
        <div className="lg:col-span-7 mt-12 lg:mt-0">
          <div className="bg-sand-100 border border-sand-300 px-6 sm:px-10 py-8 sm:py-12">
            <h2 className="font-serif text-2xl sm:text-[28px] font-medium tracking-tight">
              Make a Reservation
            </h2>
            <div className="mt-8">
              <ReservationForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
