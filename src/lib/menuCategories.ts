/**
 * Menu page categories — single source of truth for the tab-based
 * Food / Beverages / Sheesha menu selector.
 *
 * PDFs live in /public/pdf and open directly in a new browser tab
 * (paths below are URL-encoded; the actual filenames are noted per
 * entry). Visuals resolve through the shared image map in `images.ts`
 * so the page only ever references curated library assets.
 */
import { getMenuImage } from "@/lib/images";
import type { MenuImage } from "@/lib/images";

export type MenuCategoryId = "food" | "beverages" | "sheesha";

export interface MenuCategory {
  /** Tab + panel identifier; also the URL hash used for deep links. */
  id: MenuCategoryId;
  /** Short label rendered in the tab. */
  label: string;
  /** Display title inside the category panel. */
  title: string;
  /** Short supporting copy shown under the title. */
  description: string;
  /** CTA anchor text. */
  ctaLabel: string;
  /** Encoded public URL of the category's PDF menu. */
  pdf: string;
  /** Curated visual for the category card. */
  image: MenuImage;
  /** Intrinsic source dimensions (keeps next/image at its natural ratio). */
  imageWidth: number;
  imageHeight: number;
  /** Layout orientation of `image`; drives the editorial grid placement. */
  orientation: "landscape" | "portrait";
}

const menuImage = (id: string): MenuImage => {
  const image = getMenuImage(id);
  if (!image) throw new Error(`Unknown menu image id: ${id}`);
  return image;
};

export const MENU_CATEGORIES: readonly MenuCategory[] = [
  {
    id: "food",
    label: "Food",
    title: "Food",
    description:
      "Sealed in clay pots and slow-cooked over gentle heat, our dum cuisine keeps every flavour and nutrient intact — the traditional heart of Art of Dum.",
    ctaLabel: "View Food Menu",
    // File: "AOD Reem Menu - Without Prices.pdf"
    pdf: "/pdf/AOD%20Reem%20Menu%20-%20Without%20Prices.pdf",
    image: menuImage("food-10210"),
    imageWidth: 5435,
    imageHeight: 3623,
    orientation: "landscape",
  },
  {
    id: "beverages",
    label: "Beverages",
    title: "Beverages",
    description:
      "A refined, handcrafted collection — composed to evoke nostalgia and complement the slow-cooked fare.",
    ctaLabel: "View Beverage Menu",
    // File: "Bevg Menu Reem - Without Prices.pdf"
    pdf: "/pdf/Bevg%20Menu%20Reem%20-%20Without%20Prices.pdf",
    image: menuImage("beverage-9297"),
    imageWidth: 3696,
    imageHeight: 4928,
    orientation: "portrait",
  },
  {
    id: "sheesha",
    label: "Sheesha",
    title: "Sheesha",
    description:
      "Premium blends and ornate pipes in our warm lounge — an atmospheric ritual made for slow evenings.",
    ctaLabel: "View Sheesha Menu",
    // File: "AOD Sheesha Menu - without prices.pdf"
    pdf: "/pdf/AOD%20Sheesha%20Menu%20-%20without%20prices.pdf",
    image: menuImage("sheesha-5108"),
    imageWidth: 4284,
    imageHeight: 5712,
    orientation: "portrait",
  },
];
