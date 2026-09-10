/**
 * Collage compositions for the Home "Our Menu" showcase.
 *
 * ONE composition per menu category — the Home carousel moves between
 * categories (Food → Beverages → Sheesha), and each category slide
 * renders its composition here. Composes images from the central
 * registry (images.ts) — no duplicated asset paths.
 *
 * Every category uses the SAME controlled editorial grid: a 2-image
 * top band, a slightly shorter 3-image middle band, and a 2-image
 * bottom band — all inside ONE fixed gallery rectangle. Images fill
 * their cells (object-cover) with a tuned crop position per frame so
 * the subject stays visible; the grid, not the source dimensions,
 * defines the layout.
 */
import { getMenuImage } from "./images";
import type { MenuImage, ShowcaseCategory } from "./images";

export interface CollageCell {
  image: MenuImage;
  /** Intrinsic pixel width of the source file. */
  width: number;
  /** Intrinsic pixel height of the source file. */
  height: number;
  /** Tuned Tailwind object-position class controlling the crop. */
  position: string;
}

export interface CollageComposition {
  /** Top band — two equal frames. */
  top: readonly [CollageCell, CollageCell];
  /** Middle band — three equal, slightly shorter frames. */
  middle: readonly [CollageCell, CollageCell, CollageCell];
  /** Bottom band — two equal frames. */
  bottom: readonly [CollageCell, CollageCell];
}

const cell = (
  id: string,
  width: number,
  height: number,
  position = "object-[50%_50%]"
): CollageCell => {
  const image = getMenuImage(id);
  if (!image) throw new Error(`Unknown menu image id: ${id}`);
  return { image, width, height, position };
};

export const HOME_COLLAGES: Record<ShowcaseCategory, CollageComposition> = {
  // Landscape-forward library: pairs lead and close, trio in between.
  food: {
    top: [
      cell("food-10210", 5435, 3623, "object-[50%_55%]"),
      cell("food-10201", 5749, 3832, "object-[50%_50%]"),
    ],
    middle: [
      cell("food-10308-portrait", 2674, 3342, "object-[50%_55%]"),
      cell("food-10508-alt", 5073, 3472, "object-[50%_55%]"),
      cell("food-9965-alt", 5684, 3789, "object-[50%_48%]"),
    ],
    bottom: [
      cell("food-rice", 5022, 3348, "object-[50%_55%]"),
      cell("food-10528", 4274, 2849, "object-[50%_50%]"),
    ],
  },
  // Portrait library: contained bands keep every drink elegantly
  // framed inside the same 2 → 3 → 2 rectangle.
  beverages: {
    top: [
      cell("beverage-9297", 3696, 4928),
      cell("beverage-9516", 3910, 5867),
    ],
    middle: [
      cell("beverage-9720", 3460, 5190),
      cell("beverage-9445", 3238, 4317),
      cell("beverage-9639", 4431, 6647),
    ],
    bottom: [
      cell("beverage-10134", 3401, 5101),
      cell("beverage-9205", 3451, 4601),
    ],
  },
  // Portrait library (3:4 and 9:16): same controlled rectangle, same
  // 2 → 3 → 2 rhythm — no giant vertical frames.
  sheesha: {
    top: [
      cell("sheesha-5108", 4284, 5712),
      cell("sheesha-3", 1080, 1920),
    ],
    middle: [
      cell("sheesha-5115", 4284, 5712),
      cell("sheesha-5", 1080, 1920),
      cell("sheesha-5110", 4284, 5712),
    ],
    bottom: [
      cell("sheesha-5112", 4284, 5712),
      cell("sheesha-7", 1080, 1920),
    ],
  },
};
