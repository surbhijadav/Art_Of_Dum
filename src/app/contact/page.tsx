import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Art of Dum",
  description:
    "Contact Art of Dum at Reem Mall, Al Reem Island, Abu Dhabi.",
};

/** Map action built from the existing address on file (MapSection / Footer). */
const VIEW_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Reem+Mall%2C+Al+Reem+Island%2C+Abu+Dhabi";

const infoLabelClass =
  "text-[12px] uppercase tracking-[0.22em] text-dark-900 font-medium";

const infoBodyClass = "mt-4 text-[14px] text-dark-700 leading-relaxed";

export default function ContactPage() {
  return (
    <main className="w-full flex-1 bg-sand-50 text-dark-900 px-6 sm:px-8 pt-28 sm:pt-32 md:pt-36 pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl">
        {/* Editorial page label + heading */}
        <p className="text-[12px] uppercase tracking-[0.25em] text-muted-foreground">
          Contact Us
        </p>
        <h1 className="mt-4 font-serif text-[40px] sm:text-5xl md:text-[56px] font-medium tracking-tight">
          Keep In Touch With Us.
        </h1>
        <span
          aria-hidden="true"
          className="mt-6 block h-px w-10 bg-gold-600/70"
        />

        {/* Contact information columns — existing details from MapSection/Footer */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
          <section aria-label="Location">
            <h2 className={infoLabelClass}>Location</h2>
            <span
              aria-hidden="true"
              className="mt-3 block h-px w-8 bg-sand-300"
            />
            <p className={infoBodyClass}>
              Reem Mall — 1st Floor
              <br />
              Al Reem Island, Najmat Abu Dhabi
              <br />
              Abu Dhabi, United Arab Emirates
            </p>
          </section>

          <section aria-label="Mail">
            <h2 className={infoLabelClass}>Mail</h2>
            <span
              aria-hidden="true"
              className="mt-3 block h-px w-8 bg-sand-300"
            />
            <p className={infoBodyClass}>
              <a
                href="mailto:info@aod.com"
                className="underline underline-offset-4 hover:text-gold-700 transition-colors"
              >
                info@aod.com
              </a>
              <br />
              <a
                href="https://artofdum.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-gold-700 transition-colors"
              >
                artofdum.com
              </a>
            </p>
          </section>

          <section aria-label="Phone numbers">
            <h2 className={infoLabelClass}>Phone Numbers</h2>
            <span
              aria-hidden="true"
              className="mt-3 block h-px w-8 bg-sand-300"
            />
            <p className={infoBodyClass}>
              <a
                href="tel:+971568561276"
                className="underline underline-offset-4 hover:text-gold-700 transition-colors"
              >
                +971 56 856 1276
              </a>
              <br />
              Open all days, 11 am to 11 pm
            </p>
          </section>
        </div>

        {/* View Map action */}
        <a
          href={VIEW_MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-12 text-[12px] uppercase tracking-[0.22em] text-dark-900 underline underline-offset-8 hover:text-gold-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        >
          View Map
        </a>

        {/* Divider + form */}
        <div className="mt-14 sm:mt-16 border-t border-sand-300" />
        <div className="mt-14 sm:mt-16">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
