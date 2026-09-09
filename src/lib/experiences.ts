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
  /** Optional subtitle or tagline */
  tagline?: string;
  /** Short editorial description shown under the image. */
  description: string;
  /** Key features or highlights of the experience */
  features?: string[];
  /** Card image from /reserve_an_experience. */
  image: MenuImage;
  /** Existing experience route (see navigation.ts). */
  href: string;
}

export const DINING_EXPERIENCES: readonly DiningExperience[] = [
  {
    id: "business-dining",
    title: "Business Dining",
    tagline: "Executive Elegance & Discretion",
    description:
      "Precision meets professionalism in a quiet, architectural space designed for productive discussions and distinguished entertaining.",
    features: [
      "Acoustically balanced private seating",
      "Curated multi-course express lunch & dinner sets",
      "Dedicated discrete table service",
    ],
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
    tagline: "Warmth, Heritage & Shared Feasts",
    description:
      "Refined comfort for shared moments and artisanal seasonal menus, thoughtfully paced for family celebrations and memorable gatherings.",
    features: [
      "Generous sharing platters & authentic dum biryanis",
      "Spacious round-table seating with comfort-first ambiance",
      "Customizable spice profiles for all ages",
    ],
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
    tagline: "Atmospheric Lounge & Curated Blends",
    description:
      "An atmospheric retreat into the haze with curated artisanal blends, ambient lounge lighting, and signature handcrafted mocktails.",
    features: [
      "Exquisite handcrafted single-origin blends",
      "Plush low-slung lounge seating & ambient lighting",
      "Dedicated master coal sommelier service",
    ],
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
    tagline: "A Sanctuary of Absolute Exclusivity",
    description:
      "A sanctuary for absolute exclusivity and silent connections, tailored to intimate celebrations, VIP dinners, and bespoke occasions.",
    features: [
      "Completely private secluded dining salon",
      "Customized chef degustation menu creation",
      "Personalized host & dedicated butler service",
    ],
    image: {
      id: "experience-private-dining",
      src: "/reserve_an_experience/private dining.jpg",
      alt: "Private dining at Art of Dum",
      category: "experiences",
    },
    href: "/reserve-an-experience/private-dining",
  },
];
