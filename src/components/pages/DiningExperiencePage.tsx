interface DiningExperiencePageProps {
  title: string;
  /** Optional override for the supporting line. */
  description?: string;
}

/**
 * Minimal shared body for the Reserve an Experience pages.
 * Placeholder structure only — full designs will come from their own
 * Figma sections later.
 */
export default function DiningExperiencePage({
  title,
  description,
}: DiningExperiencePageProps) {
  return (
    <main className="w-full flex-1 bg-white text-dark-900 px-6 sm:px-8 pt-28 sm:pt-32 md:pt-36 pb-20 sm:pb-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-serif text-[40px] sm:text-5xl md:text-[56px] font-medium tracking-tight">
          {title}
        </h1>
        <p className="mt-8 font-serif font-medium text-xl sm:text-[22px] text-[#2e2a25] leading-[1.8]">
          {description ??
            `Reserve the ${title.toLowerCase()} experience at Art of Dum. For bookings and enquiries, call us and our team will help you plan your evening.`}
        </p>
        <div className="mt-8 sm:mt-10">
          <a
            href="tel:+971568561276"
            className="inline-flex items-center justify-center px-9 sm:px-11 py-4 border border-dark-900/80 text-dark-900 hover:bg-dark-900 hover:text-sand-50 transition-all duration-300 text-sm uppercase tracking-[0.28em] font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 active:scale-[0.98]"
          >
            Reserve a Table
          </a>
        </div>
      </div>
    </main>
  );
}
