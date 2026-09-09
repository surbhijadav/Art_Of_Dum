import Image from "next/image";
import EditorialCarousel from "@/components/ui/EditorialCarousel";
import type { CarouselSlide } from "@/components/ui/EditorialCarousel";
import type { CategoryShowcaseData } from "@/lib/images";

interface CategoryShowcaseProps {
  /** Category-specific data from the shared source in `src/lib/images.ts` */
  category: CategoryShowcaseData;
  /**
   * carousel — premium card presentation with peeking neighbours, used by
   * both the Home tabs and the Menu sections. gallery — browse-style
   * staggered editorial grid (currently unused, kept as an option).
   */
  variant?: "carousel" | "gallery";
}

const GALLERY_SIZES = "(min-width: 640px) 45vw, 92vw";

/**
 * Reusable category showcase: the category's introductory text followed
 * by either an editorial carousel or a staggered gallery of its images.
 * Presentation only — tab/section semantics belong to the parent
 * (Home tabs, Menu sections).
 */
export default function CategoryShowcase({
  category,
  variant = "carousel",
}: CategoryShowcaseProps) {
  const slides: CarouselSlide[] = category.images.map(({ image, position }) => ({
    image,
    position,
  }));

  return (
    <div>
      <p className="mx-auto max-w-xl md:max-w-[42rem] text-center font-serif font-medium text-xl sm:text-[22px] md:text-[24px] text-[#2e2a25] leading-[1.8] sm:leading-[1.9]">
        {category.description}
      </p>

      {variant === "gallery" ? (
        <div className="mt-10 sm:mt-12 md:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-16">
          {category.images.map(({ image, position }, index) => (
            <figure
              key={image.id}
              className={`group ${index === 0 ? "mt-0" : "mt-6 sm:mt-8"} ${
                index % 2 === 1 ? "sm:mt-24 lg:mt-28" : ""
              }`}
            >
              <div
                className={`relative overflow-hidden bg-sand-200 ${
                  index % 2 === 0 ? "aspect-[3/4]" : "aspect-[4/5]"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={GALLERY_SIZES}
                  className={`object-cover ${position} motion-safe:transition-transform motion-safe:duration-[1200ms] motion-safe:ease-out motion-safe:group-hover:scale-[1.04]`}
                />
              </div>
              <figcaption
                aria-hidden="true"
                className="mt-3 sm:mt-4 flex items-center gap-3"
              >
                <span className="font-serif italic text-sm text-gold-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="h-px w-8 bg-sand-300" />
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="mt-10 sm:mt-12 md:mt-14">
          <EditorialCarousel
            key={category.id}
            slides={slides}
            label={`${category.title} photography`}
            card
          />
        </div>
      )}
    </div>
  );
}
