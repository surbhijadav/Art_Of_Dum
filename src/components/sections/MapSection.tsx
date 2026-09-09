import Image from "next/image";

/**
 * Location section — Column 1 reference (screenshot 181214).
 * Heading, map, divider and address/contact block.
 * All address/contact text comes from the project's own data (footer).
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
          {/* Map image */}
          <figure className="relative w-full overflow-hidden bg-sand-200">
            <Image
              src="/map.png"
              alt="Map showing the Art of Dum location at Reem Mall, Al Reem Island, Abu Dhabi"
              width={543}
              height={602}
              sizes="(min-width: 1024px) 640px, 92vw"
              className="h-auto w-full object-cover"
            />
          </figure>

          {/* Address & contact */}
          <div className="pt-1 lg:pt-3">
            <p className="font-serif text-xl sm:text-2xl text-dark-900">
              Reem Mall — 1st Floor
            </p>
            <div className="mt-3.5 space-y-1.5 text-[15px] sm:text-base text-[#2e2a25] leading-relaxed">
              <p>Al Reem Island, Najmat Abu Dhabi</p>
              <p>Abu Dhabi, United Arab Emirates</p>
            </div>

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
