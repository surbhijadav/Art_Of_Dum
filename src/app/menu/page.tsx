import type { Metadata } from "next";
import CategoryShowcase from "@/components/sections/CategoryShowcase";
import { CATEGORY_SHOWCASES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Menu | Art of Dum",
  description:
    "Explore the Art of Dum menu: slow-cooked Indian food, beverages, and sheesha.",
};

/** Shared heading treatment for the three menu sections. */
function SectionHeading({ id, title }: { id: string; title: string }) {
  return (
    <>
      <h2
        id={id}
        className="font-serif text-4xl sm:text-[44px] lg:text-[52px] font-medium tracking-tight text-center text-dark-900"
      >
        {title}
      </h2>
      <span
        aria-hidden="true"
        className="mt-5 sm:mt-6 mx-auto block h-px w-10 bg-gold-600/70"
      />
    </>
  );
}

export default function MenuPage() {
  return (
    <main className="w-full flex-1 flex flex-col bg-white text-dark-900">
      <h1 className="sr-only">Menu</h1>

      {/* Anchor target sections — ordered: Food, Beverages, Sheesha.
          Each renders the shared CategoryShowcase (carousel variant, same
          premium presentation as the Home tabs) fed by the shared category
          data. scroll-margin keeps each section clear of the fixed header. */}
      <section
        id="food"
        aria-labelledby="food-heading"
        className="w-full px-6 sm:px-8 lg:px-12 xl:px-20 pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 md:pb-24 border-b border-sand-200/60 scroll-mt-24 sm:scroll-mt-28 overflow-x-clip"
      >
        <div className="max-w-[1400px] mx-auto">
          <SectionHeading
            id="food-heading"
            title={CATEGORY_SHOWCASES.food.title}
          />
          <div className="mt-6 sm:mt-8">
            <CategoryShowcase
              category={CATEGORY_SHOWCASES.food}
              variant="carousel"
            />
          </div>
        </div>
      </section>

      <section
        id="beverages"
        aria-labelledby="beverages-heading"
        className="w-full px-6 sm:px-8 lg:px-12 xl:px-20 py-16 sm:py-20 md:py-24 border-b border-sand-200/60 scroll-mt-24 sm:scroll-mt-28 overflow-x-clip"
      >
        <div className="max-w-[1400px] mx-auto">
          <SectionHeading
            id="beverages-heading"
            title={CATEGORY_SHOWCASES.beverages.title}
          />
          <div className="mt-6 sm:mt-8">
            <CategoryShowcase
              category={CATEGORY_SHOWCASES.beverages}
              variant="carousel"
            />
          </div>
        </div>
      </section>

      <section
        id="sheesha"
        aria-labelledby="sheesha-heading"
        className="w-full px-6 sm:px-8 lg:px-12 xl:px-20 py-16 sm:py-20 md:py-24 scroll-mt-24 sm:scroll-mt-28 overflow-x-clip"
      >
        <div className="max-w-[1400px] mx-auto">
          <SectionHeading
            id="sheesha-heading"
            title={CATEGORY_SHOWCASES.sheesha.title}
          />
          <div className="mt-6 sm:mt-8">
            <CategoryShowcase
              category={CATEGORY_SHOWCASES.sheesha}
              variant="carousel"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
