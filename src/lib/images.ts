/**
 * Central image mapping for all real restaurant assets.
 *
 * - Sources of truth: /REEM MENU/FOOD, /REEM MENU/BEVERAGES, /REEM SHEESHA,
 *   /reserve_an_experience
 *   (plus the unique RAW variant that has no processed counterpart).
 * - Files under /Screenshots are Figma design references ONLY and must
 *   never be referenced here or rendered as website content.
 * - Paths are URL paths rooted at `/` (public folder). Folder names
 *   contain spaces on purpose — browsers/next/image handle the encoded
 *   form (%20) transparently. Never use filesystem paths (C:\, ./public).
 */

/** "experiences" covers the /reserve_an_experience showcase imagery. */
export type MenuImageCategory = "food" | "beverages" | "sheesha" | "experiences";

/** Categories that render as Home/Menu showcases (excludes "experiences"). */
export type ShowcaseCategory = Exclude<MenuImageCategory, "experiences">;

export interface MenuImage {
  /** Stable identifier derived from the source filename. */
  id: string;
  /** URL path below the public folder (spaces kept, encoded by the browser). */
  src: string;
  /** Descriptive alt text; dish names used only when confidently known. */
  alt: string;
  category: MenuImageCategory;
}

export const FOOD_IMAGES: MenuImage[] = [
  {
    id: "food-10201",
    src: "/REEM MENU/FOOD/AOD  REEM FOOD MENU  04-02-2610201.jpg",
    alt: "Slow-cooked dish finished over glowing embers",
    category: "food",
  },
  {
    id: "food-10210",
    src: "/REEM MENU/FOOD/AOD  REEM FOOD MENU  04-02-2610210.jpg",
    alt: "Dum pot cooking over open flames",
    category: "food",
  },
  {
    id: "food-10308",
    src: "/REEM MENU/FOOD/AOD  REEM FOOD MENU  04-02-2610308.jpg",
    alt: "Slow-cooked dish on dark tableware",
    category: "food",
  },
  {
    id: "food-10308-portrait",
    src: "/REEM MENU/FOOD/RAW/AOD  REEM FOOD MENU  04-02-2610308 1.jpg",
    alt: "Slow-cooked dish presented upright in a dark setting",
    category: "food",
  },
  {
    id: "food-10413",
    src: "/REEM MENU/FOOD/AOD  REEM FOOD MENU  04-02-2610413 copy.jpg",
    alt: "Steaming slow-cooked preparation",
    category: "food",
  },
  {
    id: "food-10415",
    src: "/REEM MENU/FOOD/RAW/AOD  REEM FOOD MENU  04-02-2610415.jpg",
    alt: "Freshly cooked dish with rising steam",
    category: "food",
  },
  {
    id: "food-10508",
    src: "/REEM MENU/FOOD/AOD  REEM FOOD MENU  04-02-2610508.jpg",
    alt: "Signature dum dish",
    category: "food",
  },
  {
    id: "food-10508-alt",
    src: "/REEM MENU/FOOD/AOD  REEM FOOD MENU  04-02-2610508 1.jpg",
    alt: "Signature dum dish",
    category: "food",
  },
  {
    id: "food-10528",
    src: "/REEM MENU/FOOD/AOD  REEM FOOD MENU  04-02-2610528.jpg",
    alt: "Rich slow-cooked curry",
    category: "food",
  },
  {
    id: "food-10534",
    src: "/REEM MENU/FOOD/AOD  REEM FOOD MENU  04-02-2610534.jpg",
    alt: "Slow-cooked dish with warm spices",
    category: "food",
  },
  {
    id: "food-10541",
    src: "/REEM MENU/FOOD/AOD  REEM FOOD MENU  04-02-2610541.jpg",
    alt: "Traditional slow-cooked main course",
    category: "food",
  },
  {
    id: "food-10545",
    src: "/REEM MENU/FOOD/AOD  REEM FOOD MENU  04-02-2610545.jpg",
    alt: "Slow-cooked specialty in rich gravy",
    category: "food",
  },
  {
    id: "food-10553",
    src: "/REEM MENU/FOOD/AOD  REEM FOOD MENU  04-02-2610553.jpg",
    alt: "Slow-cooked dish in traditional serveware",
    category: "food",
  },
  {
    id: "food-10557",
    src: "/REEM MENU/FOOD/AOD  REEM FOOD MENU  04-02-2610557.jpg",
    alt: "Slow-cooked dish in moody restaurant light",
    category: "food",
  },
  {
    id: "food-10559",
    src: "/REEM MENU/FOOD/AOD  REEM FOOD MENU  04-02-2610559.jpg",
    alt: "Slow-cooked dish in moody restaurant light",
    category: "food",
  },
  {
    id: "food-9883",
    src: "/REEM MENU/FOOD/AOD  REEM FOOD MENU  04-02-269883 copy.jpg",
    alt: "Slow-cooked dish with warm ambient glow",
    category: "food",
  },
  {
    id: "food-9920",
    src: "/REEM MENU/FOOD/AOD  REEM FOOD MENU  04-02-269920.jpg",
    alt: "Slow-cooked dish in dark presentation",
    category: "food",
  },
  {
    id: "food-9943",
    src: "/REEM MENU/FOOD/AOD  REEM FOOD MENU  04-02-269943 1.jpg",
    alt: "Slow-cooked dish, dark moody styling",
    category: "food",
  },
  {
    id: "food-9965",
    src: "/REEM MENU/FOOD/AOD  REEM FOOD MENU  04-02-269965.jpg",
    alt: "Flame-kissed slow-cooked dish",
    category: "food",
  },
  {
    id: "food-9965-alt",
    src: "/REEM MENU/FOOD/AOD  REEM FOOD MENU  04-02-269965 copy.jpg",
    alt: "Flame-kissed slow-cooked dish",
    category: "food",
  },
  {
    id: "food-9994",
    src: "/REEM MENU/FOOD/AOD  REEM FOOD MENU  04-02-269994.jpg",
    alt: "Slow-cooked dish in low light",
    category: "food",
  },
  {
    id: "food-7684",
    // Safe-named copy of "AOD MENU & AGGREGATOR NOV 25_7684 copy 2.jpg" —
    // the ampersand breaks Next's image optimizer query round-trip.
    src: "/REEM MENU/FOOD/AOD MENU and AGGREGATOR NOV 25_7684 copy 2.jpg",
    alt: "Hands preparing food in the warm dum kitchen",
    category: "food",
  },
  {
    id: "food-rice",
    src: "/REEM MENU/FOOD/RICE.jpg",
    alt: "Slow-cooked Indian rice delicacy",
    category: "food",
  },
];

export const BEVERAGE_IMAGES: MenuImage[] = [
  {
    id: "beverage-10134",
    src: "/REEM MENU/BEVERAGES/AOD REEM DRINKS10134.jpg",
    alt: "Handcrafted beverage in moody lighting",
    category: "beverages",
  },
  {
    id: "beverage-9205",
    src: "/REEM MENU/BEVERAGES/AOD REEM DRINKS9205.jpg",
    alt: "Dark moody handcrafted beverage",
    category: "beverages",
  },
  {
    id: "beverage-9206",
    src: "/REEM MENU/BEVERAGES/AOD REEM DRINKS9206.jpg",
    alt: "Dark moody handcrafted beverage",
    category: "beverages",
  },
  {
    id: "beverage-9297",
    src: "/REEM MENU/BEVERAGES/AOD REEM DRINKS9297.jpg",
    alt: "Handcrafted beverage in cool tones",
    category: "beverages",
  },
  {
    id: "beverage-9445",
    src: "/REEM MENU/BEVERAGES/AOD REEM DRINKS9445.jpg",
    alt: "Warm spiced beverage",
    category: "beverages",
  },
  {
    id: "beverage-9516",
    src: "/REEM MENU/BEVERAGES/AOD REEM DRINKS9516.jpg",
    alt: "Golden handcrafted beverage",
    category: "beverages",
  },
  {
    id: "beverage-9639",
    src: "/REEM MENU/BEVERAGES/AOD REEM DRINKS9639 copy.jpg",
    alt: "Dark moody signature drink",
    category: "beverages",
  },
  {
    id: "beverage-9694",
    src: "/REEM MENU/BEVERAGES/AOD REEM DRINKS9694.jpg",
    alt: "Handcrafted beverage",
    category: "beverages",
  },
  {
    id: "beverage-9710",
    src: "/REEM MENU/BEVERAGES/AOD REEM DRINKS9710.jpg",
    alt: "Handcrafted herbal drink",
    category: "beverages",
  },
  {
    id: "beverage-9720",
    src: "/REEM MENU/BEVERAGES/AOD REEM DRINKS9720.jpg",
    alt: "Fresh green handcrafted beverage",
    category: "beverages",
  },
  {
    id: "beverage-9764",
    src: "/REEM MENU/BEVERAGES/AOD REEM DRINKS9764.jpg",
    alt: "Dark moody handcrafted drink",
    category: "beverages",
  },
];

export const SHEESHA_IMAGES: MenuImage[] = [
  {
    id: "sheesha-5108",
    src: "/REEM SHEESHA/IMG_5108.JPG.jpeg",
    alt: "Traditional sheesha in warm lounge lighting",
    category: "sheesha",
  },
  {
    id: "sheesha-5109",
    src: "/REEM SHEESHA/IMG_5109.JPG.jpeg",
    alt: "Traditional sheesha on a lounge table",
    category: "sheesha",
  },
  {
    id: "sheesha-5110",
    src: "/REEM SHEESHA/IMG_5110.JPG.jpeg",
    alt: "Sheesha with smoke rising in the lounge",
    category: "sheesha",
  },
  {
    id: "sheesha-5112",
    src: "/REEM SHEESHA/IMG_5112.JPG.jpeg",
    alt: "Traditional sheesha in golden light",
    category: "sheesha",
  },
  {
    id: "sheesha-5115",
    src: "/REEM SHEESHA/IMG_5115.JPG.jpeg",
    alt: "Sheesha arrangement in the restaurant lounge",
    category: "sheesha",
  },
  {
    id: "sheesha-3",
    src: "/REEM SHEESHA/Shisha 3.jpg",
    alt: "Sheesha presentation with warm glow",
    category: "sheesha",
  },
  {
    id: "sheesha-4",
    src: "/REEM SHEESHA/Shisha 4.jpg",
    alt: "Sheesha presentation in the lounge",
    category: "sheesha",
  },
  {
    id: "sheesha-5",
    src: "/REEM SHEESHA/Shisha 5.jpg",
    alt: "Sheesha with ornate design details",
    category: "sheesha",
  },
  {
    id: "sheesha-6",
    src: "/REEM SHEESHA/Shisha 6.jpg",
    alt: "Sheesha ready for service",
    category: "sheesha",
  },
  {
    id: "sheesha-7",
    src: "/REEM SHEESHA/Shisha 7.jpg",
    alt: "Sheesha in ambient lounge setting",
    category: "sheesha",
  },
  {
    id: "sheesha-whatsapp-1",
    src: "/REEM SHEESHA/WhatsApp Image 2026-04-15 at 15.19.13 (1).jpeg",
    alt: "Sheesha served in the lounge",
    category: "sheesha",
  },
  {
    id: "sheesha-whatsapp-2",
    src: "/REEM SHEESHA/WhatsApp Image 2026-04-15 at 15.19.13.jpeg",
    alt: "Sheesha close-up in the lounge",
    category: "sheesha",
  },
];

export const MENU_IMAGES: MenuImage[] = [
  ...FOOD_IMAGES,
  ...BEVERAGE_IMAGES,
  ...SHEESHA_IMAGES,
];

/**
 * The hero photograph. Pixel-identical (ZNCC 1.000) to the hero image of the
 * previous asset set, recovered from the current food library.
 */
export const HERO_IMAGE: MenuImage = FOOD_IMAGES.find(
  (image) => image.id === "food-7684"
) as MenuImage;

/** Look up a mapped image by its stable id. */
export function getMenuImage(id: string): MenuImage | undefined {
  return MENU_IMAGES.find((image) => image.id === id);
}

/* ------------------------------------------------------------------ */
/* Shared category showcase data — single source of truth for the      */
/* Food / Beverages / Sheesha presentations on Home and Menu.          */
/* ------------------------------------------------------------------ */

/** A showcase image with its tuned crop position. */
export interface ShowcaseImage {
  image: MenuImage;
  position: string;
}

export interface CategoryShowcaseData {
  id: MenuImageCategory;
  title: string;
  description: string;
  images: ShowcaseImage[];
}

const showcaseImage = (id: string, position: string): ShowcaseImage => {
  const image = getMenuImage(id);
  if (!image) throw new Error(`Unknown menu image id: ${id}`);
  return { image, position };
};

export const CATEGORY_SHOWCASES: Record<
  ShowcaseCategory,
  CategoryShowcaseData
> = {
  food: {
    id: "food",
    title: "Food",
    description:
      "Art of Dum offers a traditional and healthier alternative with dum dishes cooked in sealed clay pots, that keep the flavours, taste as well as the nutrition of the food intact.",
    images: [
      showcaseImage("food-10210", "object-[50%_55%]"),
      showcaseImage("food-10308-portrait", "object-[50%_55%]"),
      showcaseImage("food-10201", "object-[50%_50%]"),
      showcaseImage("food-10508-alt", "object-[50%_55%]"),
      showcaseImage("food-9965-alt", "object-[50%_48%]"),
      showcaseImage("food-rice", "object-[50%_55%]"),
    ],
  },
  beverages: {
    id: "beverages",
    title: "Beverages",
    description:
      "Our beverage menu is designed to evoke nostalgia and perfectly complement the traditional fare. Local tastes and preferences, weather, availability of ingredients, etc. are all considered while crafting.",
    images: [
      showcaseImage("beverage-9297", "object-[50%_50%]"),
      showcaseImage("beverage-9516", "object-[50%_50%]"),
      showcaseImage("beverage-9720", "object-[50%_50%]"),
      showcaseImage("beverage-9445", "object-[50%_50%]"),
      showcaseImage("beverage-9639", "object-[50%_50%]"),
      showcaseImage("beverage-10134", "object-[50%_50%]"),
    ],
  },
  sheesha: {
    id: "sheesha",
    title: "Sheesha",
    description:
      "Our beverage menu is designed to evoke nostalgia and perfectly complement the traditional fare. Local tastes and preferences, weather, availability of ingredients, etc. are all considered while crafting.",
    // Editorial order (analysis-based): alternates the two shoots so no
    // near-identical frames sit adjacent; opens cool-toned with the
    // warmest, most detailed frame as the visible peek; the most
    // similar pair (5110/5112, ZNCC 0.914 — the shoot's minimum) closes.
    images: [
      showcaseImage("sheesha-5108", "object-[50%_50%]"),
      showcaseImage("sheesha-3", "object-[50%_50%]"),
      showcaseImage("sheesha-5115", "object-[50%_50%]"),
      showcaseImage("sheesha-5", "object-[50%_50%]"),
      showcaseImage("sheesha-5110", "object-[50%_50%]"),
      showcaseImage("sheesha-5112", "object-[50%_50%]"),
    ],
  },
};
