import LocationMap from "@/components/map/LocationMap";
import { RESTAURANT_DIRECTIONS_URL } from "@/lib/restaurant";

/**
 * Location section — heading, interactive map, divider and
 * address/contact block. All address/contact text comes from the
 * project's own data (footer / restaurant config).
 */
export default function MapSection() {
  return (
    <section
      aria-labelledby="location-heading"
      className="w-full bg-white px-6 sm:px-8 pt-14 pb-16 sm:pt-16 sm:pb-20"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="location-heading"
          className="font-serif text-3xl sm:text-4xl md:text-[40px] font-semibold text-dark-900 tracking-tight"
        >
          Reem Island
        </h2>
        <span
          aria-hidden="true"
          className="mt-5 block h-px w-10 bg-gold-600/70"
        />

        <div className="mt-10 sm:mt-12 grid gap-10 lg:grid-cols-[3fr_2fr] lg:items-start lg:gap-14">
          {/* Interactive map — gestures are scoped to the map container */}
          <div className="relative w-full overflow-hidden border border-sand-300 bg-sand-200">
            <LocationMap className="block h-[340px] w-full sm:h-[420px] lg:h-[480px]" />
          </div>

          {/* Address & contact */}
          <div className="pt-1 lg:pt-3">
            <p className="font-serif text-xl sm:text-2xl text-dark-900">
              Reem Mall — 1st Floor
            </p>
            <div className="mt-3.5 space-y-1.5 text-[15px] sm:text-base text-[#2e2a25] leading-relaxed">
              <p>Al Reem Island, Najmat Abu Dhabi</p>
              <p>Abu Dhabi, United Arab Emirates</p>
            </div>

            <a
              href={RESTAURANT_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-[44px] items-center gap-2 border border-dark-900/25 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.22em] text-dark-900 transition-colors duration-300 hover:border-gold-600 hover:text-gold-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Get Directions
              <span aria-hidden="true">↗</span>
            </a>

            <div className="mt-8 pt-7 border-t border-sand-300 space-y-3 text-[15px] sm:text-base">
              <p>
                <span className="text-muted-foreground">Phone: </span>
                <a
                  href="tel:+971568561276"
                  className="text-dark-900 underline-offset-4 hover:text-gold-700 hover:underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                >
                  +971 56 856 1276
                </a>
              </p>
              <p>
                <span className="text-muted-foreground">Email: </span>
                <a
                  href="mailto:info@aod.com"
                  className="text-dark-900 underline-offset-4 hover:text-gold-700 hover:underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                >
                  info@aod.com
                </a>
              </p>
              <p>
                <span className="text-muted-foreground">Hours: </span>
                <span className="text-dark-900">
                  Open all days, 11 am to 11 pm
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
