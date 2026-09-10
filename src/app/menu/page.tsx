import type { Metadata } from "next";
import MenuExperienceSection from "@/components/sections/MenuExperienceSection";

export const metadata: Metadata = {
  title: "Menu | Art of Dum",
  description:
    "Explore the Art of Dum menu: slow-cooked Indian food, beverages, and sheesha.",
};

export default function MenuPage() {
  return (
    <main className="w-full flex-1 flex flex-col bg-sand-50 text-dark-900">
      <section
        aria-labelledby="menu-page-heading"
        className="w-full px-6 pt-28 pb-20 overflow-x-clip sm:px-8 sm:pt-32 sm:pb-24 md:pt-36 md:pb-32 lg:px-12 xl:px-20"
      >
        <div className="mx-auto w-full max-w-[1400px]">
          {/* Page heading */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-gold-600/50 sm:w-10"
              />
              <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold-700 sm:text-xs">
                Art of Dum
              </span>
              <span
                aria-hidden="true"
                className="h-px w-8 bg-gold-600/50 sm:w-10"
              />
            </div>
            <h1
              id="menu-page-heading"
              className="mt-4 font-serif text-4xl font-medium tracking-tight text-dark-900 sm:mt-5 sm:text-[44px] lg:text-[52px]"
            >
              Our Menu
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#5C554E] sm:mt-5 sm:text-base">
              Slow-cooked food, handcrafted beverages and premium sheesha —
              select a menu to explore it in full.
            </p>
          </div>

          {/* Menu cards showcase (Food / Beverages / Sheesha) */}
          <div className="mt-12 sm:mt-16">
            <MenuExperienceSection />
          </div>
        </div>
      </section>
    </main>
  );
}
