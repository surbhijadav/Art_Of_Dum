import type { Metadata } from "next";
import ReserveTableForm from "@/components/forms/ReserveTableForm";
import {
  RESTAURANT_HOURS,
  RESTAURANT_PHONE_TEL,
} from "@/lib/restaurant";

export const metadata: Metadata = {
  title: "Reserve a Table | Art of Dum",
  description:
    "Reserve a table at Art of Dum, Reem Mall, Abu Dhabi. Choose your experience, date and time, then confirm your reservation request via WhatsApp or a call.",
};

/**
 * "Reserve a Table" — dedicated booking page. Centered editorial
 * layout: refined introduction, then a compact reservation request
 * panel. The website never confirms bookings itself; every request is
 * delivered to the restaurant over WhatsApp or a phone call.
 */
export default function ReserveTablePage() {
  return (
    <main className="w-full flex-1 bg-sand-50 text-dark-900 px-6 pt-28 pb-20 overflow-x-clip sm:px-8 sm:pt-32 sm:pb-28 md:pt-36">
      <div className="mx-auto w-full max-w-3xl">
        {/* Introduction */}
        <div className="text-center">
          <p className="text-[12px] uppercase tracking-[0.25em] text-gold-700">
            Reservations
          </p>
          <h1 className="mt-4 font-serif text-[40px] font-medium tracking-tight sm:text-5xl md:text-[56px]">
            Reserve a Table
          </h1>
          <span
            aria-hidden="true"
            className="mx-auto mt-6 block h-px w-10 bg-gold-600/70"
          />
          <p className="mx-auto mt-6 max-w-md font-serif text-lg font-medium leading-[1.8] text-[#2e2a25] sm:mt-7 sm:text-xl">
            Choose your preferred experience, date and time, and let us
            prepare your table.
          </p>
        </div>

        {/* Reservation request panel */}
        <section
          aria-label="Reservation details"
          className="mt-12 rounded-[10px] border border-sand-300 bg-sand-100 px-6 py-8 shadow-[0_28px_56px_-36px_rgba(18,17,16,0.3)] sm:mt-14 sm:px-10 sm:py-12"
        >
          <h2 className="font-serif text-2xl font-medium tracking-tight sm:text-[28px]">
            Reservation Details
          </h2>
          <div className="mt-8">
            <ReserveTableForm />
          </div>
        </section>

        {/* Reassurance line — existing published details */}
        <p className="mt-8 text-center text-[12px] uppercase tracking-[0.22em] text-muted-foreground">
          {RESTAURANT_HOURS} ·{" "}
          <a
            href={`tel:${RESTAURANT_PHONE_TEL}`}
            className="text-dark-900 underline underline-offset-8 transition-colors hover:text-gold-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          >
            Reserve by Phone
          </a>
        </p>
      </div>
    </main>
  );
}
