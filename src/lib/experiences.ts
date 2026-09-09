/**
 * Central data for the "Reserve an Experience" showcase on the Home page.
 * One typed source of truth for the four dining-experience cards;
 * imagery lives in /reserve_an_experience (public). Array order defines
 * the carousel order (Business Dining leads, per the design reference).
 */
import type { MenuImage } from "./images";

export interface DiningExperience {
  /** Stable identifier matching the routed experience slug. */
  id: string;
  /** Large serif card title, e.g. "Private Dining". */
  title: string;
  /** Short editorial description shown under the image. */
  description: string;
  /** Card image from /reserve_an_experience. */
  image: MenuImage;
  /** Existing experience route (see navigation.ts). */
  href: string;
}

export const DINING_EXPERIENCES: readonly DiningExperience[] = [
  {
    id: "business-dining",
    title: "Business Dining",
    description:
      "Precision meets professionalism in a quiet, architectural space.",
    image: {
      id: "experience-business-dining",
      src: "/reserve_an_experience/business dining.jpg",
      alt: "Business dining at Art of Dum",
      category: "experiences",
    },
    href: "/reserve-an-experience/business-dining",
  },
  {
    id: "family-dining",
    title: "Family Dining",
    description:
      "Refined comfort for shared moments and artisanal seasonal menus.",
    image: {
      id: "experience-family-dining",
      src: "/reserve_an_experience/family dining.jpg",
      alt: "Family dining at Art of Dum",
      category: "experiences",
    },
    href: "/reserve-an-experience/family-dining",
  },
  {
    id: "sheesha-dining",
    title: "Sheesha Dining",
    description:
      "An atmospheric retreat into the haze with curated artisanal blends.",
    image: {
      id: "experience-sheesha-dining",
      src: "/reserve_an_experience/sheesha.jpg",
      alt: "Sheesha dining at Art of Dum",
      category: "experiences",
    },
    href: "/reserve-an-experience/sheesha-dining",
  },
  {
    id: "private-dining",
    title: "Private Dining",
    description:
      "A sanctuary for absolute exclusivity and silent connections.",
    image: {
      id: "experience-private-dining",
      src: "/reserve_an_experience/private dining.jpg",
      alt: "Private dining at Art of Dum",
      category: "experiences",
    },
    href: "/reserve-an-experience/private-dining",
  },
];
