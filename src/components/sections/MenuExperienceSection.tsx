import Image from "next/image";
import { MENU_CATEGORIES } from "@/lib/menuCategories";

/**
 * Menu page showcase — Food, Beverages, and Sheesha displayed together in one page.
 *
 * Each card features a curated photograph, category title, supporting description,
 * and opens the official PDF menu directly in a new browser tab.
 */
export default function MenuExperienceSection() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3 lg:gap-10">
        {MENU_CATEGORIES.map((category, index) => (
          <a
            key={category.id}
            href={category.pdf}
            target="_blank"
            rel="noopener noreferrer"
            // aria-label={`Open the ${category.title} menu (PDF) in a new tab`}
            className="group flex flex-col overflow-hidden rounded-[10px] border border-[#e5ded2] bg-white text-dark-900 shadow-[0_4px_20px_-4px_rgba(18,17,16,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-600/50 hover:shadow-[0_20px_40px_-12px_rgba(18,17,16,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 focus-visible:ring-offset-4 focus-visible:ring-offset-sand-50"
          >
            {/* Card Image */}
            <div className="relative aspect-[4/3] sm:aspect-square md:aspect-[4/3] lg:aspect-square w-full overflow-hidden bg-sand-200">
              <Image
                src={category.image.src}
                alt={category.image.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-dark-900/30 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                <span className="inline-flex items-center gap-2 rounded-full bg-sand-50/95 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-dark-900 shadow-md">
                  View Menu
                  <span aria-hidden="true" className="text-gold-600">
                    ↗
                  </span>
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="flex flex-1 flex-col items-center justify-between p-6 text-center sm:p-8">
              <div>
                <div className="flex items-center justify-center gap-2 text-gold-700">
                  <span className="h-px w-6 bg-gold-600/40" />
                </div>

                <h2 className="mt-3 font-serif text-2xl font-medium tracking-tight text-dark-900 transition-colors duration-300 group-hover:text-gold-700 sm:text-3xl">
                  {category.title}
                </h2>

                <p className="mt-3 text-[13px] leading-relaxed text-[#5C554E] sm:text-[14px]">
                  {category.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-6 w-full pt-2">
                <span className="inline-flex min-h-[40px] w-full items-center justify-center gap-2 rounded-full border border-dark-900/15 bg-sand-50 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-dark-900 transition-all duration-300 group-hover:border-gold-600 group-hover:bg-dark-900 group-hover:text-sand-50 sm:text-[12px]">
                  {category.ctaLabel}
                  <span
                    aria-hidden="true"
                    className="text-gold-600 transition-colors group-hover:text-gold-400"
                  >
                    ↗
                  </span>
                </span>

              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
