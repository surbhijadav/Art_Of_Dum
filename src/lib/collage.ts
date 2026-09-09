/**
 * Collage compositions for the Home "Our Menu" showcase.
 *
 * Composes images from the central registry (images.ts) — no duplicated
 * asset paths. Every cell carries the photograph's REAL intrinsic
 * dimensions (measured from the source files), so the gallery renders
 * complete images at their natural aspect ratios: row widths are
 * distributed proportionally to each ratio (CSS flex justification),
 * which equalises row heights WITHOUT fixed frames, backgrounds,
 * letterboxing, or cropping.
 */
import { getMenuImage } from "./images";
import type { MenuImage, ShowcaseCategory } from "./images";

export interface CollageCell {
  image: MenuImage;
  /** Intrinsic pixel width of the source file. */
  width: number;
  /** Intrinsic pixel height of the source file. */
  height: number;
}

export interface CollageCategory {
  /** Curated slides — each slide is a list of justified rows. */
  slides: CollageCell[][][];
}

const cell = (id: string, width: number, height: number): CollageCell => {
  const image = getMenuImage(id);
  if (!image) throw new Error(`Unknown menu image id: ${id}`);
  return { image, width, height };
};

export const HOME_COLLAGES: Record<ShowcaseCategory, CollageCategory> = {
  // Food library is landscape 3:2 → full-width hero over a large pair
  // (3 prominent images per composition).
  food: {
    slides: [
      [
        [cell("food-10210", 5435, 3623)],
        [cell("food-10308", 5518, 3678), cell("food-10528", 4274, 2849)],
      ],
      [
        [cell("food-9965", 5684, 3789)],
        [cell("food-10545", 5166, 3444), cell("food-10553", 5219, 3479)],
      ],
    ],
  },
  // Beverage library is entirely portrait → two rows of two large
  // portraits per composition (2-up reads far larger than 3-up).
  beverages: {
    slides: [
      [
        [cell("beverage-9297", 3696, 4928), cell("beverage-9516", 3910, 5867)],
        [cell("beverage-9445", 3238, 4317), cell("beverage-9710", 3054, 4582)],
      ],
      [
        [cell("beverage-9639", 4431, 6647), cell("beverage-9720", 3460, 5190)],
        [cell("beverage-10134", 3401, 5101), cell("beverage-9764", 3727, 5590)],
      ],
    ],
  },
  // Sheesha library is entirely portrait (3:4 and 9:16) → same large
  // 2×2 portrait compositions.
  sheesha: {
    slides: [
      [
        [cell("sheesha-5108", 4284, 5712), cell("sheesha-5110", 4284, 5712)],
        [cell("sheesha-5115", 4284, 5712), cell("sheesha-3", 1080, 1920)],
      ],
      [
        [cell("sheesha-5109", 4284, 5712), cell("sheesha-5112", 4284, 5712)],
        [
          cell("sheesha-whatsapp-1", 960, 1280),
          cell("sheesha-whatsapp-2", 960, 1280),
        ],
      ],
    ],
  },
};
